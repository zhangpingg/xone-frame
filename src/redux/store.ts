// 全局的 store 文件
import { configureStore } from '@reduxjs/toolkit';
import allReducer from './reducers'; // 把所有的公共的 reducer 都引入

/**
 * 创建store
 */
const store = configureStore({
  reducer: {
    publicData: allReducer,
  },
});

export default store;
