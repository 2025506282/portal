<template>
  <div class="box">
    <mt-header title="选择支付" class="header">
      <a @click="back" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="header-title">
      <div>订单信息</div>
    </div>
    <div class="item-box">
      <div class="item">
        <div class="item-section1">
          <div class="item-section1-left">
            <i :class="item.package_companyType=='0'||item.package_companyType=='1'||item.package_companyType=='2'?liuliangLogoClass:timeLogoClass" class="pay-image"></i>
            <span class="pay-description">{{item.package_name}}</span>
          </div>
        </div>
        <div class="item-section2">
          <span>购买类型 : </span>
          <span class="light-color">续费 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   </span>
          <span> 流量套餐数量  </span>
          <span class="light-color">{{item.package_num}}</span>
        </div>
        <div class="item-section3">
          <div class="item-section1-left">
            <span class="pay-time">{{item.order_time}}</span>
          </div>
          <div class="item-section1-right">
            <span class="continue-color">合计:￥</span>
            <span class="danger-color">{{item.package_total_price}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pay-box">
      <div class="pay-content">
        <div class="pay-title-box">
          <div>
            请选择支付方式
          </div>
        </div>
        <div class="pay-method-box" v-for="(item,index) in list" :class="item.className">
          <div>
            <div class="pay-method-left">
              <div class="pay-logo">
                <!--<img :src="item.src"/>-->
                <i :class="item.logoClass"></i>
              </div>
              <div class="pay-title">
                {{item.payName}}
              </div>
            </div>
            <div class="pay-method-right" @click="changeActive(index)">
              <div :class="item.checkClass"></div>
            </div>
          </div>
        </div>

      </div>
      <div class="pay-argument">
        点击充值，即代表阅读并同意<router-link to="/agreement" class="bad-color">充值协议</router-link>
      </div>
      <div>
        <button @click="pay">点击支付</button>
      </div>
    </div>
    <div class="loading-box" v-show="isLoading">
      <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>

</template>

<script>
  import {Toast} from 'mint-ui';
  import $ from 'jQuery';
  export default {
    name: "package",
    mounted: function () {
        if(this.$route.query.packageId){
          this.packageId = this.$route.query.packageId;
          this.packageNum = this.$route.query.packageNum;
          this.placeId = this.$route.query.placeId;
          this.userId = this.$route.query.userId;
          this.deviceId = this.$route.query.deviceId;
          this.mobile = this.$route.query.mobile;
          this.mac = this.$route.query.mac;

          var that =this;
          $.ajax({
            type: 'post',
            url: this.CommonConst.BASE_URL + 'demo/Package/packageInfo',
            data: {
              "id": that.packageId,
              "package_num": that.packageNum,
            },
            success: function (response) {
              that.item = response.data;
              that.form['user_id'] = that.userId;
              that.form['place_id'] = that.placeId;
              that.form['package_id'] = that.item.id;
              that.form['pay_price'] = that.item.package_price;
              that.form['pay_num'] = that.item.package_num;
              that.form['total_price'] = that.item.package_total_price;
              that.form['package_name'] = that.item.package_name;
            },
            error: function () {
              Toast('请求出错');
            }
          })
        } else {
          // this.$router.push({
          //   path: '/user',
          //   query: {
          //     "mobile": this.mobile,
          //     "mac": this.mac
          //   }
          // });
        }
    },
    data() {
      return {
        packageId: '',
        placeId: '',
        packageNum: '',
        deviceId: '',
        form: {},
        timeLogoClass: 'iconfont icon-shijian',
        liuliangLogoClass: 'iconfont icon-chongliuliang',
        number: "1",
        payIndex: 0,
        item: {},

        isLoading: false,
        list: [
          {
            src: '../../static/images/weixin.png',
            logoClass: 'iconfont icon-wechat weixin-logo',
            payName: '微信',
            className: 'weixin',
            checkClass: 'item-check'
          },
          {
            src: '../../static/images/ali.png',
            logoClass: 'iconfont icon-zhifubao ali-logo ',
            payName: '支付宝',
            className: 'ali',
            checkClass: 'no-item-check'
          },
          {
            src: '../../static/images/yinlian.png',
            logoClass: 'iconfont icon-yinxingqia-copy yin-lian-logo',
            payName: '银行卡/信用卡',
            className: 'yinlian',
            checkClass: 'no-item-check'
          }
        ]
      }
    },
    methods: {
      /***
       * 动态改变当前选中付款方式，首先恢复默认没有选择样式，然后给选择index赋予已经选择样式
       * @param index
       */
      changeActive: function (index) {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].checkClass = 'no-item-check';
        }
        this.list[index].checkClass = 'item-check';
        this.payIndex = index;
      },
      //付款
      pay: function () {
        this.form.device_id = this.deviceId;
        this.form.pay_type = '0';
        var that = this;
        //调用微信支付
        if (this.payIndex === 0) {
          // var fp = new Fingerprint2();
          that.isLoading = true;
          // this.item.pay_state = '0';
          this.form.pay_mode = '0';
          $.ajax({
            type: 'post',
            url: that.CommonConst.BASE_URL + "demo/pays/wappay",
            data: that.form,
            success: function(response){
              if(response.error === 0){
                that.isLoading = false;
                location.href = response.data.url;
              }
            },
            error: function(error){
              console.log(error);
              that.isLoading = false;
              Toast('请求支付接口出现错误，请稍后再试');
            }
          })
        }
        // 调用支付宝付款
        if (this.payIndex === 1) {
          this.form.pay_mode = '1';
          $.ajax({
            type: 'post',
            url: that.CommonConst.BASE_URL + "demo/pays/alipayWap",
            data: that.form,
            success: function(response){
              if(response.error === 0){
                that.isLoading = false;
                location.href = response.data.url;
              }
            },
            error: function(error){
              that.isLoading = false;
              Toast('请求支付接口出现错误，请稍后再试');
            }
          })
        }
      },
      back: function(){
        history.go(-1);
      }
    }
  }
</script>

<style scoped>
  @import "../assets/icon/iconfont.css";
  .loading-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    background-color: #000;
  }
  .weixin-logo {
    color: #00d50d;
  }
  .ali-logo {
    color: #3c98e3;
  }
  .yin-lian-logo {
    color: #0166b7;
  }
  .item-check {
    background-image: url("../../static/images/item_check.png");
  }

  .no-item-check {
    background-image: url("../../static/images/no_item_check.png");
  }

  .box {
    position: relative;
    height: 100%;
    font-size: 0.14rem;
    background-color: #efefef;
    color: rgba(16, 16, 16, 1);
    font-family: 微软雅黑;
  }

  .header {
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: rgba(37, 44, 53, 1);
  }

  .header-title {
    padding: 0 0.15rem;
  }

  .header-title > div {
    height: 0.35rem;
    line-height: 0.35rem;
    text-align: left;
    margin-left: 0.06rem;
    font-size: 0.14rem;
  }

  .item-box {
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

    border: 1px solid #bbbbbb;
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

  .item-section1 .item-section1-left {
   line-height: 0.27rem;
    height: 0.27rem;
    width: 100%;
    text-align: left;
    overflow: hidden;
  }
  .item-section1 .item-section1-left .iconfont {
    font-size: 0.18rem;
  }
  .item-section1 .item-section1-left span {
    vertical-align: 0.01rem;

    font-size: 0.16rem;
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

  .pay-content .pay-title-box {
    border-bottom: 1px solid #bbbbbb;
  }

  .pay-content .pay-title-box > div {
    width: 100%;
    height: 0.44rem;
    line-height: 0.44rem;
    text-align: left;

  }

  .pay-box {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #ffffff;
  }

  .pay-box p {

  }

  .pay-box > div {
    font-size: 0.12rem;
    margin-top: 0.07rem;
    width: 100%;
    box-sizing: border-box;
  }

  .weixin > div, .ali > div, .yinlian > div {
    overflow: hidden;
    border-bottom: 1px solid #efefef;
  }

  .pay-box button {
    border: none;
    width: 100%;
    line-height: 0.5rem;
    border-radius: 4px;
    background-color: rgba(230, 78, 30, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 0.16rem;
    font-family: Microsoft Yahei;
  }

  .pay-method-box {
    width: 100%;
    height: 0.6rem;
    box-sizing: border-box;

  }

  .pay-method-left {
    float: left;
    line-height: 0.6rem;
  }

  .pay-method-left > div {
    height: 0.6rem;
    float: left;
  }

  .pay-logo img {
    width: 0.45rem;
    height: 0.45rem;
    margin-top: 0.085rem;
  }
  .pay-logo>i {
    font-size: 0.45rem;
    margin-top: 0.085rem;
  }

  .pay-title {
    margin-left: 0.18rem;
    text-align: left;
    width: 0.9rem;
    height: 0.6rem;
    line-height: 0.6rem;
  }

  .pay-other {
    width: 0.8rem;
  }

  .pay-other img {
    width: 0.8rem;
    height: 0.4rem;
    margin-top: 0.1rem;
  }

  .pay-method-right {
    float: right;
    line-height: 0.6rem;
  }

  .pay-method-right > div {
    margin-top: 0.195rem;
    width: 0.21rem;
    height: 0.21rem;
    /*border: 1px solid #bbbbbb;*/
    /*border-radius: 50%;*/
    background-size: 0.21rem 0.21rem;
  }

  .pay-argument {
    height: 0.3rem;
    line-height: 0.3rem;
    margin-top: 0.2rem;
  }

  .bad-color {
    color: #FF9800;
  }

  .continue-color {
    color: #f03017;
    font-size: 0.12rem;
  }

  .danger-color {
    color: #f03017;
    font-size: 0.24rem;
  }
  .loading-box {
    width: 100%;
    height: 100%;
  }

  .loading{
    width: 100px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .loading span{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    -webkit-animation: load 1.04s ease infinite;
  }
  @-webkit-keyframes load{
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0.2;
    }
  }
  .loading span:nth-child(1){
    left: 0;
    top: 50%;
    margin-top:-8px;
    -webkit-animation-delay:0.13s;
  }
  .loading span:nth-child(2){
    left: 14px;
    top: 14px;
    -webkit-animation-delay:0.26s;
  }
  .loading span:nth-child(3){
    left: 50%;
    top: 0;
    margin-left: -8px;
    -webkit-animation-delay:0.39s;
  }
  .loading span:nth-child(4){
    top: 14px;
    right:14px;
    -webkit-animation-delay:0.52s;
  }
  .loading span:nth-child(5){
    right: 0;
    top: 50%;
    margin-top:-8px;
    -webkit-animation-delay:0.65s;
  }
  .loading span:nth-child(6){
    right: 14px;
    bottom:14px;
    -webkit-animation-delay:0.78s;
  }
  .loading span:nth-child(7){
    bottom: 0;
    left: 50%;
    margin-left: -8px;
    -webkit-animation-delay:0.91s;
  }
  .loading span:nth-child(8){
    bottom: 14px;
    left: 14px;
    -webkit-animation-delay:1.04s;
  }
</style>
