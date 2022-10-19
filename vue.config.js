const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  // 代理服务器
  devServer: {
    proxy: "http://localhost:3000",
  },
});
