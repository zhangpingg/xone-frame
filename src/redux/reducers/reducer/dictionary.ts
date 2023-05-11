import { createSlice } from '@reduxjs/toolkit';
import { DICTS_KEY } from '../constants/dictionary';
import { IObject } from '@/common/interface';

const initialState = {
  ...DICTS_KEY,
  isSuccess: false,
};

const dictsSlice = createSlice({
  name: 'dicts',
  initialState,
  reducers: {
    /** 保存字典数据 */
    SAVE_DICT_DATA(state: IObject, { payload }) {
      return { ...state, ...payload, isSuccess: true };
    },
  },
});

export const { SAVE_DICT_DATA } = dictsSlice.actions; // actions
export default dictsSlice.reducer; // reducer
