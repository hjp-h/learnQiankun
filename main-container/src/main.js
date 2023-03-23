import { createApp } from 'vue'
import {registerMicroApps,start,setDefaultMountApp} from 'qiankun'
import microApps from './configs/micro-app'
import App from './App.vue'
import loading from './directives/loading'
// 挂载
const app = createApp(App)
app.directive("loading",loading)
const instance = app.mount('#app')

// 定义loader方法，qiankunloading改变时，将变量赋值给App.vue的data中的isLoading
function loader(loading) {
  console.log("loading",loading,instance)
  if (instance) {
    instance.isLoading = loading
  }
}

// qiankun注册子应用
const apps = microApps.map(item => ({
  ...item,
  // qiankun提供了loader方法可以获取到子应用的加载状态
  loader
}))
registerMicroApps(apps, {
  beforeLoad: app => {
    console.log('before load app.name====>>>>>', app.name)
  },
  beforeMount: [
    app => {
      console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
    },
  ],
  afterMount: [
    app => {
      console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name);
    }
  ],
  afterUnmount: [
    app => {
      console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
    },
  ],
});
// 设置默认子应用
setDefaultMountApp('/sub-vue')
// 开启
start();
