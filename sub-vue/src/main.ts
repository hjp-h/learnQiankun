import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./router";
import store from "./store";
import registerGlobalModule from "./store/global-register";
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
  registerGlobalModule(store, { user: { name: "hjp" } });
  render();
}
export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props: CommonObject) {
  console.log("[vue] props from main framework", props);
  registerGlobalModule(store, props ?? { user: { name: "hjp" } });
  render(props);
  props.onGlobalStateChange(
    (newState: CommonObject, oldState: CommonObject) => {
      console.log(
        `${props.name} 监听到状态改变`,
        newState,
        "oldState",
        oldState
      );
    }
  );
}

export async function unmount() {
  instance?.$destroy?.();
  instance.$el.innerHTML = "";
  instance = null;
}
