import store from '../store'
const appConfigs = [
  {
    name: 'sub-vue',
    entry: '//localhost:7777/',
    activeRule: '/sub-vue',
  },
  {
    name: 'sub-react',
    entry: '//localhost:7788/',
    activeRule: '/sub-react',
  },
  {
    name: 'react-webpack5',
    entry: '//localhost:7789/',
    activeRule: '/react-webpack5',
  }
]

const microApps = appConfigs.map(item => ({
  ...item,
  container: '#subapp-viewport',// 子应用挂载的div
  props:{
    routerBase:item.activeRule,// 下发路由给子应用，子应用根据该值去定义qiankun环境下的路由
    getGlobalState: store.getGlobalState // 下发getGlobalState方法
  }
}))

export default microApps