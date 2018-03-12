<template>
  <div class="box">
    <mt-header title="支付结果查询" class="header">
    </mt-header>
    <div class="section1">
      <mt-spinner type="fading-circle"  color="#00AAFF"></mt-spinner>
      <p>正在获取充值结果...</p>
      <p class="last-p"><span  class="primary-color">{{time}}</span>s</p>
    </div>
    <div class="bottom">©由如来云提供云计费服务</div>
  </div>
</template>

<script>
  import $ from 'jQuery'
  import {Indicator} from 'mint-ui';

  export default {
    name: "pay-success",
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'getData'
    },
    mounted: function () {
      let that = this;
      that.outTradeNo = that.$route.query.out_trade_no;
      var timer = setInterval(function(){
        if(that.time===1){
          clearInterval(timer);
          that.$router.push({
            path: '/pay-status',
            query: {
              "outTradeNo":that.outTradeNo
            }
          });
        } else {
          that.time--;
        }
      },1000)
    },
    data: function () {
      return {
        time: 3,
        mobile: '',
        mac: '',
        outTradeNo: '',
      }
    },
    methods: {

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

  .header {
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: rgba(37, 44, 53, 1);
  }

  .section1 {
    width: 100%;
    height: 1.8rem;
    background-color: #fff;
    text-align: center;
    overflow: hidden;
  }
  .primary-color {
    color: #447ED9;
  }
.last-p {
  margin-top: 0.2rem;
}
  .bottom {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 0.14rem;
  }
</style>
