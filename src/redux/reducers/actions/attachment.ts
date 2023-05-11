import { ReduxDispatch } from '@/common/interface';
import { SAVE_FILES, CLEAR_FILES } from '../reducer/attachment';

interface IProps {
  data: any;
  type: string;
  dispatch?: ReduxDispatch;
}

const saveFiles = ({ type, data, dispatch }: IProps) => {
  dispatch && dispatch(SAVE_FILES({ [type]: data }));
};
const clearFiles = (dispatch: ReduxDispatch) => {
  dispatch && dispatch(CLEAR_FILES());
};

export { saveFiles, clearFiles };
