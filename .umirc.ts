import routes from './config/routes';
import proxy from './config/proxy';
import chainWebpack from './config/webpack.config';
import { defineConfig } from 'umi';

export default defineConfig({
  base: '/xc-frame/xone-ipo',
  publicPath: '/xone-ipo/',
  nodeModulesTransform: {
    type: 'none',
  },
  /**
   * headScripts 解决子系统中的publicPath不正确导致资源无法正确加载的问题
   *  window.publicPath =
      window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || "xone-ipo/";
   */
  headScripts: [`window.publicPath = "/xone-ipo/"`],
  favicon: '/xone-ipo/favicon.png',
  title: false,
  routes,
  qiankun: {
    slave: {},
  },
  dynamicImport: {
    loading: '@/components/loading',
  },
  fastRefresh: {}, // 开启快速刷新
  // mfsu: {},
  webpack5: {},
  proxy,
  hash: true, //让生成的文件包含 hash 后缀
  ignoreMomentLocale: true, //忽略 moment 的 locale 文件
  // devtool: false,
  extraBabelPlugins: [
    //配置额外的 babel 插件
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es', // default: lib
        style: true,
      },
      'antd',
    ],
  ],
  chainWebpack,
});
