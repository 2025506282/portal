<template>
  <div class="box">
    <mt-header title="状态反馈" class="header">
      <a  slot="left" @click="back">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="top">
      <div class="success" v-if="isSuccess">
        <img src="../assets/images/smile.png"/>
        <p>成功充值</p>
        <div class="nav">
          <router-link class="left-a" to="/user">个人中心</router-link>
          <a @click="sufferInternet" class="right-a">立即上网</a>
        </div>
      </div>
      <div class="fail" v-else>
        <img src="../assets/images/cry.png"/>
        <p>登陆失败</p>
        <div class="nav">
          <router-link class="left-a" to="/user/service">联系客服</router-link>
          <a @click="sufferInternet" class="right-a">再次登陆</a>
        </div>
      </div>
    </div>
    <div class="item-box">
      <p>订单信息</p>
      <div class="item">
        <div class="item-section1">
          <div class="item-section1-left">
            <h5>帮助：</h5>
            <p>1.将手机关机5分钟后重试一次；</p>
            <p>2.或许服务器业务繁忙，稍等后重试；</p>
            <p>3.若以上操作均无法成功，请联系客服；</p>
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
    watch: {},
    mounted: function () {
      let that = this;
    },
    data: function () {
      return {
        item: {},
        package: {},
        isSuccess: false,
      }
    },
    methods: {

      back: function () {
        history.go(-1);
      },
      /***
       * 点击我要上网，让用户知道可以上网
       */
      sufferInternet: function () {
        location.href = "http://www.baidu.com";
      },
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
    border-top: 1px solid #bbbbbb;
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
    text-align: left;
  }
  .item-box .item > div h5 {
    color: #666666;
    font-size: 0.11rem;
    margin-bottom: 0.1rem;
  }
  .item-box .item > div p {
    font-size: 0.09rem;
    line-height: 0.2rem;
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

  .loading-box {
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
  }

  .loading {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .loading span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
  }

  @-webkit-keyframes load {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }

  .loading span:nth-child(1) {
    left: 0;
    top: 50%;
    margin-top: -8px;
    -webkit-animation-delay: 0.13s;
  }

  .loading span:nth-child(2) {
    left: 14px;
    top: 14px;
    -webkit-animation-delay: 0.26s;
  }

  .loading span:nth-child(3) {
    left: 50%;
    top: 0;
    margin-left: -8px;
    -webkit-animation-delay: 0.39s;
  }

  .loading span:nth-child(4) {
    top: 14px;
    right: 14px;
    -webkit-animation-delay: 0.52s;
  }

  .loading span:nth-child(5) {
    right: 0;
    top: 50%;
    margin-top: -8px;
    -webkit-animation-delay: 0.65s;
  }

  .loading span:nth-child(6) {
    right: 14px;
    bottom: 14px;
    -webkit-animation-delay: 0.78s;
  }

  .loading span:nth-child(7) {
    bottom: 0;
    left: 50%;
    margin-left: -8px;
    -webkit-animation-delay: 0.91s;
  }

  .loading span:nth-child(8) {
    bottom: 14px;
    left: 14px;
    -webkit-animation-delay: 1.04s;
  }
</style>
