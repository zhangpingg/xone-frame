export const qiankun = {
  // 应用加载之前
  async bootstrap(props: Window): Promise<void> {
    console.log('xone-ipo bootstrap', props);
    // 本地public/config.json的配置文件
    fetch('/xone-ipo/config.json')
      .then((response) => response.json())
      .then((res) => {
        window.$webConfig = res;
      });
  },
  // 应用 render 之前触发
  async mount(props: Window): Promise<void> {
    console.log('xone-ipo mount', props);
    window.tabs = props.tabs;
    window.authority = props.authority;
    window.subscribe = props.subscribe;
    window.store = props.store;
    // 系统配置列表
    await fetch('/common-api/system/pubSysParam/getPage', {
      method: 'POST',
      headers: {
        Accept: 'application/json; charset=UTF-8',
        'Content-Type': 'application/json; charset=UTF-8',
        Token: localStorage.getItem('user_token') || '',
      },
      mode: 'cors',
      body: JSON.stringify({
        page: 1,
        limit: 10000,
      }),
    })
      .then((response) => response.json())
      .then((res: any) => {
        localStorage.setItem(
          'systemConfig',
          JSON.stringify(res.data?.records || []),
        );
      });
  },
  // 应用卸载之后触发
  async unmount(props: unknown): Promise<void> {
    console.log('xone-ipo unmount', props);
  },
};
