//  代理文件
const target = 'http://192.168.0.123:8017'; // 主系统部署路径

const COMMON_URL = 'http://192.168.1.123:8762'; // osp 测试环境

const XONE_API = 'http://192.168.1.123:8011'; // 开发环境

export default {
  //XONE接口代理
  '/xone-api': {
    target: XONE_API,
    changeOrigin: true,
    pathRewrite: { '^/xone-ipo-api': '' },
  },
  '/common-api': {
    target: COMMON_URL,
    changeOrigin: true,
    pathRewrite: { '^/common-api': '/' },
  },
  // 基座对应的配置
  '/xc-frame': {
    target,
    changeOrigin: true,
  },
  '/dev-server': {
    target,
    changeOrigin: true,
  },
  '/websocket': {
    target: target,
    changeOrigin: true,
    ws: true,
  },
  // '/message-api': {
  //   target: target,
  //   changeOrigin: true,
  // },
  // =============end

  // 投后模块被拆分成了多个模块，所以这里要拆分处理
  // 组合
  '/pone-api': {
    target: COMMON_URL,
    changeOrigin: true,
    pathRewrite: { '^/pone-api': '/' },
  },
  '/pone-websocket': {
    target: target,
    changeOrigin: true,
    ws: true,
  },
};
