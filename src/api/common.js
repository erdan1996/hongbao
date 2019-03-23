import axios from "./http";
import qs from 'qs';
const common = {
  getlunbo(params) {
    return axios.get("/api/index/index", { params });
  },
  getchoujiang(params) {
    return axios.get("/api/index/random", { params });
  },
  gethongbao(params) {
    return axios.get("/api/index/money", { params });
  },
  login(params) {
    return axios.get("/api/login/index", { params });
  },
  refresh(params) {
    return axios.post("/api/login/getSubscribe", qs.stringify(params));
  }
};

export default common;
