<template>
  <div class="box">
    <mt-header title="支付详情" class="header">
    </mt-header>
    <div class="top">
      <div class="success" v-if="isSuccess">
        <img src="../assets/images/smile.png"/>
        <p>成功充值</p>
        <div class="nav">
          <a class="left-a" @click="toUser">个人中心</a>
          <a @click="sufferInternet" class="right-a">立即上网</a>
        </div>
      </div>
      <div class="fail" v-else>
        <img src="../assets/images/cry.png"/>
        <p>充值失败</p>
        <div class="nav">
          <a class="left-a" @click="toUserService">联系客服</a>
          <a @click="toPay" class="right-a">再次充值</a>
        </div>
      </div>
    </div>
    <div class="item-box">
      <p>订单信息</p>
      <div class="item">
        <div class="item-section1">
          <div class="item-section1-left">
            <!--<img :src="item.pay_mode=='0'||item.package_info.package_companyType=='1'||item.package_companyType=='2'?liuliangLogoUrl:timeLogoUrl" class="pay-image"/>-->
            <i
              :class="package.package_companyType=='0'||package.package_companyType=='1'||package.package_companyType=='2'?'icon-chongliuliang':'icon-shijian'"
              class="iconfont"></i>
            <p class="pay-description">{{package.package_name}}</p>
            <span class="light-color">{{item.order_no}}</span>
          </div>
        </div>
        <div class="item-section2">
          <span>购买类型 : </span>
          <span class="light-color">续费 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   </span>
          <span> 流量套餐数量  </span>
          <span class="light-color">{{item.pay_num}}</span>
        </div>
        <div class="item-section3">
          <div class="item-section1-left">
            <span class="pay-time">{{item.order_addTime}}</span>
          </div>
          <div class="item-section1-right">
            <span class="continue-color">合计:￥</span>
            <span class="danger-color">{{item.pay_total_price}}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import $ from 'jQuery'
  import {Indicator} from 'mint-ui';

  export default {
    name: "pay-success",
    beforeCreate: function () {
      // this.$root.reload();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'getData'
    },
    created: function () {
      this.getData();
    },
    data: function () {
      return {
        item: {},
        package: {},
        userInfo: {},
        isSuccess: true,
        mobile: '',
        mac: ''
      }
    },
    methods: {
      getData: function () {
        let that = this;
        let id = this.$route.query.outTradeNo;
        $.ajax({
          url: that.CommonConst.BASE_URL + 'demo/pays/result',
          type: 'get',
          data: {
            "order_no": id
          },
          success: function (response) {
            that.item = response.data;
            that.package = response.data.package_info;
            that.userInfo = response.data.user_info;
            that.mobile =  that.userInfo.mobile;
            that.mac =  that.userInfo.mac;
            that.isSuccess = response.data.pay_state == 1 ? true : false;
            that.$cookies.set('mobile', that.userInfo.mobile);
            that.$cookies.set('mac', that.userInfo.mac);
          },
          error: function (response) {
            that.isSuccess = false;
          }
        })
      },
      /***
       * 点击我要上网，让用户知道可以上网
       */
      sufferInternet: function () {
        location.href = 'http://1.0.0.0/logout';
      },
      toUser: function () {
        this.$router.push({
          path: '/user',
          query: {
            "mobile": this.mobile,
            "mac": this.mac
          }
        });
      },
      toUserService: function () {
        this.$router.push({
          path: '/service',
          query: {
            "mobile": this.mobile,
            "mac": this.mac
          }
        });
      },
      toPay: function () {
        this.$router.push({
          path: '/pay',
          query: {
            "mobile": this.mobile,
            "mac": this.mac
          }
        });
      }
    }
  }
</script>

<style scoped>
  @import "../assets/icon/iconfont.css";

  .box {
    font-size: 0.14rem;
    height: 100%;
    background-color: #f5f5f5;
  }

  .item-box > p {
    text-align: left;
    line-height: 0.43rem;
  }

  .header {
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: rgba(37, 44, 53, 1);
  }

  .top {
    padding-top: 0.3rem;
    padding-bottom: 0.2rem;
    text-align: center;
    background-color: #fff;
  }

  .top p {
    font-size: 0.16rem;
  }

  .nav {
    margin-top: 0.2rem;
    font-size: 0.12rem;
  }

  .nav .left-a {
    display: inline-block;
    padding-right: 0.18rem;
    border-right: 1px solid #000;
    text-decoration: none;
    color: #000;
  }

  .right-a {
    padding-left: 0.18rem;
    color: #42b7ff;
    text-decoration: none;
  }

  .item-box {
    margin-top: 0.26rem;
    padding: 0 0.15rem;
  }

  .item-box .underline-box3 {
    box-sizing: border-box;
    width: 100%;
    padding: 0 0.18rem;
  }

  .item-box .item {
    padding: 0.1rem;
    width: 100%;
    box-sizing: border-box;
    border: 1px dashed #bbbbbb;

  }

  .item-box .item > div {
    height: 0.26rem;
    line-height: 0.26rem;
  }

  .item-section1 {
    overflow: hidden;
  }

  .item-section1-left {
    float: left;
  }

  .item-section1-left img {
    width: 0.24rem;
    height: 0.24rem;
    vertical-align: middle;
  }

  .item-section1-left p {
    display: inline-block;
    vertical-align: middle;
  }

  .item-section1-right {
    float: right;
    font-size: 0.12rem;
    color: rgba(255, 152, 0, 1);
  }

  .item-section2 {
    text-align: left;
    font-size: 0.12rem;
  }

  .item-section3 {
    width: 100%;
    font-size: 0.12rem;
    overflow: hidden;
  }

  .pay-content {
    background-color: #ffffff;
    margin-top: 1.6rem;
    font-size: 0.14rem;
  }

  .pay-content > div {
    padding: 0 0.2rem;
  }

  .pay-description {
    margin-right: 0.08rem;
  }

  .pay-content .pay-title-box {
    border-bottom: 1px solid #bbbbbb;
  }

  .pay-content .pay-title-box > div {
    width: 100%;
    height: 0.44rem;
    line-height: 0.44rem;
    text-align: left;
  }


</style>
