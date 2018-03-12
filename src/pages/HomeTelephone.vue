<template>
  <div class="content">
    <div class="content-logo-box">
      <img src="../assets/images/tel.png" class="content-logo"/>
    </div>
    <transition enter-active-class="animated pulse">
      <div v-show="isAnimate" class
        ="content-title-box">
        <p class="content-title">{{tips}}</p>
      </div>

    </transition>
    <div>
      <p class="content-title-tips">
        为享受更多权益和服务，请输入手机号
      </p>
    </div>
    <div class="input-box">
      <div>
        <p>+86<span>&nbsp;&gt;&nbsp;</span></p>
        <input type="tel" id="tel" v-model="tel" maxlength="13" class="input"/>
      </div>
    </div>
    <hr/>
    <div class="next-step-box">
      <div class="next-box">
        <a v-if="!isSecondLogin&&!isLoading"
           v-bind:class="this.trimAll(tel).length===11?nextStepGoingClass:nextStepStayClass"
           v-on:click="submit"
           v-bind:readonly="isSecondLogin"
        >
          下一步
        </a>
        <div v-else-if="isLoading">
          <mt-spinner type="triple-bounce" color="#26a2ff"></mt-spinner>
        </div>
        <div v-else class="second-login-box">
          <a class="switch-account" @click="changeAccount">切换账号</a>
          <a class="login" @click="secondLogin">登陆</a>
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
    created: function () {
      this.isAnimate = true;
      let that = this;
      that.locationJson = this.Utils.transLocation(location.href);
      that.locationJson['client_type'] = 'mobile';
      if(that.locationJson.hasOwnProperty('gwid')) {
        that.locationJson['nasid'] = that.locationJson.gwid;
      }
      $.get(this.CommonConst.BASE_URL + "demo/place/read", that.locationJson, function (response) {
        that.json = response.data;
        that.userInfo = response.data.user_info;
        that.isSecondLogin = that.json.is_show === 1 ? true : false;
        that.isMac = that.json.is_show === 1 ? true : false;
        that.tel = that.isSecondLogin ? that.userInfo.mobile : '';
        if (that.tel.length > 0) {
          that.mobile = that.Utils.trimAll(that.tel);
          that.tel = that.tel.substr(0, 3) + ' ***' + that.tel.substr(6, 1) + ' ' + that.tel.substr(7, 4);
        }
        that.tips = that.isSecondLogin ? "Hi! " + that.userInfo.username : '输入手机号';
      })
    },
    data() {
      return {
        locationJson: {},
        isLoading: false,
        isSecondLogin: false,
        isMac: false,//是否含有mac记录
        isAnimate: false,
        tel: "",
        mobile: '',
        tips: "输入手机号",
        userInfo: {},
        place: {},
        json: {},
        isDisabled: true,
        checked: true,
        nextStepStayClass: "next-step-stay",
        nextStepGoingClass: "next-step-go",
      }
    },
    watch: {
      tel: function (newVal, oldVal) {
        if (newVal.trim().length > oldVal.trim().length) {
          if (newVal.length === 3 || newVal.length === 8) {
            this.tel += " ";
          }
        } else {
          if (newVal.trim().length === 4 || newVal.trim().length === 9) {
            this.tel = this.tel.trim();
          }
        }

      }
    },
    methods: {
      // 当用户第二次登陆
      secondLogin: function () {
        let that = this;
        if (!this.checked) {
          Toast('请勾选上网许可');
          return false;
        }
        $.ajax({
          type: 'post',
          url: this.CommonConst.BASE_URL + 'demo/publics/userlogin',
          data: {
            "mobile": that.mobile,
            "mac": that.locationJson.mac
          },
          success: function (response) {
            if(response.error==='5010'){
              Toast(response.message);
              return false;
            }
            if (response.error == 0) {
              //注册用户，，状态吗为0，不欠费
              that.isLoading = true;
              setTimeout(function () {
                that.$router.push({
                  path: '/certificationProcess',
                  query: {
                    "type": '0',
                    "mobile": that.mobile,
                    "mac": that.locationJson.mac
                  }
                });
              }, 2000)
            } else if (response.error == 5006) {
              //注册用户，状态吗为5006，欠费
              that.isLoading = true;
              setTimeout(function () {
                that.$router.push({
                  path: '/certificationProcess',
                  query: {
                    "type": '5006',
                    "mobile": that.mobile,
                    "mac": that.locationJson.mac
                  }
                });
              }, 2000)
            }
          },
          error: function () {
            Toast('请求出错');
          }
        })
      },
      changeAccount: function () {
        this.isSecondLogin = false;
        this.tel = '';
        this.tips = '输入手机号';
      },
      /***
       * 请求发送短信验证码
       */
      submit: function () {
        let that = this;
        var mobile = this.Utils.trimAll(this.tel);
        var json = {};
        json = that.locationJson;
        json['mobile'] = mobile;
        json['template_id'] = 'SMS_123797289';
        json['url'] = location.href;
        json['is_mac'] = that.isMac;
        if (this.Utils.checkMobile(this.tel) && this.checked) {
          $.post(this.CommonConst.BASE_URL + "demo/publics/login", json, function (response) {
            if(response.error==='5010'){
              Toast(response.message);
              return false;
            }
            //是二次登陆
            if (that.isMac) {
              if (response.error == '0010') {
                that.isLoading = true;
                $.ajax({
                  url: that.CommonConst.BASE_URL + 'demo/publics/sendSms',
                  data: {
                    "mobile": that.mobile,
                    "template_id": 'SMS_123797289'
                  },
                  success: function () {
                    that.isLoading = true;
                    setTimeout(function () {
                      that.$router.push({
                        path: '/code',
                        query: {
                          mobile: that.mobile,
                          isMac: true,
                          isEdit: false,
                          mac: that.locationJson.mac
                        }
                      });
                    }, 2000)
                  }
                })

              } else if (response.error == '0009') {
                that.isLoading = true;
                setTimeout(function () {
                  that.$router.push({
                    path: '/password',
                    query: {
                      mobile: mobile,
                      mac: that.locationJson.mac
                    }
                  });
                }, 2000)
              }
            } else {
              // 如果是新用户
              if (response.error == '0009') {
                that.isLoading = true;
                if (response.data.state === 0) {
                  $.ajax({
                    url: that.CommonConst.BASE_URL + 'demo/publics/sendSms',
                    data: {
                      "mobile": mobile,
                      "template_id": 'SMS_123797289'
                    },
                    success: function () {
                      that.isLoading = true;
                      setTimeout(function () {
                        that.$router.push({
                          path: '/code',
                          query: {
                            mobile: mobile,
                            isMac: false,
                            isEdit: true,
                            mac: that.locationJson.mac
                          }
                        });
                      }, 2000)
                    }
                  })

                } else {
                  // 如果是老用户
                  setTimeout(function () {
                    that.$router.push({
                      path: '/password',
                      query: {
                        mobile: mobile,
                        mac: that.locationJson.mac
                      }
                    });
                  }, 2000)
                }

              } else if (response.error == '0010') {
                $.ajax({
                  url: that.CommonConst.BASE_URL + 'demo/publics/sendSms',
                  data: {
                    "mobile": mobile,
                    "template_id": 'SMS_123797289'
                  },
                  success: function () {
                    that.isLoading = true;
                    setTimeout(function () {
                      that.$router.push({
                        path: '/code',
                        query: {
                          mobile: mobile,
                          mac: that.locationJson.mac,
                          isMac: that.isMac
                        }
                      });
                    }, 2000)
                  }
                })
              }
            }
          });
          return true;
        } else {
          if (this.tel.trim().length !== 13) {
            Toast('手机号格式有误');
            return false;
          }
          if (!this.checked) {
            Toast('请勾选上网许可');
            return false;
          }
          Toast('手机号格式有误');
        }
      },
    }
  }
</script>

<style scoped>
  .second-login-box {
    font-size: 0.18rem;
    overflow: hidden;
  }

  .switch-account {
    color: #bbbbbb;
    float: left;
  }

  .login {
    float: right;
    color: #00AAFF;
  }
</style>
