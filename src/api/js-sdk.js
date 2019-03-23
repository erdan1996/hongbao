import axios from "./http";
import qs from "qs";
const wx = {
  JSSDK(params) {
    return axios.post(`/api/login/getConfig`, qs.stringify(params));
  }
};
export default wx;
