import _ from 'lodash';
import { XoNums } from 'xone-design';
import { formatDate } from './dayjs';
import { keyMappingDicts } from '../redux/reducers/constants/dictionary';

const { accMul, accDiv, formatter, formatTail } = XoNums;

/** 处理表单提交的数据
 *  @obj 需要处理的表单数据
 *  @KEY_LIST 需要处理的key数组
 *  @KEY_TO_FUNC 需要处理的字段key对应处理方式的映射
 */
const formatFormData = ({ obj, KEY_LIST, KEY_TO_FUNC }) => {
  const _result = _.cloneDeep(obj);
  Object.keys(_result).forEach((key) => {
    if (KEY_LIST.includes(key)) {
      switch (KEY_TO_FUNC[key]) {
        case 'AccMul_10000': // 乘以10000
          _result[key] = _result[key] && accMul(Number(_result[key]), 10000);
          break;
        case 'AccDiv_100': // 除以100
          _result[key] = _result[key] && accDiv(Number(_result[key]), 100);
          break;
        case 'Date_YYYYMMDD': // 日期：YYYYMMDD
          _result[key] = _result[key] && formatDate(_result[key], 'YYYYMMDD');
          break;
        case 'DateRange_YYYYMMDD': // 区间日期：YYYYMMDD
          if (_result[key]) {
            _result[key][0] = formatDate(_result[key][0], 'YYYYMMDD');
            _result[key][1] = formatDate(_result[key][1], 'YYYYMMDD');
          }
          break;
      }
    }
  });
  return _result;
};

// 处理字典值匹配时，可能会有多个匹配时
const moreDictsMap = ({ keyString, mapObj }) => {
  if (typeof keyString === 'string') {
    const keys = keyString.split(',').filter((it) => !!it);
    let value = '';
    keys.forEach((it) => {
      if (value) {
        value = `${value},${mapObj[it]}`;
      } else {
        value = mapObj[it];
      }
    });
    return value;
  }
  return keyString;
};

/** 拼接数组里面的某个字段，用逗号隔开
 *  @list 需要循环的数组
 *  @key 需要拼接的key
 */
const joinListValue = (list, key) => {
  let values = '';
  if (_.isArray(list) && !_.isEmpty(list)) {
    values = list.map((item) => item[key]).join(',');
  }
  return values;
};

/** 表格数据格式化
 *  @KEY_LIST 表格列表中，需要特殊处理的字段key
 *  @e 表格数据循环的 item 数据
 *  @DICTS 字典
 *  @KEY_LIST 需要处理的key数组
 *  @KEY_TO_FUNC 表格列表中，需要特殊处理的字段key对应处理方式的映射
 *  @KEY_TO_DICTS_KEY key对应的字典值,默认 keyMappingDicts
 */
const formatTableData = ({
  list,
  DICTS,
  KEY_LIST,
  KEY_TO_FUNC,
  KEY_TO_DICTS_KEY = keyMappingDicts,
}) => {
  list.forEach((e) => {
    const keysArr = Object.keys(e || {});
    for (let index = 0, len = keysArr.length; index < len; index++) {
      let key = keysArr[index];
      if (KEY_LIST.includes(key)) {
        if (e[key] || e[key] === 0) {
          switch (KEY_TO_FUNC[key]) {
            case 'PERCENT0_KEY_d4': // 除以10000，不保留小数
              e[`${key}_label`] = `${formatter(accDiv(e[key], 10000), 0)}`;
              break;
            case 'PERCENT2_KEY': // 保留2位小数
              e[`${key}_label`] = formatTail(e[key], 2);
              break;
            case 'ZHANG_PERCENT2_KEY': // 先乘以100再除以10000（处理单位为张的数据）
              e[key] = accDiv(accMul(e[key], 100), 10000);
              e[`${key}_label`] = formatTail(e[key], 2);
              break;
            case 'PERCENT2_KEY_m2': // 乘以100 保留2位小数
              e[`${key}_label`] = `${formatTail(accMul(e[key], 100), 2)}`;
              break;
            case 'PERCENT2_KEY_d4': // 除以10000(一万)，保留2位小数
              e[`${key}_label`] = `${formatTail(accDiv(e[key], 10000), 2)}`;
              break;
            case 'PERCENT4_KEY': // 保留4位小数
              e[`${key}_label`] = `${formatTail(e[key], 4)}`;
              break;
            case 'PERCENT4_KEY_m2': // 乘以100，保留4位小数
              e[`${key}_label`] = `${formatTail(accMul(e[key], 100), 4)}`;
              break;
            case 'PERCENT6_KEY_m2': // 乘以100，保留6位小数
              e[`${key}_label`] = `${formatTail(accMul(e[key], 100), 6)}`;
              break;
            case 'PERCENT6_KEY': // 除以10000(一万)，保留6位小数
              e[`${key}_label`] = `${formatTail(accDiv(e[key], 10000), 6)}`;
              break;
            case 'PERCENT8_KEY_d2': // 乘以(100)，保留8位小数
              e[`${key}_label`] = `${formatTail(accMul(e[key], 100), 8)}`;
              break;
            case 'DATE_KEY': // 日期：YYYY-MM-DD
              e[`${key}_label`] = formatDate(e[key], 'YYYY-MM-DD');
              break;
            case 'DATE-S_KEY': // 时间：YYYY-MM-DD HH:mm:ss
              e[`${key}_label`] = formatDate(e[key], 'YYYY-MM-DD HH:mm:ss');
              break;
            case 'TROUBLE_NAME_KEY': // 展示多个值时用逗号分开
              e[`${key}_label`] = joinListValue(e[key], 'name');
              break;
            // case 'TROUBLE_NAME_ID_NAME': // 展示多个值时用逗号分开（特例）
            //   e[`${key}_label`] = handleMoreValue({
            //     keysArr: e[key],
            //     type: 'id_name',
            //   });
            //   break;
            case 'DICTS_KEY': // 展示字典对应映射值（key是string）
              e[`${key}_label`] = DICTS[KEY_TO_DICTS_KEY[key]][e[key]];
              break;
            case 'DICTS_NUMBER_KEY': // 展示字典对应映射值（key是number）
              e[`${key}_label`] = DICTS[KEY_TO_DICTS_KEY[key]][Number(e[key])];
              break;
            case 'DICTS_KEY_ARRAY':
              if (_.isArray(KEY_TO_DICTS_KEY[key])) {
                let dictObj = {};
                KEY_TO_DICTS_KEY[key].map((it) => {
                  if (!_.isEmpty(DICTS[it])) {
                    dictObj = { ...dictObj, ...DICTS[it] };
                  }
                });
                e[`${key}_label`] = dictObj[e[key]];
              }
              break;
            case 'MORE_DICTS_KEY':
              e[`${key}_label`] = moreDictsMap({
                keyString: e[key],
                mapObj: DICTS[KEY_TO_DICTS_KEY[key]],
              });
              break;
            default:
              break;
          }
        } else {
          e[`${key}_label`] = '--';
        }
      } else {
        if (e[key] || e[key] === 0) {
          e[`${key}_label`] = e[key];
        } else {
          e[`${key}_label`] = '--';
        }
      }
    }
  });
  return list;
};

export { formatFormData, formatTableData, joinListValue };
