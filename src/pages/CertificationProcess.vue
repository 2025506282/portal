<template>
  <div class="box">
    <div class="header-tag">
      <span class="icon-logo"></span>
      <b>{{tips}}</b>
      <p class="time"><b>{{time}}s</b></p>
    </div>
    <div class="logo-box">
      <img src="https://portal-img.oss-cn-hangzhou.aliyuncs.com/default/ruxiaode.jpg" class="logo"/>
      <div class="tips-box">
        <span>赞助商广告</span>
      </div>
    </div>
    <div class="jump-box">
      <div v-on:click="jump">
        <span>跳过</span>
      </div>
    </div>
    <CommonBottom></CommonBottom>
  </div>
</template>

<script>
  import $ from 'jQuery';
  import {Toast} from 'mint-ui'

  export default {
    name: "home",
    data() {
      return {
        tips: '正在检查网络连接安全性，请稍等.....    ',
        time: 5,
        timer: null,
        mobile: '',
        mac: '',
        loginUrl: '',
        type: '0'
      }
    },
    mounted: function () {
      let that = this;
      that.mobile = this.$route.query.mobile;
      that.mac = this.$route.query.mac;
      that.$cookies.remove('mobile');
      that.$cookies.remove('mac');
      that.$cookies.set('mobile',that.mobile);
      that.$cookies.set('mac',that.mac);
      if (this.$route.query.type) {
        this.type = this.$route.query.type;
        /***
         * 如果mac有记录type=5006则请求相应的loginUrl
         */

        that.timer = setInterval(function () {
          that.time -= 1;
          if (that.time === 3) {
            that.tips = '正在请求认证放行，请稍等.....           ';
          }
          if (that.time === 1) {
            that.tips = '即将前往个人中心.....      ';
            clearInterval(that.timer);
            that.jump();
          }
        }, 1000);
      }


    },
    methods: {
      jump: function () {
        let that = this;
        if (that.type === '5006' || that.type === '0') {
          $.post(that.CommonConst.BASE_URL + 'demo/publics/userlogin', {
            "mobile": that.mobile,
            "mac": that.mac,
          }, function (response) {
            if (response.error === '0' || response.error === '5006') {
              that.loginUrl = response.data.login_url;
              location.href = that.loginUrl;
            } else {
              // Toast(response.message);
            }
          })
        } else if (that.type === '2') {
          that.loginUrl = that.$route.query.loginUrl;
          location.href = that.loginUrl;
        }
      }
    }
  }
</script>

<style scoped>
  .header-tag .time {
    float: right;
    margin-right: 0.2rem;
    height: 0.23rem;
    color: rgba(51, 60, 75, 1);
    font-size: 0.14rem;
    font-family: Arial;
  }

  .logo-box {
    font-size: 0;
    position: relative;
  }

  .logo {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .tips-box {
    padding: 0.01rem 0.03rem;
    height: 0.16rem;
    border: 1px solid rgba(187, 187, 187, 1);
    border-radius: 4px;
    background-color: rgba(159, 160, 160, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 0.1rem;
    font-family: Microsoft Yahei;
    position: absolute;
    bottom: 0.09rem;
    right: 0.07rem;
  }

  .jump-box {
    overflow: hidden;
  }

  .jump-box > div {
    margin-top: 0.1rem;
    margin-right: 0.07rem;
    margin-bottom: 0.17rem;
    float: right;
    width: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    border-radius: 1rem;
    background-color: rgba(229, 28, 35, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 0.12rem;
    font-family: Arial;
  }
</style>
