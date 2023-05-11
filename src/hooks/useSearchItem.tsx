import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { XoSelect } from 'xone-design';
import { getDictSelectSeaItem } from '@/common/searchItem';
import {
  getSecuCodeList,
  getProductNameList,
  getPortfolioList,
  getCounterpartyList,
} from '@/api/index.js';

const {
  SecurityCodeSelect,
  ProductNameSelect,
  GroupNameSelect,
  CounterpartySelect,
} = XoSelect;

const useSearchItem = () => {
  const { DICTS } = useSelector((state: any) => state.publicData);

  /** xxx（字典下拉框） */
  const cc2SeaItem = useMemo(
    () =>
      getDictSelectSeaItem({
        label: '字典下拉框-自定义',
        name: 'cc2',
        dicts: DICTS,
        dictKey: 'DEAL_DIR',
      }),
    [DICTS],
  );
  /** 债券代码 */
  const bondCodeSeaItem = useMemo(() => {
    return {
      label: '债券代码',
      name: 'secuIds',
      content: (
        <SecurityCodeSelect
          style={{ width: '100%' }}
          extraPayLoads={{
            stockCodeType: '100200',
          }}
          queryFn={(params) =>
            getSecuCodeList(params).then((res: any) => res || [])
          }
        />
      ),
    };
  }, []);
  /** 产品名称 */
  const getProductNameSeaItem = useCallback((props?: any) => {
    return {
      label: '产品名称',
      name: 'prdIds',
      content: (
        <ProductNameSelect
          style={{ width: '100%' }}
          {...props}
          onChange={props?.onChange}
          extraPayLoads={{
            operatorRights: '2',
          }}
          queryFn={(params) =>
            getProductNameList(params).then((res: any) => res || [])
          }
        />
      ),
    };
  }, []);
  /** 投资组合 */
  const getInvestmentPortfolioSeaItem = useCallback((props: any) => {
    const { productIds, ...restProps } = props;
    return {
      label: '投资组合',
      name: 'pflIds',
      content: (
        <GroupNameSelect
          style={{ width: '100%' }}
          extraPayLoads={{
            operatorRights: '2',
            productIds: productIds ? productIds : [],
          }}
          queryFn={(params) =>
            getPortfolioList(params).then((res: any) => res || [])
          }
          {...restProps}
        />
      ),
    };
  }, []);
  /** 交易对手 */
  const counterpartySeaItem = useMemo(() => {
    return {
      label: '交易对手',
      name: 'dtlIds',
      content: (
        <CounterpartySelect
          style={{ width: '100%' }}
          queryFn={(params) =>
            getCounterpartyList(params).then((res: any) => res || [])
          }
        />
      ),
    };
  }, []);

  return {
    cc2SeaItem,
    bondCodeSeaItem,
    getProductNameSeaItem,
    getInvestmentPortfolioSeaItem,
    counterpartySeaItem,
  };
};

export default useSearchItem;
