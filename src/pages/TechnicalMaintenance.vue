<template>
  <div class="technical-maintenance">
    <mt-header title="桔子公寓收费Wi-Fi" class="header">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container-box">
      <div class="item">
        <p>所在位置</p>
        <input type="text" class="location" placeholder="请输入房间号或门口号等信息"/>
      </div>
      <div class="item-box">
        <div class="item">
          <p>报修人</p>
          <input type="text" class="username" placeholder="请输入用户名"/>
        </div>
        <div class="underline-box1">
         <hr/>
        </div>
        <div class="item">
          <p>联系方式</p>
          <input type="text" class="telphone" placeholder="请输入联系电话"/>
        </div>
        <div class="item item-title">
          <p>请描述您的问题</p>
        </div>

      </div>
      <div class="item-problem-box">
          <textarea placeholder="为更好地服务您，请输入至少4个字的问题描述，您可以说：“X栋XX房间，连接无线提示无法加入网络。”
边框">
          </textarea>
      </div>
      <div class="fix-box">
        <button class="fix">马上报修</button>
      </div>

      <div class="telephone-box">
        <p>
          您也可直接拨打线下技术猿手机：
          <a href="tel:13804384438">138 0438 4438</a>
        </p>
      </div>
    </div>
    <CommonBottom></CommonBottom>
  </div>
</template>

<script>
  export default {
    name: "user-information",
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
  .header {
    height: 0.5rem;
    line-height: 0.5rem;
    width: 100%;
    overflow: hidden;
    background-color: rgba(37, 44, 53, 1);
  }
  .technical-maintenance {
    overflow: hidden;
    background-color: rgba(239, 239, 239, 1);
  }
  .header-box{
    height: 0.5rem;
    overflow: hidden;
  }
  .container-box .item {
    box-sizing: border-box;
    background-color: #ffffff;
    text-align: left;
    height: 0.5rem;
    padding: 0.1rem 0.08rem 0.1rem 0.16rem;
    margin-bottom: 0.2rem;
  }

  .item p {
    float: left;
    height: 0.3rem;
    line-height: 0.3rem;
    color: rgba(16, 16, 16, 1);
    font-size: 0.14rem;
    vertical-align: middle;
    font-family: Arial;
  }

  .item input {
    float: right;
    width: 2.26rem;
    height: 0.28rem;
    padding-left: 0.05rem;
    border: 1px solid rgba(187, 187, 187, 1);
    color: rgba(136, 136, 136, 1);
    font-size: 0.14rem;
    font-family: Microsoft Yahei;
  }

  .item .username {
    width: 0.92rem;
  }

  .item-box .item {
    margin-bottom: 0;
  }

  .underline-box {
    padding: 0 0.1rem;
  }

  .item-box .item-title {
    background-color: rgba(220, 221, 221, 1);
  }

  .item-box .item-title p {
    color: rgba(89, 87, 87, 1);
    font-size: 0.14rem;
    font-family: Arial;

  }

  .item-problem-box,.fix-box {
    font-size: 0;
  }
  .item-problem-box textarea {
    height: 1.62rem;
    box-sizing: border-box;
    width: 100%;
    padding: 0.05rem;
    resize: none;
    line-height: 0.2rem;
    color: rgba(136, 136, 136, 1);
    font-size: 0.14rem;
    font-family: Microsoft Yahei;
  }

  .fix {
    margin-top: 0.23rem;
    margin-bottom: 0.12rem;
    width: 95%;
    height: 0.4rem;
    border: 1px solid rgba(187, 187, 187, 1);
    border-radius: 4px;
    background-color: rgba(89, 87, 87, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 0.14rem;
    font-family: Microsoft Yahei;
  }

  .telephone-box p, .telephone-box p a {
    height: 0.23rem;
    line-height: 0.23rem;
    color: rgba(37, 155, 36, 1);
    font-size: 0.12rem;
    font-family: Arial;
  }
  .technical-maintenance .bottom-box {
    margin-top: 0.98rem;
  }
  .underline-box1 {
    border: none;
    box-sizing: border-box;
    background-color: #ffffff;
    height: 3px;
    width: 100%;
    padding: 0 18px;
  }
  .underline-box1 hr {
    margin: 0 auto;
    width: 100%;
    color: #eee;
    background-color: #eee;
    border-color: #eee;

  }
</style>
