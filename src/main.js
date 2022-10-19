import { createApp } from "vue";
import App from "./App.vue";
// 引入 element 插件
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// 引入所有 API
import * as API from "@/api/index";
// 引入store
import store from "@/store/index";
// 引入路由
import router from "@/router/index";
// 引入mitt
import mitt from "mitt";

const bus = mitt();
const app = createApp(App);
// 注册全局事件总线
app.config.globalProperties.$bus = bus;
// 使用 element 插件
app.use(store).use(router).use(ElementPlus, {
  locale: zhCn,
});
// 注册全局属性
app.config.globalProperties.$API = API;
app.mount("#app");
