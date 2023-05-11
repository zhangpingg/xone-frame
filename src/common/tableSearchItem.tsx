import { XoNumber, XoSelect } from 'xone-design';
import { IObject } from './interface';

// 渲染方式==================================================================================================
/** 数字 */
const getNumberTabSeaItem = ({
  dataIndex,
  formField,
  ...restProps
}: IObject) => {
  return {
    dataIndex,
    formField,
    formType: 'custom',
    component: <XoNumber style={{ width: '100%' }} {...restProps} />,
  };
};
/** 自定义下拉框 */
const getCustomSelectTabSeaItem = ({
  dataIndex,
  formField,
  options = [],
}: IObject) => {
  return {
    dataIndex,
    formField,
    formType: 'select',
    options,
  };
};
/** 字典下拉框 */
const getSelectDictTabSeaItem = ({
  dataIndex,
  formField,
  ...restProps
}: any) => {
  return {
    dataIndex,
    formField,
    formType: 'custom',
    component: (
      <XoSelect
        style={{ width: '100%' }}
        getPopupContainer={() => document.body}
        {...restProps}
      />
    ),
  };
};

// 业务==================================================================================================
/** 证券简称 */
const bondShotNameTabSeaItem = {
  dataIndex: 'shortName',
  formType: 'input',
  autoComplete: 'off',
};
/** 证券代码 */
const bondCodeTabSeaItem = {
  dataIndex: 'stockCode',
  formField: 'stockCode_byname',
  formType: 'input',
};
/** 报价截止日期 */
const quotedEndDateTabSeaItem = {
  dataIndex: 'quoteEndTime',
  formType: 'date',
};
/** 上市 */
const goMarketDateTabSeaItem = {
  dataIndex: 'listingDate',
  formType: 'dateRange',
};
/** 发行方式 */
const issueModeTabSeaItem = getCustomSelectTabSeaItem({
  dataIndex: 'newStockIssueMode',
  options: [
    {
      label: '发行方式6',
      value: 6,
    },
    {
      label: '发行方式7',
      value: 7,
    },
    {
      label: '发行方式8',
      value: 8,
    },
  ],
});
/** 发行价格 */
const issuePriceTabSeaItem = getNumberTabSeaItem({
  dataIndex: 'issuePrice',
  precision: 4,
});

export {
  getNumberTabSeaItem,
  getSelectDictTabSeaItem,
  bondShotNameTabSeaItem,
  bondCodeTabSeaItem,
  quotedEndDateTabSeaItem,
  goMarketDateTabSeaItem,
  issueModeTabSeaItem,
  issuePriceTabSeaItem,
};
