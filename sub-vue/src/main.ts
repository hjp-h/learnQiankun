import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./router";
import store from "./store";
// public-path
import "../src/config/public-path";
type CommonObject = {
  [key: string]: any;
};
// 渲染函数
let instance: any = null;
function render(props: CommonObject = {}) {
  const { container, routerBase } = props;
  // 路由声明
  const router = createRouter({
    history: createWebHistory(
      (window as any).__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL
    ),
    routes,
  });
  instance = createApp(App)
    .use(store)
    .use(router)
    .mount(container ? container.querySelector("#app") : "#app");
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props: CommonObject) {
  console.log("[vue] props from main framework", props);

  render(props);
}

export async function unmount() {
  instance?.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
