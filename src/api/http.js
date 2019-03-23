import axios from "axios";
import store from "../store";
import base from "./base";
// import {
//   removeLocalStorage
// } from "@/assets/js/storage"
import { Toast } from "vant";

const NET_WORK_STATUS = "网络错误";

const errorHandle = status => {
  switch (status) {
    case 404:
      Toast("请求资源不存在");
      break;
    default:
      break;
  }
};

// 创建拦截器
const host = process.env.NODE_ENV === "development" ? base.dev : base.pro;
const instance = axios.create({
  timeout: 1000 * 60,
  baseURL: host
});
// 请求头
instance.defaults.headers.post["Content-type"] =
  "application/x-www-form-urlencoded";

// 每次请求有token携带Token
instance.interceptors.request.use(
  config => {
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    return config;
  },
  error => Promise.error(error)
);
// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      // 请求已经发出但不在2xx范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    }
  }
);
export default instance;
