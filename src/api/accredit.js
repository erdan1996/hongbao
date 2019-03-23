import axios from './http'
// import qs from 'qs'

const accredit = {
  accreditLogin (params) {
    return axios.get(`/api/wechat/authorize.html`, {
      redirect_url: params
    }).then((res) => {
      console.log(`跳转链接：${res.data}`);
      res = res.data;
      window.location.href = res.data.authorize_url;
    })
  }
};

export default accredit;
