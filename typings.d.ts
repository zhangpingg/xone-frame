declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.js';
declare module 'react/jsx-runtime';
declare module '*.tsx';
declare module '*.ts';
declare module '*.d.ts';
declare module '*.module.less';
declare module 'less-plugin-functions';
declare module '*.svg' {
  export function ReactComponent(
    // eslint-disable-next-line no-unused-vars
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  tabs: any;
  authority: any;
  subscribe: any;
  store: any;
  $webConfig: any;
  framework: any;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
}
