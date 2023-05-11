import dayjs from 'dayjs';

/** 格式化时间
 *  @date 时间, 若不传则取当前时间
 *  @format 格式的标准, 若不传则取默认格式标准'YYYY-MM-DD', YYYYMMDD | YYYY-MM-DD HH:mm:ss
 *  formatDate(null, 'YYYYMMDD')
 *  formatDate(20220701, 'YYYY-MM-DD')
 */
const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (date) {
    return dayjs(String(date)).format(format);
  }
  return dayjs().format(format);
};

/** 判断年份是否是闰年 */
function IsLeapYear(nYear) {
  if ((nYear % 4 === 0 && nYear % 100 !== 0) || nYear % 400 === 0) {
    return true;
  }
  return false;
}
/** 判断日期是否是正常的 */
const isValidDate = (nDate) => {
  if (nDate < 19010101) {
    return false;
  }
  const nYear = Number((nDate / 10000).toFixed(0));
  const nMonth = Number(((nDate - nYear * 10000) / 100).toFixed(0));
  const nDay = Number((nDate - nYear * 10000 - nMonth * 100).toFixed(0));
  if (
    nYear < 1901 ||
    nYear > 2199 ||
    nMonth < 1 ||
    nMonth > 12 ||
    nDay < 1 ||
    nDay > 31
  ) {
    return false;
  }
  if ([4, 6, 9, 11].includes(nMonth) && nDay > 30) {
    return false;
  }
  if (
    nMonth === 2 &&
    ((IsLeapYear(nYear) && nDay > 29) || (!IsLeapYear(nYear) && nDay > 28))
  ) {
    return false;
  }
  return true;
};
/** 转换日期区间为对象形式
 * @param targetDate 日期值
 * @param {string} dateStart 开始日期的字段名
 * @param {string} dateEnd 结束日期的字段名
 * @param {string} format 日期格式
 * @returns {dateStart, dateEnd}
 */
function transDateRange(targetDate, dateStart, dateEnd, format = 'YYYYMMDD') {
  const date = targetDate || ['', ''];
  return {
    [dateStart]: date[0] && formatDate(format, date[0]),
    [dateEnd]: date[1] && formatDate(format, date[1]),
  };
}

export { formatDate, isValidDate, transDateRange };
