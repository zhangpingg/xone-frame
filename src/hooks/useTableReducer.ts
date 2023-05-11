import { useReducer } from 'react';

interface IObject {
  [key: string]: any;
}

const tableReducer = (state: IObject, action: IObject) => {
  switch (action.type) {
    // 进入页面首次拉取数据前的loading打开
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    // 当前页码发生变化时的处理、每页条数发生变化时的处理
    case 'PAGE_INDEX_SIZE':
      return {
        ...state,
        isLoading: true,
        ...action.payload,
      };
    // 接口请求数据成功时的处理
    case 'SUCCESS':
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    // 接口请求数据失败时的处理
    case 'ERROR':
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };
    // 新增删除假数据时的处理（此时只修改data其他均不发生变动）、修改列表接口参数、分页等
    case 'CHANGE_STATE':
      return {
        ...state,
        ...action.payload,
      };
    // 关闭loading
    case 'CLOSE_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    default:
      return {};
  }
};

const useTableReducer = (initState: IObject) => {
  const [state, dispatch] = useReducer(tableReducer, initState);

  return [state, dispatch];
};

export default useTableReducer;
