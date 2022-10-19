import axios from "axios";
// 引入进度条样式
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const request = axios.create({
  baseURL: "http://localhost:3000",
});

// 请求拦截器
request.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
