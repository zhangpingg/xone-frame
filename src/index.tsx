import { FC, useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn';
import {
  autoFixContext,
  KeepAlive,
  useAliveController,
  AliveScope,
} from 'react-activation';
import store from './redux/store';
import { XcConfigProvider } from 'xunce-design';
import { XoConfigProvider } from 'xone-design';
import LayoutWrap from './LayoutWrap';
import { getFoundationVersion } from '@/utils/systemConfig.js';
import '@/styles/base.less';
import 'xunce-design/dist/index.esm.css';
import 'xone-design/dist/index.esm.css';
import commonStyles from '@/styles/common.less';

// 自动修复
autoFixContext([
  require(process.env.NODE_ENV === 'development'
    ? 'react/jsx-dev-runtime'
    : 'react/jsx-runtime'),
  'jsx',
  'jsxs',
  'jsxDEV',
]);

// 对 message，modal，Notification 组件的前缀需要单独配置
ConfigProvider.config({
  prefixCls: 'xone-ipo-ant',
});

let timmer = 0;
const IndexPage: FC = ({ children }) => {
  const [comps, setComps] = useState<string[]>([]); // 打开过的菜单
  const [closeCode, setCloseCode] = useState<string>(''); // 当前关闭的菜单code
  const { dropScope } = useAliveController();

  // 监听关闭的code改变
  useEffect(() => {
    if (!closeCode) {
      return;
    }
    const index = comps.findIndex((key) => key === closeCode);

    if (index > -1) {
      comps.splice(index, 1);
      setComps(comps);
      dropScope(closeCode); // 删除作用域
    }
    // 重置 colsecode
    setCloseCode('');
  }, [closeCode]);

  // tab 关闭时，清除缓存
  useEffect(() => {
    window.subscribe?.on('onTabClose', (id: string) => {
      setCloseCode(id);
    });
    return window.subscribe?.removeListener('onTabClose');
  }, []);

  // 解决热更新白屏问题
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      timmer = window.setInterval(() => {
        const iframeEl = document.querySelector('body > iframe');
        if (iframeEl) {
          document.body.removeChild(iframeEl);
        }
      }, 6000);
    }
    return () => clearInterval(timmer);
  }, []);

  const showKey = window.tabs?.getCurrentKey() as string; // 获取当前菜单code
  if (!comps.includes(showKey)) {
    comps.push(showKey);
    setComps(comps);
  }

  return (
    <Provider store={store}>
      <AliveScope>
        <ConfigProvider
          componentSize="small"
          locale={zhCN}
          prefixCls="xone-ipo-ant"
        >
          <XcConfigProvider
            value={{
              antPrefix: 'xcd-ant',
              antVersion: '4',
              antdConfigProvider: { locale: zhCN, componentSize: 'small' },
            }}
          >
            <XoConfigProvider
              value={{
                antPrefix: 'xod-ant',
                antVersion: '4',
                antdConfigProvider: { locale: zhCN, componentSize: 'small' },
                appConfig: {
                  FRONT_MODULE_VERSION: getFoundationVersion(),
                },
              }}
            >
              <LayoutWrap>
                <div
                  className={commonStyles['index-page-box']}
                  id="xc-xone-ipo"
                >
                  {comps.map((key) => {
                    if (key === showKey) {
                      return (
                        <div key={key} style={{ height: '100%' }}>
                          <KeepAlive name={key} id={key}>
                            {children}
                          </KeepAlive>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </LayoutWrap>
            </XoConfigProvider>
          </XcConfigProvider>
        </ConfigProvider>
      </AliveScope>
    </Provider>
  );
};

export default IndexPage;
