import { getDictByPCode } from '@/api/index.js';
import _ from 'lodash';
import { SAVE_DICT_DATA } from '../reducer/dictionary';
import {
  DICTS_KEY,
  KEY_TO_NUMBER,
  CODE_VALUE_TYPE,
} from '../constants/dictionary';

import { IObject, ReduxDispatch, IAnyArray } from '@/common/interface';

// 获取需要的字典以 key-value 格式存储到redux
const getDictData = ({ dispatch }: { dispatch: ReduxDispatch }) => {
  getDictByPCode({ parentCodes: Object.keys(DICTS_KEY) }).then(
    (res: IAnyArray) => {
      if (_.isArray(res) && !_.isEmpty(res)) {
        const dictData: IObject = { ...DICTS_KEY };
        res.forEach((item: IObject) => {
          const { parentCode, code, value, name } = item || {};
          if (CODE_VALUE_TYPE.includes(parentCode)) {
            dictData[parentCode] = {
              ...dictData[parentCode],
              [code]: value,
            };
          } else {
            let key = value;
            if (KEY_TO_NUMBER.includes(parentCode)) {
              key = Number(value);
            }
            dictData[parentCode] = {
              ...dictData[parentCode],
              [key]: name,
            };
          }
        });
        console.log('字典：', dictData);
        dispatch(SAVE_DICT_DATA(dictData));
      }
    },
  );
};

export { getDictData };
