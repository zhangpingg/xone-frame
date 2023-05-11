import { Dispatch } from 'react';

interface IObject {
  [key: string]: any;
}
type ReduxDispatch = Dispatch<any>;
interface IRef extends IObject {
  current?: IObject;
}
/** 表格操作列按钮 */
interface BtnColumnListItemProps {
  btnKey: string;
  type: any;
  key: string;
}

export { IObject, ReduxDispatch, IRef, BtnColumnListItemProps };
