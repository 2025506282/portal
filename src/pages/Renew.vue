<template>
  <div class="box">
    <mt-header title="资费套餐" class="header">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="item-box">
      <div v-if="list.length>0" class="item" v-for="(item,index) in list">
        <div class="item-header">
          <i :class="item.package_companyType!='3'?timeLogoClass:liuliangLogoClass"></i>
          <span><b>{{item.package_companyType!='3'?'时长套餐':'流量套餐'}}</b></span>
        </div>
        <hr class="renew-hr"/>
        <div class="item-body">
          <div class="item-section">
            <!--<img-->
              <!--:src="item.package_companyType=='0'||item.package_companyType=='1'||item.package_companyType=='2'?liuliangUrl:timeUrl"/>-->
            <i :class="item.package_companyType!='3'?timeLogoClass:liuliangLogoClass"></i>
            <div class="item-section-content">
              <div class="item-section-top">
                <p class="limit-time">限时购</p>
                <p class="description">&nbsp;&nbsp;<b>{{item.package_name}}</b><span>{{item.package_companyType=='0'||item.package_companyType!='3'?'（不限流量套餐）':'（不限上网速率）'}}</span></p>
              </div>
              <div class="item-section-bottom">
                <p class="price">￥{{item.contract_isEnabled===1?item.contract_price:item.package_price}}</p>
                <div class="number-box">
                  <span @click="decline(index)">-</span>
                  <input type="number" class="number" v-model="numberArrS[index]"/>
                  <span @click="add(index)">+</span>
                </div>
              </div>
            </div>
          </div>
          <div class="item-section-footer">
            <div>{{item.contract_isEnabled==='1'?item.contract_introduce:item.package_introduce}}</div>
          </div>
          <div class="logo-box" @click="changeCheck(index)">
            <span :class="checkedArr[index]?'checked':'no-check'"></span>
            <!--<img src="../../static/images/no_item_check.png"/>-->
          </div>
        </div>
        <hr class="renew-hr"/>
        <div class="item-footer">
          <span>使用范围</span>
          <span class="float-right">{{item.place_name}}</span>
        </div>
      </div>
      <div v-else>
        不好意思目前还没有套餐
      </div>
    </div>
    <footer class="settlement">
      <div class="settlement-left">
        <label>总计费用</label>
        <span class="price">￥{{totalPrice}}</span>
      </div>
      <div class="settlement-right">
        <button @click="settlement">结算</button>
      </div>
    </footer>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import $ from 'jQuery';

  export default {
    name: "package",

    mounted: function () {
      let that = this;
      if(this.$route.query.mobile){
        this.mobile = this.$route.query.mobile;
        this.mac = this.$route.query.mac;
      } else {
        this.mac = that.$cookies.get('mac');
        this.mobile = that.$cookies.get('mobile');
      }
      this.userId = this.$route.query.userId;
      $.get(that.CommonConst.BASE_URL + 'demo/package/packagelist', {
        "mac": that.mac
      }, function (response) {
        if (response.error === '2002') {
          Toast(response.message);
        }
        that.list = response.data;
        if (that.list) {
          for (let index = 0; index < that.list.length; index++) {
            that.checkedArr.push(false);
            that.numberArr.push(1);
          }
        }
      });
    },
    data() {
      return {
        list: [],
        index: -1,
        timeLogoClass: 'iconfont icon-shijian',
        liuliangLogoClass: 'iconfont icon-chongliuliang',
        timeClass: 'iconfont icon-shijian',
        liuliangClass: 'iconfont icon-chongliuliang',
        timeLogoUrl: '../../static/images/item1_logo.png',
        liuliangUrl: '../../static/images/item2.png',
        liuliangLogoUrl: '../../static/images/item2_logo.png',
        checkedArr: [],
        numberArr: [],
        userId: '',
        mobile: '',
        mac: '',
      }
    },
    computed: {
      //计算订单总价
      totalPrice: function () {
        let index = -1;
        for (let i = 0; i < this.checkedArr.length; i++) {
          if (this.checkedArr[i]) {
            index = i;
          }
        }
        if (index !== -1) {
          let price = this.list[index].contract_isEnabled === 1 ? this.list[index].contract_price : this.list[index].package_price;
          let number = this.numberArr[index];
          return price * number;
        } else {
          return 0;
        }
      },
      //初始化订单，给每个项目初始化为1
      numberArrS: function () {
        let arr = [];
        for (let index = 0; index < this.numberArr.length; index++) {
          arr.push(parseInt(this.numberArr[index]))
        }
        return arr;
      }
    },
    methods: {
      //每点击一次+，添加相应数字
      add: function (index) {
        this.$set(this.numberArr, index, ++this.numberArr[index]);
      },
      //每点击一次-，减少相应数字
      decline: function (index) {
        if (this.numberArr[index] > 1) {
          this.$set(this.numberArr, index, --this.numberArr[index]);
        }
      },
      //点击结算时，将所获取到的套餐，及相关信息返回个后台
      settlement: function () {
        if (this.index === -1) {
          Toast('请选择套餐');
        } else {
          var that  = this;
          let payPrice = this.list[this.index].contract_isEnabled === 1 ? this.list[this.index].contract_price : this.list[this.index].package_price;
          this.list[this.index]['user_id'] = this.userId;
          this.list[this.index]['package_id'] = this.list[this.index].id;
          this.list[this.index]['device_id'] = this.list[this.index].device_id;
          this.list[this.index]['package_type'] = this.list[this.index].package_companyType=='0'|| this.list[this.index].package_companyType=='1'|| this.list[this.index].package_companyType=='2'?'0':'1';
          this.list[this.index]['total_price'] = this.totalPrice;
          this.list[this.index]['pay_num'] = this.numberArrS[this.index];
          this.list[this.index]['pay_price'] = payPrice;
          this.list[this.index]['pay_time'] = this.Utils.transDate(new Date());
          this.$router.push({
            path: '/pay',
            query: {
              "packageId": this.list[this.index].id,
              "packageNum": that.numberArr[this.index],
              "userId": this.list[this.index]['user_id'],
              "placeId": this.list[this.index]['place_id'],
              "deviceId": this.list[this.index]['device_id'],
              "mobile": that.mobile,
              "mac": that.mac
            }
          });
        }
      },
      changeCheck: function (index) {
        for (let i = 0; i < this.checkedArr.length; i++) {
          this.checkedArr[i] = false;
        }
        this.index = index;
        this.$set(this.checkedArr, index, true);
      }
    }
  }
</script>
<style scoped>
  @import "../assets/icon/iconfont.css";
  .box {
    font-size: 0.14rem;
    height: 100%;
    background-color: rgba(239, 239, 239, 1);
    color: rgba(16, 16, 16, 1);
    font-family: Arial;
  }

  .float-right {
    float: right;
  }

  .header {
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: rgba(37, 44, 53, 1);
  }

  .item-header, .item-footer {
    line-height: 0.4rem;
    text-align: left;
    padding: 0 0.1rem;
    font-size: 0.14rem;
  }

  .item-footer {
    padding: 0 0.16rem 0 0.27rem;

  }

  .item-header>i {
    font-size: 0.16rem;
    vertical-align: middle;
    margin-right: 0.06rem;
  }

  .renew-hr {
    width: 100%;
    margin: 0;
    padding: 0;
    border-top: 0;
    color: #bbbbbb;
  }

  .item-header b {
    vertical-align: middle;
  }

  .item-box {
    background-color: rgba(239, 239, 239, 1);
    padding-bottom: 0.5rem;
  }

  .item-box .item {
    margin-bottom: 0.19rem;
    background-color: #ffffff;
  }

  .item-body {
    position: relative;
    line-height: 1.5rem;
    font-size: 0.14rem;
  }

  .item-body .logo-box {
    position: absolute;
    top: 50%;
    left: 0.14rem;
    transform: translateY(-50%);
  }

  .checked {
    background: url("../../static/images/item_check.png") center;
    background-size: 0.22rem 0.22rem;
  }

  .no-check {
    background: url("../../static/images/no_item_check.png") center;
    background-size: 0.22rem 0.22rem;
  }

  .item-body .logo-box span {
    display: inline-block;
    width: 0.22rem;
    height: 0.22rem;
    border-radius: 50%;
  }

  .item-section {
    height: 1.06rem;
    text-align: left;
  }

  .item-section img {
    width: 0.65rem;
    height: 0.65rem;
    margin-left: 0.46rem;
  }
  .item-section>i{
    font-size: 0.65rem;
    margin-left: 0.46rem;
  }

  .item-section-footer {
    width: 100%;

    box-sizing: border-box;
    margin: 0.12rem 0;
    padding: 0 0.15rem 0 0.27rem;
  }

  .item-section-footer > div {
    width: 100%;
    height: 0.31rem;
    line-height: 0.31rem;
    border-radius: 4px;
    background-color: rgba(244, 248, 251, 1);
    color: rgba(117, 118, 122, 1);
    font-size: 0.12rem;
    text-align: center;
  }

  .item-section-top, .item-section-bottom {
    width: 2.28rem;
  }

  .item-section-top p, .item-section-bottom p, .item-section-bottom div {
    float: left;
  }

  .item-section-top .limit-time {
    border: 1px solid #E51C23;
    padding: 0 0.03rem;
    line-height: 0.2rem;
    height: 0.2rem;
    margin-top: 0.165rem;
    font-size: 0.12rem;
    box-sizing: border-box;
  }

  .item-section-top .description {

  }

  .price {
    color: #E51C23;
    font-size: 0.16rem;
  }

  .item-section-bottom .number-box {
    width: 0.96rem;
    height: 0.24rem;
    overflow: hidden;
    line-height: 0.24rem;
    margin-top: 0.135rem;
    margin-left: 0.46rem;
    border-radius: 3px;
    border: 1px solid #bbbbbb;
  }

  .number-box span {
    display: inline-block;
    margin: 0;
    padding: 0;
    width: 0.25rem;
    height: 0.24rem;
    text-align: center;
  }

  .number-box .number {
    margin: 0;
    padding: 0;
    width: 0.36rem;
    height: 0.24rem;
    vertical-align: middle;
    box-sizing: border-box;
    text-align: center;
    border: none;
    font-size: 0.14rem;
    outline: none;
  }

  .item-section-content {
    float: right;
  }

  .item-section-content > div {
    height: 0.53rem;
    line-height: 0.53rem;
  }

  .settlement {
    width: 100%;
    text-align: left;
    line-height: 0.5rem;
    position: fixed;
    background-color: #ffffff;
    bottom: 0;
  }

  .settlement .settlement-left {
    float: left;
    margin-left: 0.16rem;
  }

  .settlement .settlement-right {
    float: right;

  }

  .settlement button {
    width: 1.15rem;
    height: 0.5rem;
    box-sizing: border-box;
    border: none;
    color: #ffffff;
    background-color: rgba(252, 45, 72, 1);
    font-size: 0.16rem;
  }
</style>
