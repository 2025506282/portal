<template>
  <div class="home">
    <div class="content">
      <div class="content-logo-box">
        <img src="../assets/images/password.png" class="content-logo"/>
      </div>
      <transition enter-active-class="animated pulse">
        <div v-show="isAnimate" class="content-title-box">
          <p v-show="isAnimate" class="content-title">输入登录密码</p>
        </div>
      </transition>
      <div>
        <p class="content-title-tips">
          请输入4-16位密码
        </p>
      </div>
      <div class="input-box">
        <div>
          <input type="password" id="password" v-model.trim="password" class="input"/>
          <a href="#" id="forget-password" @click="toCode">忘记密码&gt;</a>
        </div>
      </div>
      <hr/>
      <div class="next-step-box">
        <div class="next-box" v-if="!isLoading">
          <a
            v-bind:class="this.trimAll(password).length>3&&this.trimAll(password).length<17?nextStepGoingClass:nextStepStayClass"
            v-on:click="submit">下一步</a>
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
  import $ from 'jQuery';

  export default {
    name: "home",
    mounted: function () {
      this.isAnimate = true;
      this.mobile = this.$route.query.mobile;
      this.mac = this.$route.query.mac;
    },
    data() {
      return {
        isAnimate: false,
        password: "",
        mobile: "",
        mac: "",
        isStay: true,
        checked: true,
        isLoading: false,
        nextStepStayClass: "next-step-stay",//下一步按钮是否可用
        nextStepGoingClass: "next-step-go"
      }
    },
    methods: {
      /***
       * 提交密码，以及判断密码是否符合规范
       * @returns {boolean}
       */
      submit: function () {
        if (this.password.length < 4 || this.password.length > 17) {
          return false;
        } else {
          let that = this;
          $.post(this.CommonConst.BASE_URL + "demo/publics/portalLogin", {
              "mobile": that.mobile,
              "password": that.password,
              "mac": that.mac
            },
            function (response) {
              if (response.error === '0'||response.error === '5006') {
                that.isLoading = true;
                setTimeout(function () {
                  that.$router.push({
                    path: '/certificationProcess',
                    query: {
                      "type": '2',
                      "loginUrl": response.data.login_url,
                      "mobile": that.mobile,
                      "mac": that.mac
                    }
                  })
                }, 1000);
              } else {
                Toast(response.message);
              }
            });
        }
      },
      toCode: function () {
        let that = this;
        $.get(this.CommonConst.BASE_URL + "demo/publics/sendSms", {
          "mobile": that.mobile,
          "template_id": 'SMS_123797289'
        }, function (response) {
          if (response.error === 0) {
            that.isLoading = true;
            setTimeout(function () {
              that.$router.push({
                path: '/code',
                query: {
                  "mobile": that.mobile,
                  "mac": that.mac,
                  "isEdit": true,
                  "isMac": true
                }
              });
            }, 2000)
          }
        });

      }
    }
  }
</script>

<style scoped>
  #forget-password {
    position: absolute;
    font-size: 0.12rem;
    right: -0.35rem;
    top: 0.03rem;
    text-decoration: none;
    color: rgba(16, 16, 16, 1);
    font-family: Arial;
  }
</style>
