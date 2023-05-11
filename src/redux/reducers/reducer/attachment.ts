import { createSlice } from '@reduxjs/toolkit';
import { IObject } from '@/common/interface';

const initialState = {
  IMAGES_FILES: [], // 图片文件
  EXCEL_FILES: [], // excel文件
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    SAVE_FILES(state: IObject, { payload }) {
      return { ...state, ...payload };
    },
    CLEAR_FILES() {
      return { ...initialState };
    },
  },
});

export const { SAVE_FILES, CLEAR_FILES } = filesSlice.actions;
export default filesSlice.reducer;

// import { saveFiles, clearFiles } from '@/common/redux/actions/attachment';
// import { useDispatch } from 'react-redux';

// const { DICTS, FILES } = useSelector((state: any) => state.publicData);

// const fn1 = () => {
//   const list = [{ a: 1 }, { b: 2 }];
//   saveFiles({ type: 'IMAGES_FILES', data: list, dispatch });
// };
// const fn2 = () => {
//   clearFiles(dispatch);
// };
