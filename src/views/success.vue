<!--  -->
<template>
  <div class="success">
    <div class="banner">
      <h4 class="title">Nico小酒馆抽奖活动</h4>
      <div class="tip">
        <div class="content">
          <p>{{ info.msg }}</p>
          <p>{{ info.data }}</p>
        </div>
      </div>
    </div>
    <div class="tishiinfo">您已参加了抽奖活动，与朋友分享可增加中奖几率哦！</div>
    <button @click="getwx" v-if="info.code">
      转发朋友圈最高领取88元微信红包
    </button>
    <!-- <div class="dialog" v-show="show" @click="close">
      <div class="img">
        <img src="../assets/jt.png" alt="" />
      </div>
    </div> -->
  </div>
</template>
<script>
import commonWx from "../assets/js/wx";
export default {
  name: "Success",
  data() {
    return {
      info: {},
      show: false,
      message: ''
    };
  },
  mounted() {
    this.choujiangma();
  },
  methods: {
    // close() {
    //   this.show = !this.show;
    // },
    getwx() {
      this.$dialog
        .confirm({
          title: "您有一个红包待领取",
          message: "领取红包"
        })
        .then(() => {
          this.$router.replace("/redEnvelopes");
      });
      commonWx.getCode(this.share);
    },
    share(res) {
      commonWx.pengYouQuan(res.data.data, this.red);
    },
    red() {
      // this.$router.replace("/redEnvelopes")
    },
    choujiangma() {
      this.$api.common.getchoujiang().then(res => {
        this.info = res.data;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.success {
  .banner {
    width: 100%;
    height: 380px;
    background: url("../assets/images/header.png");
    .title {
      width: 100%;
      height: 128px;
      // background: rgba(255, 255, 255, 1);
      font-size: 36px;
      font-weight: 400;
      box-sizing: border-box;
      padding-left: 33px;
      padding-top: 68px;
    }
    .tip {
      position: absolute;
      top: 168px;
      left: 20px;
      width: 710px;
      height: 286px;
      background: rgba(255, 255, 255, 1);
      border-radius: 20px;
      box-shadow: 0px 6px 30px 1px rgba(0, 0, 0, 0.2);
      .content {
        // width:291px;
        // height:84px;
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        p {
          line-height: 80px;
          font-size: 46px;
          display: block;
          width: 100%;
          color: #323232;
          text-align: center;
        }
      }
    }
  }
  .tishiinfo {
    position: absolute;
    top: 482px;
    left: 35px;
    color: #ccc;
    font-size: 24px;
    width: 680px;
    text-align: center;
  }
  button {
    position: absolute;
    top: 712px;
    left: 35px;
    width: 680px;
    height: 88px;
    background: rgba(255, 241, 0, 1);
    border-radius: 44px;
    font-size: 40px;
    font-family: HuXiaoBoKuHei;
    font-weight: 400;
    color: rgba(50, 50, 50, 1);
    outline: none;
    border: none;
  }
}
.dialog {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.6;
  .img {
    position: absolute;
    top: 0;
    right: 25px;
  }
}
</style>
