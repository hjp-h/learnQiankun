const { defineConfig } = require("@vue/cli-service");
const { name } = require("../package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = "umd";
  },
  devServer: {
    port: process.env.VUE_APP_PORT, // 在.env中VUE_APP_PORT=7788，与父应用的配置一致
    headers: {
      "Access-Control-Allow-Origin": "*", // 主应用获取子应用时跨域响应头
    },
  },
});
