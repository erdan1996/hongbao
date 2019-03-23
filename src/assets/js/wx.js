import api from "../../api/index";
import wx from "weixin-js-sdk";

const commonWx = {
  // getUrl () {
  //   return encodeURIComponent(window.location.href.split("#")[0])
  // },
  async getCode(fn) {
    const url = encodeURIComponent(window.location.href.split("#")[0]);
    api.wx
      .JSSDK({
        url
      })
      .then(res => {
        fn(res);
        res = res.data;
        if (res.code === api.CODE_OK && res.data) {
          const data = res.data;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: [
              "updateAppMessageShareData",
              "updateTimelineShareData",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ"
            ] // 必填，需要使用的JS接口列表
          });
          wx.error(res => {
            // config验证失败回调函数
            console.log(res);
          });
        }
        return res.data;
      });
  },
  /**
   * 分享
   * @param {shareTitle} 分享标题
   * @param {shareUrl} 分享链接
   * @param {shareImg} 分享图片
   * @param {shareDesc} 分享描述
   */
  async pengYouQuan(res, fn) {
    wx.ready(() => {
      
      wx.updateAppMessageShareData({
        title: res.title, // 分享标题
        desc: res.des, // 分享描述
        link: 'http://kf0001.rungyun.cn/wap#/helloword', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: res.img, // 分享图标
        success: function() {
          fn();
        }
      });
    });
  }
};
export default commonWx;
