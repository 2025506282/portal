<template>
  <div class="home">
    <div class="content">
      <div class="content-logo-box">
        <img src="../assets/images/code.png" class="content-logo"/>
      </div>
      <transition enter-active-class="animated pulse">
        <div v-show="isAnimate" class="content-title-box">
          <p v-show="isAnimate" class="content-title">输入验证码</p>
        </div>
      </transition>
      <div>
        <p class="content-title-tips" v-if="isGetCode">
          <span>{{mobile}}</span>   &nbsp;  <span>&nbsp;{{time}}秒后重发&nbsp;&nbsp;&nbsp;&nbsp;</span>      
          没收到？
        </p>
        <p class="content-title-tips" v-else @click="sendAgain">
          <span>重新发送</span>
        </p>
      </div>
      <div class="input-box">
        <div>
          <input type="tel" id="password" v-model="code" maxlength="7" minlength="4" class="input"/>
        </div>
      </div>
      <hr/>
      <div class="next-step-box">
        <div class="next-box" v-if="!isLoading">
          <a v-bind:class="trimAll(code).length===4?nextStepGoingClass:nextStepStayClass" v-on:click="submit">下一步</a>
        </div>
        <div v-else>
          <mt-spinner type="triple-bounce" color="#26a2ff"></mt-spinner>
        </div>
      </div>
    </div>
    <div class="agree-argument-box">
      <input type="checkbox" id="agree" v-model="checked"/>
      <label for="agree">我同意此上网
        <router-link to="/agreement">服务条款</router-link>
      </label>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import $ from 'jQuery'

  export default {
    name: "home",
    mounted: function () {
      this.isAnimate = true;

      this.mobile = this.$route.query.mobile;
      this.mac = this.$route.query.mac;
      this.isMac = this.$route.query.isMac;
      if (this.$route.query.isEdit) {
        this.isEdit = this.$route.query.isEdit;
      }
      this.countdown();
    },
    data() {
      return {
        isGetCode: true,
        timer: null,
        time: 120,
        isAnimate: false,
        code: "",
        isLoading: false,
        isStay: true,

        checked: true,

        nextStepStayClass: "next-step-stay",
        nextStepGoingClass: "next-step-go",
        mobile: '',
        mac: '',
        isMac: false,
        isEdit: false,
      }
    },
    watch: {
      code: function (newVal, oldVal) {
        if (newVal.length > oldVal.length) {
          if (newVal.length === 1 || newVal.length === 3 || newVal.length === 5) {
            this.code += " ";
          }
        } else {
          if (newVal.trim().length === 1 || newVal.trim().length === 3 || newVal.trim().length === 5) {
            this.code = this.code.trim();
          }
        }
      }
    },
    methods: {
      /**
       * 输入密码验证登陆
       */
      submit: function () {
        let that = this;
        let code = this.Utils.trimAll(this.code);
        //是否需要需要设置密码
        if (this.isEdit) {
          $.post(this.CommonConst.BASE_URL+"demo/publics/isCode", {
            "code": code,
            "mobile": that.mobile
          }, function (response) {
            if (response.error == '0') {//临时放行三分钟
              that.$router.push({
                path: '/edit',
                query: {
                  "mobile": that.mobile,
                  "mac": that.mac
                }
              });
            } else {
              Toast(response.message);
            }
          })
        } else {
          $.post(this.CommonConst.BASE_URL+"demo/publics/portalLogin", {
            "mobile": that.mobile,
            "code": code,
            "mac": that.mac
          }, function (response) {
            if (response.error == '0'||response.error == '5006') {//临时放行三分钟
              // that.isGetCode = true;
              that.isLoading = true;
              let loginUrl = response.data.login_url;
              setTimeout(function(){
                that.$router.push({
                  path: '/certificationProcess',
                  query: {
                    "type": '2',
                    "loginUrl": loginUrl,
                    "mobile": that.mobile,
                    "mac": that.mac
                  }
                });
              },2000);
            } else if (response.error === '-1' || response.error === '0006') {//验证码错误
              Toast(response.message);
            }
          })
        }

      },
      /***
       * 时间倒计时
       */
      countdown: function () {
        let that = this;
        that.timer = setInterval(function () {
          if (that.time === 1) {
            that.isGetCode = false;
            clearInterval(that.timer);
          }
          that.time = that.time - 1;
        }, 1000);
      },
      /***
       * 再次发送验证码
       */
      sendAgain: function () {
        let that = this;
        $.ajax({
          url: that.CommonConst.BASE_URL+ + 'demo/publics/sendSms',
          data: {
            "mobile": that.mobile,
            "template_id": 'SMS_123797289'
          },
          success: function () {
            that.time = 120;
            that.isGetCode = true;
            that.countdown();
          }
        })
      }
    }
  }
</script>

