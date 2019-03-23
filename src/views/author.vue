<template>
  <div class="wrapper">
    <div class="header">登录授权</div>
    <div class="img-wrap">
    </div>
    <div class="content">正在授权中...</div>
  </div>
</template>

<script>
import { isLogin } from '@/assets/js/isLogin'
import cookie from "@/assets/js/cookie"
export default {
  data () {
    return {
      sessid: ''
    }
  },
  methods: {
    postToken() {
      // this.$api.common.login()
      //   .then(this.postTokenSucc)
      //   .catch((e) => {
      //     console.log(e)
      //   })
      this.$router.replace('/')
    }
    // postTokenSucc (res) {
    //   // const path = this.$localStorage.get('authUrl')
    //   console.log(cookie.get('is_login'))  
    //   this.$router.replace('/')
    // }
  },
  created() {
    this.postToken()
  }
}

</script>
<style lang='less' scoped>

.wrapper {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 88px;
  box-shadow: 0px 0px 0px 0px rgba(5, 5, 5, 0.12);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
}
.img-wrap {
  margin-bottom: 100px;
}

</style>
