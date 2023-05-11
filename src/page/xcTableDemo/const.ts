/** 表单中，需要特殊处理的字段key */
const FORM_KEY_LIST = ['aa1', 'bb1', 'bb2'];
/** 表单中，需要特殊处理的字段key对应处理方式的映射 */
const FORM_KEY_TO_FUNC = {
  aa1: 'AccMul_10000',
  bb1: 'Date_YYYYMMDD',
  bb2: 'DateRange_YYYYMMDD',
};

/** 表格列表中，需要特殊处理的字段key -> key_label */
const TABLE_KEY_LIST = ['market', 'listBoard', 'issueStatus'];
/** 表格列表中，需要特殊处理的字段key对应处理方式的映射 */
const TABLE_KEY_TO_FUNC = {
  market: 'DICTS_KEY',
  listBoard: 'DICTS_KEY',
  issueStatus: 'DICTS_KEY',
};
/** 表格列表中，需要特殊处理的字段key对应的字典值（如果不传，默认取 keyMappingDicts） */
// const KEY_TO_DICTS_KEY = {
//   market: 'SECU_MARKET',
//   listBoard: 'MARKET_BOARD',
//   issueStatus: 'ISSUE_STATUS',
// };
/** 表格右侧按钮列表 */
const btnColumnList = [
  {
    btnKey: '编辑',
    type: 'link',
    key: 'edit',
  },
  {
    btnKey: '删除',
    type: 'link',
    key: 'delete',
  },
];
/** 表格右侧按钮列表-交银 */
const btnColumnListJy = [
  {
    btnKey: '编辑',
    type: 'primary',
    key: 'edit',
  },
  {
    btnKey: '删除',
    type: 'primary',
    key: 'delete',
  },
];

export {
  FORM_KEY_LIST,
  FORM_KEY_TO_FUNC,
  TABLE_KEY_LIST,
  TABLE_KEY_TO_FUNC,
  btnColumnList,
  btnColumnListJy,
};
