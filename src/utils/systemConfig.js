// 获取系统配置
const getSystemConfig = (key) => {
  const configList = JSON.parse(localStorage.getItem('systemConfig'));
  const configObject = (configList || []).find((d) => d.paraEncd === key);
  if (configObject) {
    return configObject && configObject.paraVal;
  }
  return null;
};

// 基座版本: '0'-默认(主线) | '1'-定制版本1(交银)"
const getFoundationVersion = () => {
  // return getSystemConfig('FRONT_MODULE_VERSION');
  return '1';
};
/** 获取角色名称 */
const getRoleName = () => {
  return getSystemConfig('IVSM_MNGR');
};

export { getFoundationVersion, getRoleName };
