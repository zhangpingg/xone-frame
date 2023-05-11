/**
 * 字典以key-value格式保存到对象中（默认是字典中的value-name）
 * 后期如果有用到新的字典可以在此处添加
 */
const DICTS_KEY = {
  SECU_MARKET: {}, // 交易市场
  MARKET_BOARD: {}, // 上市板块
  DEAL_DIR: {}, // 交易方向
  ISSUE_STATUS: {}, // 新股发行状态
  XONE_YES_OR_NO: {}, // 是/否
  MKT_PLFM: {}, // 市场平台
  // UPDATE_MODE: {}, // 维护模式
  // TEMPLATE_FILE_TYPE: {}, // 模板文件类型
  // TEMPLATE_BUSINESS_TYPE: {}, // 模板业务类型
  // TEMPLATE_STATUS: {}, // 模板维护状态
  // CHECK_RESULT: {}, // 核对结果
  // IS_MERGE_CELL: {}, // 是否合并单元格
  // MACROS_DATA_TYPE: {}, // 数据类型
  // SUM_STYLE: {}, // 汇总行格式
  // INDEX_STYLE: {}, // 序号格式
  // IS_PENETRATE: {}, // 中间层是否穿透
  // RATION_OBJECT_TYPE: {}, //配售对象类型
  // MATCHED_STATUS: {}, // 配号状态
  // PURCHASE_BOARD: {}, // 可申购板块
  // THEME_FUND_TYPE: {}, // 主题基金类型
  // PURS_BASIS_POS_MODEL: {}, //申购仓位基准
  // NEW_STOCK_STATUS: {}, // 新股状态
  // IS_INTEGRATE_BIZ_LICENSE: {}, // 是和否（1和0）
  // INVESTOR_PARTICIPATE_TYPE: {}, //出资方参与类型
  // IDENTITY_CERT_TYPE: {}, // 身份证明文件类型
  // IS_SELF_OWN_CAPITAL_FLAG: {}, // 是否为只有资金
  // INVESTMENT_CAPITAL_TYPE: {}, // 资金类型
  // PARTICIPATE_STATUS: {}, // 参与状态
  // ASSET_CERT_FILE_TYPE: {}, // 资产证明文件
  // RESEARCH_STATUS: {}, // 研究状态
  // LOCK_MODE: {}, // 锁定方式
  // IPO_BUSINESS_FLOW: {}, // 新股业务流程
  // IPO_INTENTION_STATUS: {}, // 新股意向状态
  // IS_EXIST_INTENTION: {}, // 是否生成意向
  // CHOSEN_STATUS: {}, // 入围状态
  // RATION_STATUS: {}, // 配售状态
  // CASH_STATUS: {}, // 到账状态
  // CHOSEN_INFO_GET_STATUS: {}, // 入围信息获取状态
  // INVESTMENT_TYPE: {}, // 投资类型
  // APPROVE_STATUS: {}, // 审批状态
  // APPROVE_RESULT: {}, // 审批结果
  // RESTRICT_STATUS: {}, // 限售状态
  // IPO_STATUS: {}, // 状态
  // STOCK_CODE_TYPE: {}, // 证券类别
  // STOCK_CODE_SUBTYPE: {}, // 证券子类
  // NEW_STOCK_ISSUE_MODE: {}, // 新股发行方式
};

// 需要将key转化为数字类型
const KEY_TO_NUMBER = ['STOCK_CODE_TYPE', 'STOCK_CODE_SUBTYPE'];
// 需要用 code-value 格式类型保存的字典
const CODE_VALUE_TYPE = [''];

// 字段对应字典的映射关系
const keyMappingDicts = {
  market: 'SECU_MARKET',
  listBoard: 'MARKET_BOARD',
  dealDirs: 'DEAL_DIR',
  issueStatus: 'ISSUE_STATUS',
};
export { DICTS_KEY, KEY_TO_NUMBER, CODE_VALUE_TYPE, keyMappingDicts };
