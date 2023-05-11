import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import moment from 'moment';
import { XcConfigForm } from 'xunce-design';
import {
  XoForm as Form,
  XoInput,
  XoNumber,
  XoRadio,
  XoDatePicker,
  XoRangePicker,
  XoNumberRange,
  XoSelect,
} from 'xone-design';
import {
  getSecuCodeList,
  getProductNameList,
  getPortfolioList,
} from '@/api/index.js';
import MultipleNumberJoin from './multipleNumberJoin';
import InvestmentManager from './investmentManager';
import CommonUseRemark from './commonUseRemark';
import { unitOptions } from './const';
import { mockRes } from './mockData';
import { IObject } from '@/common/interface';
import styles from './index.module.less';

const XcConfigFormDemo = () => {
  const [form] = Form.useForm();
  const { DICTS } = useSelector((state: any) => state.publicData);
  const [productId, setProductId] = useState<number>();
  const [
    investmentManagerLength,
    setInvestmentManagerLength,
  ] = useState<number>(0);

  /** 模拟接口 */
  const ApiFn1 = (params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockRes);
      }, 2000);
    });
  };
  /** 选择债券代码（输入框清空的时候不会调这里） */
  const selectSecurityCode = (e: IObject) => {
    form.setFieldsValue({ market: String(e.allData.trdMktCode) });
  };
  /** 表单项列表 */
  const formList: any = useMemo(() => {
    if (!DICTS?.isSuccess) {
      return [];
    }
    return [
      {
        itemName: 'a1',
        component: <XoInput placeholder="请输入" />,
      },
      {
        itemName: 'a2',
        component: <XoNumber placeholder="请输入" />,
      },
      {
        itemName: 'a3',
        component: <XoRadio.DictRadio dicts={DICTS} dictKey="XONE_YES_OR_NO" />,
      },
      {
        itemName: 'a4',
        component: <XoDatePicker className="w100" />,
      },
      {
        itemName: 'a5',
        component: <XoRangePicker className="w100" />,
      },
      {
        itemName: 'a6',
        component: (
          <XoNumberRange
            Form={Form}
            unitOptions={unitOptions}
            defaultUnit="3"
            list={[
              {
                formItemAttr: {
                  name: ['a6', 'value1'],
                  rules: [{ required: true, message: '请选择最小值' }],
                },
              },
              {
                formItemAttr: {
                  name: ['a6', 'value2'],
                  rules: [{ required: true, message: '请选择最大值' }],
                },
              },
              {
                formItemAttr: {
                  name: ['a6', 'value3'],
                },
              },
            ]}
          />
        ),
      },
      {
        itemName: 'securityCode',
        component: (
          <XoSelect.SecurityCodeSelect
            handleSelect={selectSecurityCode}
            queryFn={(params: Object) =>
              getSecuCodeList(params).then((res: any) => res || [])
            }
          />
        ),
      },
      {
        itemName: 'market',
        component: <XoSelect.MarketPlatformSelect dicts={DICTS} />,
      },
      {
        itemName: 'a9',
        component: (
          <MultipleNumberJoin
            Form={Form}
            list={[
              {
                formItemAttr: {
                  name: ['a9', 'value1'],
                  rules: [{ required: true, message: '请输入xxx' }],
                },
              },
              {
                formItemAttr: {
                  name: ['a9', 'value2'],
                  rules: [{ required: true, message: '请输入yyy' }],
                },
              },
              {
                formItemAttr: {
                  name: ['a9', 'value3'],
                },
              },
            ]}
          />
        ),
      },
      {
        itemName: 'productId', // 产品名称
        component: (
          <XoSelect.ProductNameSelect
            queryFn={(params: any) =>
              getProductNameList(params).then((res: any) => res || [])
            }
          />
        ),
      },
      {
        itemName: 'portfolioId', // 投资组合
        component: (
          <XoSelect.GroupNameSelect
            queryFn={(params: any) =>
              getPortfolioList(params).then((res: any) => res || [])
            }
            extraPayLoads={{
              productIds: [productId],
              operatorRights: '1', //1-查询 2-操作 3-复核 4-审批
            }}
          />
        ),
      },
      {
        itemName: 'investmentManager', // 投资经理
        component: <InvestmentManager listLength={investmentManagerLength} />,
      },
      {
        itemName: 'remarks',
        component: (
          <CommonUseRemark
            busiVar={1001}
            Form={Form}
            list={[
              {
                formItemAttr: {
                  name: ['remarks', 'value1'],
                  rules: [{ required: true, message: '请输入备注' }],
                },
              },
            ]}
          />
        ),
      },
      {
        itemName: 'aa1',
        component: <XoInput placeholder="请输入" />,
      },
    ];
  }, [DICTS, productId, investmentManagerLength]);
  /** 监听form的value值改变 */
  const watchFormValueChange = (changedValues: any) => {
    const key = Object.keys(changedValues)[0];
    switch (key) {
      case 'securityCode': // 债券代码
        if (!changedValues[key]) {
          form.setFieldsValue({ market: undefined }); // 市场平台
        }
        break;
      case 'productId': // 产品名称
        form.setFieldsValue({ portfolioId: null }); // 投资组合
        setProductId(changedValues[key]);
        break;
    }
  };
  /** 回显表单数据 */
  const echoFormData = () => {
    const record = {
      a1: 100,
      a2: 1234.1234,
      a3: '2',
      a4: moment(moment(), 'YYYY-MM-DD'),
      a5: [moment('20230101', 'YYYY-MM-DD'), moment('20230102', 'YYYY-MM-DD')],
      a6: {
        value1: 1234.12,
        value2: 1234.1234,
        value3: '2',
      },
      securityCode: 2,
      market: '5',
      a9: {
        value1: 1234.12,
        value2: 1234.1234,
        value3: true,
      },
      productId: 2,
      portfolioId: 39001,
      investmentManager: [
        { investmentManagerId: 1, money: 10 },
        { investmentManagerId: 107, money: 11 },
      ],
      remarks: {
        value1: '备注语言',
      },
      aa1: '李四',
    };
    setInvestmentManagerLength(record.investmentManager.length);
    form.setFieldsValue(record);
  };
  /** 表单提交 */
  const submit = useCallback(() => {
    form.validateFields().then((value) => {
      console.log('表单数据：', value);
    });
  }, [form]);

  useEffect(() => {
    form.setFieldsValue({
      a6: {},
      a9: {},
      investmentManager: [{}],
      remarks: {},
    });
  }, []);

  return (
    <div className={styles['xcConfigForm-wrap']}>
      <XcConfigForm
        onValuesChange={watchFormValueChange}
        commonConfig={{
          userId: '1',
          menuCode: 'MENU001',
          formId: 'form01',
          getFormConfig: ApiFn1,
        }}
        formList={formList}
        form={form}
        Form={Form}
        colon={false}
        labelAntPrefix="xod-ant"
      />
      <Button type="primary" onClick={echoFormData} className="mr10">
        回显表单数据
      </Button>
      <Button type="primary" onClick={submit}>
        提交
      </Button>
    </div>
  );
};

export default XcConfigFormDemo;
