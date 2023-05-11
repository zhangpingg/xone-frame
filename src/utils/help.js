import { message } from 'antd';
import moment from 'moment';

/** 小于之前的日期的不可以选 */
const disableBeforeToday = (current) =>
  current && current < moment().subtract(1, 'days');

/** 大于当前日期后的N天不可以选 */
const disableAfterNToday = (current, N) =>
  current && current > moment().add('days', N);

/** 小于之前的日期的不可以选 和 大于当前日期后的N天不可以选 */
const disableBeforeTodayAndAfterNToday = (current, N) =>
  (current && current < moment().subtract(1, 'days')) ||
  (current && current > moment().add('days', N));

/** 已复制到剪切板 */
const exportTradeInfo = (value) => {
  if (navigator.clipboard) {
    message.success('已复制到剪切板');
    return navigator.clipboard.writeText(value).catch((e) => {
      throw e ? e : new DOMException('拷贝失败');
    });
  } else {
    console.log('navigator.clipboard 有问题');
    const tmpText = document.createElement('textarea');
    tmpText.value = value;
    document.body.appendChild(tmpText);
    tmpText.select();
    document.execCommand('copy');
    message.success('已复制到剪切板');
    tmpText.remove();
  }
};

export {
  disableBeforeToday,
  disableAfterNToday,
  disableBeforeTodayAndAfterNToday,
  exportTradeInfo,
};
