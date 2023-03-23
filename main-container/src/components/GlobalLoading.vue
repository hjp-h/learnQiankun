<script>
export default {
  computed: {
    contentStyle() {
      return {
        width: this.width,
        height: this.width,
      };
    },
  },
  props: {
    width: {
      type: String,
      default: "50px",
    },
    height: {
      type: String,
      default: "50px",
    },
    loadingFont: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <div :class="$style.Loading" id="globalLoading">
    <span :class="$style.LoadingContent" :style="contentStyle"></span>
    <p :class="$style.LoadingFont" v-if="loadingFont">
      {{ loadingFont }}
    </p>
  </div>
</template>

<style lang="scss" module>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.Loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: #fff;
  opacity: 0.9;
  width: 100%;
  height: 100%;
  z-index: 10;
  &Font {
    font-weight: 500;
    margin-left: 15px;
    color: #409eff;
  }
  &Content {
    border: 6px solid #f3f3f3;
    border-radius: 50%;
    border-top: 6px solid #123455;
    width: 20px;
    height: 20px;
    animation: spin 1.6s linear infinite;
  }
}
</style>
