// http://localhost:8002/xc-frame/login
// http://localhost:8002/xc-frame/xone-ipo/cmf/xone/JYTRANS/newShareInfo

const commonBasePrefix = '/cmf/xone';

export default [
  {
    path: '/',
    component: '@/index',
    routes: [
      {
        // 表格（新股信息）
        path: `${commonBasePrefix}/JYTRANS/newShareInfo`,
        component: '@/page/xcTableDemo', //配置化表格
        // component: '@/page/xcConfigFormDemo', //配置化表单
        // component: '@/page/timerDemo', // 自定义hooks定时器
      },
    ],
  },
];
