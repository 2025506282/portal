<template>
  <div class="box">
    <mt-header title="风险提示" class="header">
      <router-link to="/user" slot="left" @click="history.go(-1)">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="item-box">
      <div class="img-box">
        <img src="../assets/images/risk.png"/>
        <p>啊哦！您的帐户可能存在风险</p>
      </div>
      <div class="main-box">
        <p>锁定将于 <span>08:01:52</span> 小时后解除</p>
      </div>
      <div class="item">
        <p class="item-top">为保证您的账户安全系统将暂时锁定您的账号</p>
        <p class="item-detail">系统检测到您的帐户在24小时内，在多个不</p>
        <p  class="item-detail"> 同终端上登录，建议修改密码。 </p>
      </div>
      <div class="nav">
        <router-link class="left-a" to="/user/service">联系客服</router-link>
        <router-link to="/pay" class="right-a">再次充值</router-link>
      </div>
      <div class="bottom-box">©由如来云提供云计费服务</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "risk",
    mounted: function () {

    },
    data() {
      return {
        time: '24'
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .box {
    position: relative;
    height: 100%;
    font-size: 0.14rem;
    background-color: #efefef;
    color: rgba(16, 16, 16, 1);
    font-family: "微软雅黑";

    box-sizing: border-box;
  }

  .header {
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: rgba(37, 44, 53, 1);
  }

  .img-box {
    margin-top: 0.5rem;
    box-sizing: border-box;
  }

  .img-box p {
    margin-top: 0.14rem;
  }
  .main-box {
    margin-top: 0.57rem;
  }
  .main-box span {
    font-size: 0.16rem;
    color: #fa9f1d;
    display: inline-block;
    padding-bottom: 0.05rem;
    text-decoration: underline;
  }
  .item-box {
    padding: 0 0.24rem;
    box-sizing: border-box;
  }
  .item {
    width: 100%;
    padding: 0.15rem 0.05rem;
    margin-top: 0.14rem;
    border: 1px dashed #000;
    color: #b5b5b6;
  }
  .item-top {
    line-height: 0.26rem;
    color: #888888;
  }
  .item-detail {
    line-height: 0.18rem;
  }
  .nav {
    margin-top: 1.91rem;
    font-size: 0.12rem;
  }
  .nav .left-a {
    display: inline-block;
    padding-right: 0.18rem;
    border-right: 1px solid #bbb;
    text-decoration: none;
    color: #000;
  }
  .right-a {
    padding-left: 0.18rem;
    color: #42b7ff;
    text-decoration: none;
  }
  .bottom-box {
    margin-top: 0.32rem;
    font-size: 0.12rem;
    padding-bottom: 0.14rem;
  }
</style>
