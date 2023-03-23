import { nextTick, createApp, h } from "vue";
import Loading from "@/components/GlobalLoading.vue";

const toggleLoading = (el, binding) => {
  if (
    typeof binding.value === "object" ? binding.value.isLoading : binding.value
  ) {
    nextTick(() => {
      if (el.querySelector("#globalLoading")) {
        el.querySelector("#globalLoading").style.display = "flex";
      } else {
        insertDom(el, el);
      }
    });
  } else {
    el.querySelector("#globalLoading") &&
      (el.querySelector("#globalLoading").style.display = "none");
  }
};

const insertDom = (parent, el) => {
  parent.appendChild(el.mask);
};

export default {
  mounted(el, binding) {
    const loadingProps =
      typeof binding.value === "object"
        ? {
            loadingFont: binding.value.loadingFont,
          }
        : {};
    const Mask = createApp({
      render() {
        return h(Loading, loadingProps);
      },
    });
    const mask = Mask.mount(document.createElement("div"));

    el.instance = mask;
    el.mask = mask.$el;
    el.style.position = "relative";
    el.maskStyle = {};
    binding.value && toggleLoading(el, binding);
  },
  updated: function (el, binding={}) {
    console.log("updated",binding)
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding);
    }
  },
  unbind: function (el) {
    el.instance && el.instance.$destroy();
    el = null;
  },
};
