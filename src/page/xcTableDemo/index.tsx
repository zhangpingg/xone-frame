import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActivate, useUnactivate } from 'react-activation';
import { Form } from 'antd';
import { useTableReducer } from '@/hooks';
import _ from 'lodash';
import cn from 'classnames';
import { XcSearchForm } from 'xunce-design';
import XoTable from '@/components/xoTable';
import AuthButton from '@/components/authButton';
import { formatFormData, formatTableData } from '@/utils/dataFormat.js';
import { aa1SeaItem, bb1SeaItem, bb2SeaItem } from '@/common/searchItem';
import {
  bondShotNameTabSeaItem,
  bondCodeTabSeaItem,
  quotedEndDateTabSeaItem,
  goMarketDateTabSeaItem,
  issueModeTabSeaItem,
  issuePriceTabSeaItem,
} from '@/common/tableSearchItem';
import {
  tradingMarketColItem,
  listBoardColItem,
  issueStatusColItem,
  enquiryProgressColItem,
} from '@/common/columnsItem';
import { useSearchItem, useTableSearchItem } from '@/hooks';
import {
  FORM_KEY_LIST,
  FORM_KEY_TO_FUNC,
  TABLE_KEY_LIST,
  TABLE_KEY_TO_FUNC,
  btnColumnList,
  btnColumnListJy,
} from './const';
import { getFoundationVersion } from '@/utils/systemConfig.js';
import { IObject, BtnColumnListItemProps } from '@/common/interface';
import commonStyles from '@/styles/common.less';
import { mockRes } from './mockData'; // 模拟接口数据

const isJy = getFoundationVersion() === '1';

const Index: FC = () => {
  const xoTableRef = useRef<any>();
  const paramsRef = useRef<any>({});
  const [form] = Form.useForm();
  const { DICTS } = useSelector((state: any) => state.publicData);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [
    { isLoading, data, total, pageIndex, pageSize, params },
    dispatch,
  ] = useTableReducer({
    data: [],
    pageIndex: 1,
    pageSize: 20,
    isLoading: false,
    total: 0,
    params: { AAA: 100 },
  });
  const {
    cc2SeaItem,
    bondCodeSeaItem,
    getProductNameSeaItem,
    getInvestmentPortfolioSeaItem,
    counterpartySeaItem,
  } = useSearchItem();
  const {
    tradingMarketTableSeaItem,
    productNameTabSeaItem,
  } = useTableSearchItem();

  /** 筛选条件-列表 */
  const screenList: any = useMemo(
    () => [
      aa1SeaItem,
      bb1SeaItem,
      bb2SeaItem,
      cc2SeaItem,
      bondCodeSeaItem,
      getProductNameSeaItem({
        mode: 'multiple',
        onChange: (val: string[]) => {
          setProductIds(val);
        },
      }),
      getInvestmentPortfolioSeaItem({ productIds }),
      counterpartySeaItem,
    ],
    [DICTS, productIds],
  );
  /** 额外表头配置：重新写render */
  const extraColumnsConfig = useMemo(
    () => [
      tradingMarketColItem,
      listBoardColItem,
      issueStatusColItem,
      enquiryProgressColItem,
    ],
    [],
  );
  /** 表格右侧固定列-操作按钮 */
  const columnsBtnsOperate = useCallback((keyType, record) => {
    switch (keyType) {
      case 'edit':
        console.log('编辑', keyType, record);
        break;
      case 'delete':
        // console.log('删除', keyType, record);
        unifySearch('operationColumn', paramsRef.current);
        break;
    }
  }, []);
  /** 表格右侧固定列 */
  const fixedRightColumns = useMemo(() => {
    return [
      {
        title: '操作',
        dataIndex: 'operate',
        width: 140,
        render: (text: string | undefined, record: IObject) => {
          return (
            <>
              {(isJy ? btnColumnListJy : btnColumnList).map(
                (item: BtnColumnListItemProps) => {
                  if (item.key === 'delete' && [2].includes(record?.market)) {
                    return null;
                  }
                  return (
                    <AuthButton
                      key={item.key}
                      type={item.type}
                      btnKey={item.btnKey}
                      hasLoading={false}
                      onClick={() => columnsBtnsOperate(item.key, record)}
                      disabled={
                        item.key === 'edit' && [5].includes(record?.market)
                      }
                      style={{ marginRight: isJy ? '5px' : 0 }}
                    >
                      {item.btnKey}
                    </AuthButton>
                  );
                },
              )}
            </>
          );
        },
      },
    ];
  }, []);
  /** 转换表格数据列表 */
  const transDataList = useMemo(() => {
    if (DICTS?.isSuccess && !_.isEmpty(data)) {
      return formatTableData({
        list: data,
        DICTS,
        KEY_LIST: TABLE_KEY_LIST,
        KEY_TO_FUNC: TABLE_KEY_TO_FUNC,
      });
    }
    return data || [];
  }, [DICTS, data]);
  /** 获取模拟数据 */
  const getMockData = (params: any) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('params', params);
        resolve(mockRes);
      }, 1000);
    });
  };
  /** 获取表格数据 */
  const getTableData = async ({
    searchParams = {},
    tableSearchParams = {},
    sortParams = {},
  }: IObject) => {
    try {
      dispatch({ type: 'LOADING' });
      const allParams = {
        pageIndex,
        pageSize,
        ...params,
        ...searchParams,
        ...tableSearchParams,
        ...sortParams,
      };
      paramsRef.current = allParams;
      const transParmas = formatFormData({
        obj: allParams,
        KEY_LIST: FORM_KEY_LIST,
        KEY_TO_FUNC: FORM_KEY_TO_FUNC,
      });
      const res: any = await getMockData(transParmas);
      dispatch({
        type: 'SUCCESS', // 会自动关闭loading
        payload: {
          data: res?.data?.records,
          total: res?.data?.totalCount,
          pageIndex: res?.data?.pageIndex,
          pageSize: res?.data?.pageSize,
          params: {
            ...params,
            ...sortParams,
          },
          // 主线：每次都存储上一次的值
          // params: {
          //   ...params,
          //   ...conditionParams,
          // },
        },
      });
    } catch (err) {
      dispatch({ type: 'ERROR' }); // 会自动关闭loading
    } finally {
      dispatch({ type: 'CLOSE_LOADING' });
    }
  };
  /** 统一查询 */
  const unifySearch = (type: string, extraParams?: IObject) => {
    let searchParams = {};
    let screenForm = {};
    let sortParams = {};
    if (type !== 'reset') {
      screenForm = form.getFieldsValue(true);
    }
    const tableForm = _.cloneDeep(xoTableRef?.current?.getTableFormValues());
    switch (type) {
      case 'search':
      case 'tableSearch':
        searchParams = { ...screenForm, pageIndex: 1 };
        break;
      case 'reset':
        form.resetFields();
        setProductIds([]);
        screenForm = form.getFieldsValue(true);
        searchParams = { ...screenForm, pageIndex: 1, pageSize: 20 };
        break;
      case 'tableReset':
        searchParams = { ...screenForm, pageIndex: 1, pageSize: 20 };
        break;
      case 'paging':
        searchParams = { ...screenForm, ...extraParams };
        break;
      case 'sort':
        searchParams = { ...screenForm };
        sortParams = extraParams!;
        break;
      case 'operationColumn':
        searchParams = { ...screenForm, ...extraParams };
        break;
    }
    getTableData({
      searchParams: searchParams,
      tableSearchParams: tableForm,
      sortParams,
    });
  };
  /** 筛选条件-按钮 */
  const lastElement = (
    <>
      <AuthButton
        type={isJy ? 'primary' : 'ghost'}
        btnKey="重置"
        hasLoading={false}
        className={cn({ [commonStyles['common-search-reset-btn-jy']]: isJy })}
        onClick={() => unifySearch('reset')}
      >
        重置
      </AuthButton>
      <AuthButton
        type="primary"
        btnKey="查询"
        hasLoading={false}
        className={cn({ [commonStyles['common-search-reset-btn-jy']]: isJy })}
        onClick={() => unifySearch('search')}
      >
        查询
      </AuthButton>
    </>
  );
  /** 切换分页 */
  const changePage = (pageIndex: number, pageSize: number) => {
    unifySearch('paging', { pageIndex, pageSize });
  };
  /** 切换排序 */
  const changeSort = (pagination: any, filters: any, sorter: any) => {
    const { field, order } = sorter;
    const sortParam = {
      sortList: {
        [`${field}_sort`]: order,
      },
    };
    unifySearch('sort', sortParam);
  };
  /** 交银-表格右侧工具栏 */
  const toolBar = {
    columnsForm: [
      bondShotNameTabSeaItem,
      bondCodeTabSeaItem,
      quotedEndDateTabSeaItem,
      goMarketDateTabSeaItem,
      issueModeTabSeaItem,
      issuePriceTabSeaItem,
      tradingMarketTableSeaItem,
      productNameTabSeaItem,
    ],
    onSearch: () => {
      unifySearch('tableSearch');
    },
    onReset: () => {
      unifySearch('tableReset');
    },
  };

  useEffect(() => {
    getTableData({});
  }, []);
  /** 组件启动 */
  useActivate(() => {
    console.log('组件启动');
  });
  /** 组件销毁 */
  useUnactivate(() => {
    console.log('组件销毁');
  });

  return (
    <div className={commonStyles['common-container']}>
      <XcSearchForm
        form={form}
        formList={screenList}
        colon={false}
        lastElement={lastElement}
      />
      <div className={commonStyles['common-container-tableWrap']}>
        <XoTable
          ref={xoTableRef}
          tableKey="200036"
          rowKey={(record: any) => record.stockCode}
          loading={isLoading}
          heightAuto
          dataSource={transDataList}
          colsByInterfaceConfig={{
            extraColumnsConfig,
            fixedRightColumns,
          }}
          pagination={{
            total,
            pageSize,
            current: pageIndex,
            showTotal: (sum: any) => `共${sum}条`,
            onChange: changePage,
          }}
          onChange={changeSort}
          toolbar={toolBar}
        />
      </div>
    </div>
  );
};

export default Index;
