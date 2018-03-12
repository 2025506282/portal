<template>
  <div class="box">
    <mt-header title="充值记录" class="header">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="item-box">
      <scroller
        :on-refresh="refresh"
        noDataText="nonno"
        class="scroll-bar"
        ref="myscroller"
      >
        <!--:on-infinite="infinite" -->

        <div class="item" v-for="(item,index) in list">
          <div class="item-section1">
            <div class="item-section1-left">
              <img :src="item.pay_mode=='0'?weixinIcon:aliIcon" class="pay-image"/>
              <p class="pay-description">{{item.pay_mode=='0'?'微信支付':'支付宝支付'}}</p>
              <span class="light-color">{{item.order_no}}</span>
            </div>
            <div class="item-section1-right">-￥{{item.pay_total_price}}</div>
          </div>
          <div class="item-section2">
            <span class="light-color">购买</span>
            <span>{{item.package_name}}</span>
            <span class="light-color">{{item.pay_num}}（{{item.package_companyType}}）</span>
          </div>
          <div class="item-section3">
            <div class="item-section1-left">
              <!--<span class="pay-time">{{item.pay_dateTime}}</span>-->
              <span class="pay-status">{{item.order_addTime}}</span>
              <span class="pay-status">{{item.pay_state=='0'?'未支付':'已支付'}}</span>

            </div>
            <div class="item-section1-right" @click="continuePay(index)">
              <span class="continue-color">{{item.pay_state=='0'?'继续支付':''}}</span>
            </div>
          </div>
          <div class="underline-box3">
            <hr/>
          </div>
        </div>
        <!--<div class="bottom-box">-->
        <!--©由如来云提供云计费服务-->
        <!--</div>-->
      </scroller>
      <div v-show="list.length===0" class="empty-box">
        <p>这里啥也没有</p>
      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue';
  import VueScroller from 'vue-scroller';
  Vue.use(VueScroller);
  import {Toast} from 'mint-ui';
  import $ from 'jQuery';

  export default {
    name: "package",
    beforeMount: function () {
      let that = this;
      if(this.$route.query.mobile){
        this.mobile = this.$route.query.mobile;
        this.mac = this.$route.query.mac;
      } else {
        this.mac = that.$cookies.get('mac');
        this.mobile = that.$cookies.get('mobile');
      }
      $.get(this.CommonConst.BASE_URL + "demo/user/userOrderlist", {
        "mobile": that.mobile,
        "pageSize": that.pageSize,
        "page": that.page
      }, function (response) {
        that.lastPage = response.data.last_page;
        that.list = response.data.data;
      })
    },
    methods: {
      // infinite: function(){
      //   alert(1)
      // },
      /**
       * 上拉刷新
       */
      refresh: function () {
        var that = this;
        that.page++;
        if (this.page <= this.lastPage) {
          $.get(that.CommonConst.BASE_URL + "demo/user/userOrderlist", {
            "mobile": that.mobile,
            "pageSize": that.pageSize,
            "page": that.page
          }, function (response) {
            let arr = response.data.data;
            for(let index = 0; index < that.list.length; index++) {
              arr.push(that.list[index]);
            }
            that.list = arr;
            // that.$refs.myscroller.finishPullToRefresh();
            // for (let index = 0; index < response.data.data.length; index++) {
            //   that.list.push(response.data.data[index])
            // }
          })
        } else {
          that.$refs.myscroller.finishPullToRefresh();
          // this.$refs.myscroller.finishInfinite();
          Toast('没有更多了')
        }

      },
      /**
       * 点击继续支付
       */
      continuePay: function(index){
        let that = this;
        this.$router.push({
          path: '/pay',
          query: {
            "packageId": that.list[index].id,
            "packageNum": that.list[index].pay_num,
            "mobile": that.mobile,
            "mac": that.mac
          }
        });
      }
    },
    data() {
      return {
        number: "1",
        list: [],
        page: 1,
        mobile: '',
        mac: '',
        lastPage: 1,
        pageSize: 5,
        weixinIcon: '../../static/images/weixin_icon.png',
        aliIcon: '../../static/images/ali_icon.png',
      }
    }
  }
</script>

<style scoped>
  .box {
    position: relative;
    height: 100%;
    font-size: 0.14rem;
    background-color: rgba(239, 239, 239, 1);
    color: rgba(16, 16, 16, 1);
    font-family: Arial;
  }

  .scroll-bar {
    margin-top: 0.8rem;
    padding: 0 0.25rem 0 0.18rem;
    box-sizing: border-box;
    overflow: hidden;
    background-color: rgba(239, 239, 239, 1);
  }

  .empty-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .bottom-box {
    width: 100%;
    margin-top: 1rem;
    line-height: 0.23rem;
    margin-bottom: 0.14rem;
    text-align: center;
    font-size: 0.1rem;
  }

  .header {
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: rgba(37, 44, 53, 1);
  }

  .item-box {
    margin-top: 0.1rem;
    border-top: 1px solid #bbbbbb;

  }

  .item-box .underline-box3 {
    margin-top: 0.05rem;
    box-sizing: border-box;
    width: 100%;
  }

  .underline-box3 hr {
    width: 100%;
    border-bottom: none;
    opacity: 0.5;
    color: #bbbbbb;
  }

  .item-box .item {
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    height: 0.99rem;
    width: 100%;
    box-sizing: border-box;
  }

  .item-box .item > div {
    height: 0.33rem;
    line-height: 0.3rem;
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
    margin-left: 0.07rem;
  }

  .item-section1-right {
    float: right;
    font-size: 0.12rem;
    color: rgba(255, 152, 0, 1);
  }
  .pay-description {
    margin-right: 0.08rem;
  }
  .item-section2 {
    text-align: left;
    font-size: 0.12rem;
  }

  .item-section3 {
    font-size: 0.12rem;
  }

  .continue-color {
    color: #259B24;

  }
</style>
