import LessPluginFunctions from 'less-plugin-functions';
import path from 'path';
import WebpackChain from 'webpack-chain';

// 识别 xlsx, zip，pdf 文件
const fileLoaderConfig = (config: WebpackChain) => {
  config.module
    .rule('xlsx')
    .test(/\.(xlsx|zip|pdf)$/)
    .use('file-loader')
    .loader('file-loader');
};

// 重新配置less-loader，使其能够换肤
const LessLoaderConfig = (config: WebpackChain) => {
  const rule = config.module.rule('less');
  const cssModule = rule.oneOf('css-modules');
  const css = rule.oneOf('css');
  // 删除less-loader
  cssModule.uses.delete(require.resolve('@umijs/deps/compiled/less-loader'));
  css.uses.delete(require.resolve('@umijs/deps/compiled/less-loader'));

  // 重新添加 less-loader
  const options = {
    lessOptions: {
      modifyVars: {
        'ant-prefix': 'xone-ipo-ant',
        '@border-style-base': 'solid',
        '@border-radius-base': '1px',
        '@layout-header-height': '50px',
        '@layout-header-padding': '0',
        '@font-size-base': '12px',
        '@font-family':
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif",
        '@font-feature-settings-base': 'tnum',
        '@outline-blur-size': '0',
        '@shadow-1-up':
          '0 -6px 16px -8px rgba(0, 0, 0, 0.24), 0 -9px 28px 0 rgba(0, 0, 0, 0.15), 0 -12px 48px 16px rgba(0, 0, 0, 0.09)',
        '@shadow-1-down':
          '0 6px 16px -8px rgba(0, 0, 0, 0.24), 0 9px 28px 0 rgba(0, 0, 0, 0.15), 0 12px 48px 16px rgba(0, 0, 0, 0.09)',
        '@shadow-1-left':
          '-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)',
        '@shadow-1-right':
          '6px 0 16px -8px rgba(0, 0, 0, 0.24), 9px 0 28px 0 rgba(0, 0, 0, 0.15), 12px 0 48px 16px rgba(0, 0, 0, 0.09)',
        '@shadow-2':
          '0 3px 6px -4px rgba(0, 0, 0, 0.36), 0 6px 16px 0 rgba(0, 0, 0, 0.24), 0 9px 28px 8px rgba(0, 0, 0, 0.15)',
        '@btn-height-base': '24px',
        '@input-height-base': '24px',
        '@select-item-selected-font-weight': '600',
        '@table-padding-vertical': '6px',
        '@table-padding-horizontal': '16px',
        '@card-shadow':
          '0 1px 2px -2px rgba(0, 0, 0, 0.48), 0 3px 6px 0 rgba(0, 0, 0, 0.36),0 5px 12px 4px rgba(0, 0, 0, 0.27)',
        '@pagination-item-size': '28px',
        '@tabs-card-height': '28px',
        '@tabs-horizontal-padding': '6px 0',
        '@descriptions-default-padding': '6px 16px',
        '@descriptions-title-margin-bottom': '6px',
      },
      javascriptEnabled: true,
      plugins: [new LessPluginFunctions({ alwaysOverride: true })],
    },
  };

  cssModule
    .use('less-loader')
    .loader('less-loader')
    .options({ ...options });

  css
    .use('less-loader')
    .loader('less-loader')
    .options({ ...options });

  // 添加 style-resources-loader 将文件注入到每个less文件的后面
  const resourceOptions = {
    patterns: [
      path.resolve(__dirname, '../src/styles/less-functions-overrides.less'),
      path.resolve(__dirname, '../src/styles/antd-vars-patch.less'),
    ],
    injector: 'append',
  };

  cssModule
    .use('style-resources-loader')
    .loader('style-resources-loader')
    .options({ ...resourceOptions });
  css
    .use('style-resources-loader')
    .loader('style-resources-loader')
    .options({ ...resourceOptions });
};

const chainWebpack = (config: WebpackChain) => {
  fileLoaderConfig(config);
  LessLoaderConfig(config);
};

export default chainWebpack;
