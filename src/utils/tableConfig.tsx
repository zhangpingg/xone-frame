import { history } from 'umi';
import {
  getTableConfig,
  saveTableConfig,
  getTableConfigNew,
} from '@/api/index.js';
import { getFoundationVersion } from '@/utils/systemConfig.js';

/** 获取交银的菜单code */
const getJyCurrentKey = () => {
  return (
    window?.framework?.menuFlat.filter((item: any) =>
      item.uri.includes(history.location.pathname),
    )?.[0].code || ''
  );
};
/** 表格通用配置 */
const commonConfig = {
  // getMenuCode: () =>
  // getFoundationVersion() == '0'
  //   ? window.tabs?.getCurrentKey()
  //   : getJyCurrentKey(),
  // getUserId: () => localStorage.getItem('loginName') || '',
  getMenuCode: () => 'MENU_200233',
  getUserId: () => 'admin',
};
/** 列配置（获取表格动态列接口、保存表格列设置接口） */
const columnsConfig = {
  getTableConfig: (params: any) =>
    getTableConfig(params).then((res: any) => res || []),
  saveTableConfig,
};
/** 后端列配置 */
const getTableCols = (params: any) =>
  getTableConfigNew(params).then((res: any) => {
    const resSort = res.map((item: any) => {
      item.sortable = 2;
      return item;
    });
    return resSort || [];
  });

export { commonConfig, columnsConfig, getTableCols };
