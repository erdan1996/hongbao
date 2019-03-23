<template>
<!-- eslint-disable -->
  <div class="hello">
    <div class="bannerbox">
        <!-- <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in lunbolist" :key="index">
            <img :src="item" alt="" />
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper> -->
        <img :src="imgurl" alt="">
    </div>
    <div class="draw">
      <div class="title">
        <p>点击下列奖品图片抽奖</p>
      </div>
      <ul @click.prevent="handleClick">
        <li v-for="(item, index) in gitftlist" :key="index">
          <div class="img">
            <img :src="item.img" alt="" :data-index="index" />
          </div>
          <p class="prize">{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="img">
        <img src="../assets/images/logo.png" alt="" />
      </div>
      <h5>活动介绍</h5>
      <div class="chinese" v-html="intr.content"></div>
    </div>
    <van-popup v-model="show">
       <p style="font-size: 28px;text-align: center;">长按关注后参与抽奖</p>
      <img :src="url" alt="" class="qr-code" :close-on-click-overlay="qq" />
    </van-popup>
  </div>
</template>

<script>
import cookie from "@/assets/js/cookie"
import commonWx from "../assets/js/wx";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        // 循环滚动
        observer: true,
        observeParents: true,
        loop: true,
        //轮播图分页
        pagination: {
          el: ".swiper-pagination",
          clickable: false
        }
      },
      lunbolist: [],
      gitftlist: [],
      intr: {},
      flag: 0,
      info: {},
      url: "",
      show: false,
      code: '',
      qq: false,
      imgurl: ''
    };
  },
  created() {
    this.setinfo()
    this.setlunbo();
  },
  methods: {
    setinfo() {
      const info = cookie.get('subscribe')
      const url = cookie.get('wechat_qrcode')
      // const openid = cookie.get('openid')
      // this.$api.common.refresh(openid)
      
      if (Number(info) === 0) {
        this.countDown()
        this.url = url
        this.show = true
      }
    },
    async countDown() {
      const info = cookie.get('subscribe')
      const openid = cookie.get('openid')
      
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (Number(info) === 0) {
        this.codeTime = this.codeTime - 1
        this.timer = setTimeout(() => {
          this.getrefresh()
          this.countDown()
        }, 1000)
        this.$once('hook:beforeDestroy', () => {
          clearInterval(this.timer)
        })
      } else {
        clearTimeout(this.timer)
      }
    },
    getrefresh() {
      const openid = cookie.get('openid')
      this.$api.common.refresh({openid}).then(res => {
        res = res.data
        if (res.code === 1) {
          cookie.set('subscribe', 1)
          this.show = false
          this.setlunbo()
        }
      })
    },
    // async login() {
    //   await this.$api.common.login().then(res => {
    //     alert(res);
    //     const data = res.data;
    //     if (typeof data === "string") {
    //       this.url = data;
    //       this.show = true;
    //     }
    //   });
    //   this.setlunbo();
    // },
    handleClick(e) {
      if (e.target.nodeName.toLowerCase() === "img") {
        const index = parseInt(e.target.dataset.index);
        this.doSomething(index);
      }
    },
    doSomething() {
      this.$router.push({ path: "/success" });
    },
    async setlunbo() {
      const info = cookie.get('subscribe')
      commonWx.getCode(this.share);
      if (Number(info) === 0) {
        return
      }
      await this.$api.common.getlunbo().then(res => {
        const arr = res.data.carousel;
        for (var k in arr) {
          this.lunbolist.push(arr[k].img);
        }
        this.imgurl = this.lunbolist[0]
        const array = res.data.prize;
        for (var i in array) {
          this.gitftlist.push(array[i]);
        }
        this.intr = res.data.introduction[0];
      });
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hellotitle {
  margin-top: 26px; 
}
.bannerbox {
  box-sizing: border-box;
  height: 1334px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.draw {
  .title {
    display: flex;
  width: 100%;
  height: 120px;
  background: rgba(245, 245, 245, 1);
  // border:1px solid rgba(235,235,235,1);
  position: relative;
  color: #000;
  text-align: center;
  font-size: 28px;
  .img {
    width: 38px;
    height: 45px;
    img {
      width: 100%;
      height: 100%;
    }
  }
    p {
      display: block;
      font-size: 30px;
      text-align: center;
    width: 100%;
    height: 120px;
    line-height: 120px;
    color: #323232;
    box-sizing: border-box;
  }
  }
}
.draw ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 20px;
  li {
    text-align: center;
    cursor: pointer;
    margin-right: 40px;
    &:nth-child(3) {
      margin-right: 0px;
    }
    .prize {
      color: #424242;
      margin-top: 16px;
      margin-bottom: 48px;
    }
    .img {
      position: relative;
      width: 210px;
      height: 160px;
      background: rgba(242, 242, 242, 1);
      border-radius: 16px;
      img {
        width: 100%;
        height: 100%;
      }
      p {
        position: absolute;
        bottom: 7px;
        left: 32px;
        font-size: 36px;
        font-family: HuXiaoBoKuHei;
        font-weight: 400;
        color: rgba(66, 66, 66, 1);
      }
    }
  }
}
.content {
  width: 100%;
  height: 66px;
  background: rgba(245, 245, 245, 1);
  // border:1px solid rgba(235,235,235,1);
  position: relative;
  .img {
    position: absolute;
    top: 7px;
    left: 9px;
    width: 38px;
    height: 45px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  h5 {
    color: #323232;
    line-height: 66px;
    box-sizing: border-box;
    padding-left: 69px;
  }
  .chinese {
    box-sizing: border-box;
    padding: 32px 18px 10px 20px;
    color: #8f8f8f;
    line-height: 38px;
  }
  .qr-code {
    width: 266px;
    height: 250px;
  }
}
</style>
