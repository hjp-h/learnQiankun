import { createApp } from 'vue'
import {registerMicroApps,start,setDefaultMountApp} from 'qiankun'
import microApps from './configs/micro-app'
import App from './App.vue'

createApp(App).mount('#app')

registerMicroApps(microApps, {
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
setDefaultMountApp('/sub-vue')
start();
