import { useSelector } from 'react-redux';
import { XoSelect } from 'xone-design';
import { getProductNameList } from '@/api/index.js';
import { getSelectDictTabSeaItem } from '@/common/tableSearchItem';

const { ProductNameSelect } = XoSelect;

const useTableSearchItem = () => {
  const { DICTS } = useSelector((state: any) => state.publicData);

  /** 交易场所 */
  const tradingMarketTableSeaItem = getSelectDictTabSeaItem({
    dataIndex: 'market',
    dicts: DICTS,
    dictKey: 'SECU_MARKET',
  });
  /** 产品名称 */
  const productNameTabSeaItem = {
    dataIndex: 'listBoard', // 对应表格列的 dataIndex
    formField: 'prdIds', // 取值时的字段名，不传默认key是dataIndex
    formType: 'custom',
    component: (
      <ProductNameSelect
        style={{ width: '100%' }}
        getPopupContainer={undefined}
        valueKey="id"
        mode="multiple"
        extraPayLoads={{ operatorRights: '2' }}
        queryFn={(params) =>
          getProductNameList(params).then((res: any) => res || [])
        }
      />
    ),
  };

  return { tradingMarketTableSeaItem, productNameTabSeaItem };
};

export default useTableSearchItem;
