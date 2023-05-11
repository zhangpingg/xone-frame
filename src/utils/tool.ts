/** 判断值是否为 null undefined */
const isNotNull = (val: any) =>
  ![null, undefined, 'null', 'undefined'].includes(val);

export { isNotNull };
