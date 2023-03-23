<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="'当前用户：' + $store.state.global.user.name" />
    {{ isInQiankun ? "我在qiankun里" : "独立渲染" }}
    <button @click="go('sub-react')">跳转到sub-react</button>
    <button style="margin-left: 15px" @click="openSubVue">
      独立运行sub-vue
    </button>
    <button style="margin-left: 15px" @click="changeState">
      修改全局state
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
const isInQiankun = computed(() => (window as any).__POWERED_BY_QIANKUN__);
const store = useStore();
const go = (path: string) => history.pushState(null, "sub-react", "/sub-react");
const openSubVue = () => {
  if (!isInQiankun.value) {
    alert("当前已经是单独运行的子应用");
    return;
  }

  // window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ 是qiankun注入的子应用对应的地址，谨慎使用，生产环境建议将跳转地址维护在环境变量中
  window.open(window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__);
};
const changeState = () => {
  store.dispatch("global/setGlobalState", { user: { name: "迪迦" } });
};
</script>
