<!--  -->
<template>
  <div>
    <div class="top">
      <div class="red">
        <h4 class="title">Nico小酒馆抽奖活动</h4>
        <div class="head">
          <img :src="info.img" alt="" />
        </div>
      </div>
      <div class="content">
        <p>{{ info.username }}</p>
        <p>恭喜您获得红包</p>
        <p>{{ info.money }}</p>
        <span>元</span>
      </div>
    </div>
    <!-- eslint-disable -->
    <div class="tip">
      您已参加了抽奖活动，与朋友分享可增加中奖几率哦！
    </div>
    <button @click="back">确认</button>
  </div>
</template>
<script>
import commonWx from "../assets/js/wx";
import cookie from "@/assets/js/cookie"
export default {
  name: "RedEnvelopes",
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.redEn();
  },
  methods: {
    redEn() {
      // this.userimg = cookie.get('headimgurl')
      // this.nickname = cookie.get('nickname')
      this.$api.common.gethongbao().then(res => {
        this.info = res.data;
      });
      commonWx.getCode(this.share);
    },
    back() {
      this.$router.replace("/");
    },
    share(res) {
      commonWx.pengYouQuan(res.data.data, this.red);
    },
    red() {
      // console.log(111)
    }
  }
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 669px;
  background: rgba(242, 242, 242, 1);
  border-radius: 0px 0px 24px 24px;
  margin-bottom: 20px;
  .red {
    width: 100%;
    height: 301px;
    background-image: url("../assets/images/red.png");
    background-size: 100% 100%;
    position: relative;
    .title {
      width: 100%;
      height: 128px;
      // background: rgba(255, 255, 255, 1);
      font-size: 36px;
      font-weight: 400;
      box-sizing: border-box;
      padding-left: 33px;
      padding-top: 68px;
      color: rgba(255, 243, 195, 1);
    }
    .head {
      width: 129px;
      height: 129px;
      border-radius: 14px;
      position: absolute;
      bottom: -60px;
      left: 50%;
      transform: translateX(-50%);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .content {
    width: 100%;
    text-align: center;
    margin-top: 75px;
    p {
      font-size: 32px;
      color: rgba(5, 5, 5, 1);
      // line-height: 50px;
      &:first-child {
        font-size: 32px;
        margin-bottom: 15px;
      }
      &:nth-child(2) {
        color: #818181;
        font-size: 28px;
        margin-bottom: 3px;
      }
      &:nth-child(3) {
        font-size: 124px;
        display: inline;
      }
    }
  }
}
.tip {
  font-size: 28px;
  font-weight: 500;
  color: rgba(129, 129, 129, 1);
  text-align: center;
  margin-bottom: 186px;
  padding: 0 20px;
}
button {
  width: 680px;
  height: 88px;
  background: rgba(219, 89, 67, 1);
  border-radius: 44px;
  outline: none;
  border: none;
  text-align: center;
  line-height: 88px;
  font-family: HuXiaoBoKuHei;
  margin-left: 35px;
  color: #fff;
  font-size: 40px;
  margin-bottom: 5px;
}
</style>
