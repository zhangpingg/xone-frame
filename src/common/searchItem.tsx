import { XoSelect, XoDatePicker, XoRangePicker } from 'xone-design';
import { Input } from 'antd';

// 渲染方式==================================================================================================
/** 输入框 */
const getInputSeaItem = ({ label, name, ...resetProps }: any) => ({
  label: label,
  name: name,
  content: (
    <Input
      style={{ width: '100%' }}
      {...resetProps}
      placeholder="请输入"
      autoComplete="off"
    />
  ),
});
/** 日期 */
const getDateSeaItem = ({ label, name, ...resetProps }: any) => ({
  label: label,
  name: name,
  content: <XoDatePicker {...resetProps} />,
});
/** 日期区间 */
const getRangeDateSeaItem = ({ label, name, ...resetProps }: any) => ({
  label: label,
  name: name,
  content: <XoRangePicker {...resetProps} />,
});
/** 字典下拉框 */
const getDictSelectSeaItem = ({ label, name, ...resetProps }: any) => ({
  label: label,
  name: name,
  content: <XoSelect style={{ width: '100%' }} {...resetProps} />,
});

// 业务==================================================================================================
/** xxx（输入框） */
const aa1SeaItem = getInputSeaItem({
  label: '输入框',
  name: 'aa1',
});
/** xxx（日期） */
const bb1SeaItem = getDateSeaItem({
  label: '日期',
  name: 'bb1',
});
/** xxx（日期区间） */
const bb2SeaItem = getRangeDateSeaItem({
  label: '日期区间',
  name: 'bb2',
});

export {
  getInputSeaItem,
  getRangeDateSeaItem,
  getDictSelectSeaItem,
  aa1SeaItem,
  bb1SeaItem,
  bb2SeaItem,
};
