// 导出所有的 reducer 文件
import { combineReducers } from '@reduxjs/toolkit';
import dictsReducers from './reducer/dictionary'; // 字典
import filesReducers from './reducer/attachment'; // 上传的文件

export default combineReducers({
  DICTS: dictsReducers,
  FILES: filesReducers,
});
