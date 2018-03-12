<template>
  <div class="user-information">
    <mt-header title="个人中心" class="header">
      <mt-button v-if="isOnline===2" slot="right" class="status"><p>网络已连接<span></span></p></mt-button>
      <mt-button v-else-if="isOnline===1" slot="right" class="status not-pay"><p>网络未连接<img
        src="../assets/images/no_wife.png"/></p></mt-button>
      <mt-button v-else slot="right" class="status"><p>网络检测中...</p></mt-button>
    </mt-header>
    <div class="container-box">

        <div class="item item1" @click="toUserEdit">
          <img v-bind:src="userInfo.headImage" class="user-logo"/>
          <div class="user-information-box">
            <p class="username">{{userInfo.username}}</p>
            <p class="user-id-box">上网账号:<a class="user-id">{{userInfo.mobile}}</a></p>
          </div>
          <img src="../assets/images/ma.png" class="qr-code"/>
        </div>

      <div class="item item2">
        <div>
          <i class="iconfont icon-shijian"></i>
        </div>

        <div class="internet-time-box">
          <span v-if="userInfo.network_stuts==1">上网时长将于：<span class="internet-time">{{userInfo.network_end}}</span> 截止</span>
          <span class="not-pay" v-else>该帐号已欠费，是否马上&nbsp;&nbsp;
            <a @click="toRenew">续费</a>
            ？<span class="internet-time">&nbsp;&nbsp;</span>
            <span class="warn-logo" @click="alertTips">!</span>
          </span>
        </div>
      </div>
      <div class="item item3" @click="toUserRecord">
        <div>
          <i class="iconfont icon-19"></i>
        </div>
        <div>
          充值记录
        </div>
      </div>
      <div class="item item4"  @click="playGame">
        <div>
          <i class="iconfont icon-yule"></i>
        </div>
        <div>
          娱乐中心
        </div>
      </div>
      <div class="item" @click="toRenew">
        <div>
          <i class="iconfont icon-xufei"></i>
        </div>
        <div>
          上网续费
        </div>
      </div>
      <div class="item" @click="toUserService">
        <div>
          <i class="iconfont icon-fuwuguwen"></i>
        </div>
        <div>
          线下技术服务
        </div>
      </div>
      <div class="item"  @click="sufferInternet">
        <div>
          <i class="iconfont icon-ie"></i>
        </div>
        <div>
          去上网
        </div>
      </div>
      <div class="item item6" @click="logout">
        <span>退出登录/下线</span>
      </div>
    </div>
    <CommonBottom></CommonBottom>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {MessageBox} from 'mint-ui'
  import $ from 'jQuery';

  export default {
    name: "user-information",
    mounted: function () {
      let that = this;
      this.isOnlineType();
      this.timer = setInterval(function () {
        that.isOnlineType();
      }, 1000);
      this.mobile = this.$route.query.mobile ? this.$route.query.mobile : this.$cookies.get('mobile');
      this.mac = this.$route.query.mac ? this.$route.query.mac : this.$cookies.get('mac');
      this.getUserInfo();

    },

    data() {
      return {
        userInfo: {},
        mobile: '',
        isOnline: 0,
        timer: '',
        mac: '',
      }
    },
    methods: {
      /**
       * 判断在线用户的类型
       */
      isOnlineType: function () {
        let that = this;
        try {
          $.ajaxSetup({
            error: function (x, e) {
              that.isOnline = 1;
              return false;
            }
          });
          $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a&cb=?', function () {
            that.isOnline = 2;
          });
        } catch (ex) {
          that.isOnline = 1;
        }
      },
      /***
       * 获取用户信息
       */
      getUserInfo: function () {
        let that = this;
        $.ajax({
          method: 'get',
          url: that.CommonConst.BASE_URL + 'demo/user/userinfo',
          data: {
            "mobile": that.mobile
          },
          success: function(response) {
            if(response.error==0){
              that.userInfo = response.data;
              // if(that.userInfo.network_stuts!=1){
              //   that.alertTips();
              // }
            } else {
              Toast('获取用户信息失败');
              // that.logout();
            }
          }
        })
      },

      /**
       * 登出
       */
      logout: function () {
        this.$cookies.remove('mobile');
        this.$cookies.remove('mac');
        location.href = 'http://1.0.0.0/logout';
      },


      /***
       * 点击我要上网，让用户知道可以上网
       */
      sufferInternet: function () {
        location.href = 'https://www.baidu.com/';
      },
      /***
       * 点击娱乐中心时，
       */
      playGame: function () {
        Toast('该功能程序员正在加班中')
      },

      alertTips: function(){
        MessageBox({
          title: '提示',
          message: '如果您在3分钟之内未能完成续费操作，将会被系统强制下线！若续费完成请点击退出登录，再次登录即可。',
          confirmButtonText: '知道了'
        });
      },
      toRenew: function () {
        this.$router.push({
          path: '/renew',
          query: {
            userId: this.userInfo.id,
            mobile: this.mobile,
            mac: this.mac
          }
        });
      },
      toUserService: function(){
        this.$router.push({
          path: '/service',
          query: {
            "mobile": this.userInfo.mobile,
            "mac": this.userInfo.mac
          }
        });
      },
      toUserRecord: function(){
        this.$router.push({
          path: '/record',
          query: {
            "mobile": this.userInfo.mobile,
            "mac": this.userInfo.mac
          }
        });
      },
      toUserEdit: function(){
        this.$router.push({
          path: '/user-edit',
          query: {
            "mobile": this.userInfo.mobile,
            "mac": this.userInfo.mac
          }
        });
      },
      back: function(){
        history.go(-1);
      }
    }
  }
</script>

<style scoped>
  @import '../assets/icon/iconfont.css';
  .user-information {
    width: 100%;
    height: 100%;
    font-size: 0.14rem;
    overflow-x: hidden;
    background-color: rgba(239, 239, 239, 1);
  }

  .header {
    height: 0.5rem;
    line-height: 0.5rem;
    width: 100%;
    overflow: hidden;
    background-color: rgba(37, 44, 53, 1);
  }

  .status {
    color: rgba(37, 155, 36, 1);
    font-size: 0.08rem;
    font-family: Arial;
    padding-right: 15px;
  }

  .status p {
    display: inline-flex;;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 0.12rem;
    line-height: 0.12rem;
    font-size: 0.08rem;
  }

  .status span {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 0.1rem;
    height: 0.1rem;
    margin: 0 0.15rem;
    background-color: rgba(37, 155, 36, 1);
    border-radius: 50%;
  }

  .header .status img {
    width: 0.12rem;
    height: 0.12rem;
    margin-left: 0.14rem;
    margin-right: 0.14rem;
    vertical-align: text-top;
  }

  .header .not-pay .mint-button-text {
    color: red;
  }

  .container-box {
    overflow: hidden;
    margin-top: 0.1rem;
  }

  .container-box .item {
    box-sizing: border-box;
    background-color: #ffffff;
    text-align: left;
    margin-bottom: 0.2rem;
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    overflow: hidden;
  }
  .item>div {
    float: left;
  }
  .item>div:first-child {
    line-height: 0.24rem;
    height: 0.24rem;
    margin-top: 0.08rem;
    margin-left: 0.1rem;
  }
  .item>div:last-child {
    line-height: 0.4rem;
    margin-left: 0.11rem;
    height: 0.4rem;
    margin-top: 0;
  }
  .item .iconfont {
    font-size: 0.24rem;
  }
  .item-box {
    overflow: hidden;
    height: 0.4rem;
    padding: 0.09rem 0.1rem;
    box-sizing: border-box;
  }

  .item-box img {
    width: 0.24rem;
    height: 0.24rem;
    float: left;
  }

  .item-box p {
    float: left;
    margin-left: 0.14rem;
    height: 0.23rem;
    line-height: 0.23rem;
    color: rgba(16, 16, 16, 1);
    font-size: 0.14rem;
  }

  .container-box .item1 {
    height: 1rem;
    padding: 0.11rem 0.1rem;
  }

  .not-pay, .not-pay a {
    color: #E51C23;
  }

  .not-pay .warn-logo {
    color: #ffffff;
    border-radius: 50%;
    display: inline-block;
    width: 0.14rem;
    height: 0.14rem;
    text-align: center;
    line-height: 0.14rem;
    background-color: rgba(255, 152, 0, 1);
  }

  .container-box .item1 .user-logo {
    width: 0.78rem;
    height: 0.78rem;
    float: left;
  }

  .user-information-box {
    float: left;
    margin-left: 0.12rem;
  }

  .user-information-box .username {
    height: 0.23rem;
    margin-top: 0.16rem;
    line-height: 0.23rem;
    color: rgba(16, 16, 16, 1);
    font-size: 0.16rem;
  }

  .user-information-box .user-id-box {
    width: 1.41rem;
    height: 0.23rem;
    line-height: 0.23rem;
    color: rgba(89, 87, 87, 1);
    font-size: 0.12rem;
  }

  .container-box .item3,.container-box .item4 {
    margin-bottom: 0;
    border-bottom: 1px solid #eeeeee;
  }
  .user-information-box .user-id-box .user-id {
    color: #3baaff;
  }

  .user-information > .container-box > .item6 {
    font-size: 0;
    height: 0.4rem;
    text-align: center;
  }

  .user-information > .container-box > .item6 span {
    font-size: 0.14rem;
    color: rgba(68, 126, 217, 1);
    font-family: Arial;
  }

  .item1 .qr-code {
    width: 0.3rem;
    height: 0.3rem;
    float: right;
    margin-top: 0.24rem;
    margin-right: 0.15rem;
  }

  .item2 {
    margin-top: 0.17rem;
    height: 0.4rem;
    box-sizing: border-box;
    line-height: 0.4rem;
  }

  .item2 img {
    margin-top: 0.08rem;
    width: 0.24rem;
    height: 0.24rem;
    float: left;
  }

  .item2 .internet-time-box {
    margin-top: 0.09rem;
    height: 0.23rem;
    line-height: 0.2rem;
    color: rgba(16, 16, 16, 1);
    font-size: 0.14rem;
    font-family: Arial;
    margin-left: 0.11rem;
    float: left;
  }

  .item2 .internet-time {
    color: rgba(0, 170, 255, 1);
  }

  .item2 .renew-fee {
    margin-top: 0.06rem;
    float: right;
    width: 0.4rem;
    height: 0.28rem;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 3px;
    background-color: rgba(0, 170, 255, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 0.12rem;
    font-family: Microsoft Yahei;
  }

  .user-information .bottom-box {
    margin-top: 0.60rem;
    background-color: rgba(239, 239, 239, 1);
  }

  hr {
    border-top: none;
    opacity: 1;
    color: #bbbbbb;
  }

</style>
