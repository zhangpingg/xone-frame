import { get, post, Delete } from '@/utils/fetch';
import {
  foundationPrefix,
  commonBaseUrl,
  ipoPrefix,
  foundationV2Prefix,
} from './prefix';

// 公共的模块==================================================================
// 查询字典
const getDictByPCode = (params) =>
  post(`${foundationPrefix}/dict/listAll`, params).then((res) => res);
// 文件下载
const fileDownloadApi = (params) =>
  get(`${ipoPrefix}/file/download?fileId=${params}`).then((res) => res);
// 获取表格配置
const getTableConfig = (params) =>
  get(`${commonBaseUrl}/system/table-header/white-sign`, params).then(
    (res) => res.data,
  );
// 获取表格配置
const getTableConfigNew = (params) =>
  get(`${commonBaseUrl}/system/table-header/new-white-sign`, params).then(
    (res) => res.data,
  );
// 设置表格配置
const saveTableConfig = (params) =>
  post(`${commonBaseUrl}/system/table-header/white-sign/save`, params);
// 获取债券代码
const getSecuCodeList = (params) =>
  post(`${foundationV2Prefix}/fdnSecuBaseInfo/listSelect`, params).then(
    (res) => res,
  );
// 获取产品名称
const getProductNameList = (params) =>
  post(`${foundationV2Prefix}/product/listSelect`, params).then((res) => res);
// 获取投资组合
const getPortfolioList = (params) =>
  post(`${foundationV2Prefix}/portfolio/listSelect`, params).then((res) => res);
// 获取交易对手
const getCounterpartyList = (params) =>
  post(`${foundationV2Prefix}/fdnCutpInfo/listSelect`, params).then(
    (res) => res,
  );
// 投资经理
const getUserInfoList = (params) =>
  post(`${foundationV2Prefix}/userInfo/listSelect`, params).then(
    (res) => res || [],
  );
// 常用备用语-新增
const addCommonWord = (params) =>
  post(`${foundationV2Prefix}/fdnMemo/create`, params).then((res) => res || []);
// 常用备用语-删除
const deleteCommonWord = (id) =>
  Delete(`${foundationV2Prefix}/fdnMemo/delete/${id}`).then((res) => res || []);
// 常用备用语-修改
const modifyCommonWord = (params) =>
  post(`${foundationV2Prefix}/fdnMemo/modify`, params).then((res) => res || []);
// 常用备用语-获取
const getCommonWords = (params) =>
  post(`${foundationV2Prefix}/fdnMemo/listAll`, params).then(
    (res) => res || [],
  );

// 页面接口=================================================================

export {
  getDictByPCode,
  fileDownloadApi,
  getTableConfig,
  getTableConfigNew,
  saveTableConfig,
  getSecuCodeList,
  getProductNameList,
  getPortfolioList,
  getCounterpartyList,
  getUserInfoList,
  addCommonWord,
  deleteCommonWord,
  modifyCommonWord,
  getCommonWords,
};
