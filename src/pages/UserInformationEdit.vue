<template>
  <div class="user-information" v-bind:class="isShowSex?backgroundColor.gray:null">
    <mt-header title="个人信息修改" class="header">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="container-box">
      <div class="item-box">
        <div class="item item1">
          <div>
            <span>头像</span>
            <img v-bind:src="user.headImage" class="user-logo"/>
            <div class="file-box">
              <input type="file" @change.stop="changePhoto"/>
            </div>
          </div>
        </div>
        <div class="underline-box2">
          <hr/>
        </div>
        <div class="item item2">
          <div class="item-left">
            <span>昵称</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="user.username" id="username" class="input-txt" maxlength="10"/>
          </div>
        </div>
        <div class="underline-box2">
          <hr/>
        </div>
        <div class="item item2" v-on:click="isShowSex=!isShowSex">
          <div class="item-left">
            <span>性别</span>
          </div>
          <div class="item-right">
            <span>{{sex}}</span>
          </div>
        </div>
        <div class="underline-box2">
          <hr/>
        </div>
        <div class="item item2" v-on:click="isShowDistrict=!isShowDistrict">
          <div class="item-left">
            <span>地区</span>
          </div>
          <div class="item-right">
            <span>{{province}}</span>
            <span>{{city}}</span>
          </div>
        </div>
        <div class="underline-box2">
          <hr/>
        </div>
      </div>
      <div class="item-box">
        <div class="item item2" v-on:click="openDatePicker">
          <div class="item-left">
            <span>生日</span>
          </div>
          <div class="item-right">
            <span>{{transDate}}</span>
          </div>
        </div>
        <div class="underline-box2">
          <hr/>
        </div>
        <div class="item item2">
          <div class="item-left">
            <span>专业</span>
          </div>
          <div class="item-right">
            <input type="text" v-model="user.major" class="input-txt" maxlength="12"/>
          </div>
        </div>
      </div>
      <div class="item-box">
        <div class="item item2">
          <div class="item-left">
            <span>个人签名</span>
          </div>
          <div class="item-right">
            <input type="text" maxlength="15" class="input-txt" v-model="user.personality"/>
          </div>
        </div>
      </div>
      <div class="item-box">
        <div class="item item2" v-on:click="isShowPassword=!isShowPassword">
          <div class="item-left">
            <span>修改密码</span>
          </div>
          <div class="item-right">
            <span>{{user.password}}</span>
          </div>
        </div>
      </div>
      <div class="submit-box" v-on:click="submit">
        <span>提交修改</span>
      </div>
    </div>
    <!--公共底部组件-->
    <CommonBottom></CommonBottom>
    <!--弹出层，将是否显示性别，显示区域，显示生日，显示密码等组件-->
    <div class="shadow" v-show="isShowSex||isShowDistrict||isShowBirth||isShowPassword||isLoading"
         v-on:click.self="hideAllLayer">
      <div class="layer-sex" v-show="isShowSex">
        <mt-header title="性别" class="layer-header">
        </mt-header>
        <mt-radio
          v-model="sex"
          :options="['男','女']"
          align="right"
        >
        </mt-radio>
      </div>
      <div class="layer-district" v-show="isShowDistrict">
        <mt-picker :slots="slots1" @change="onProvinceChange" class="picker"></mt-picker>
        <mt-picker :slots="slots2" @change="onCityChange" class="picker"></mt-picker>
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
      <div class="layer-birth" v-show="isShowBirth">
        <mt-datetime-picker
          ref="picker"
          type="date"
          v-model="birthday"
          v-bind:start-date="data.startDate"
          v-bind:end-date="data.endDate"
          year-format="{value}"
          month-format="{value}"
          date-format="{value}"
          class="birth-picker-box"
          v-on:confirm="hideAllLayer"
        >
        </mt-datetime-picker>
      </div>
      <div class="layer-password" v-show="isShowPassword">
        <div class="password-header">
          密码
        </div>
        <div class="error-tips-box">
          {{tips}}
        </div>
        <div class="password-box">
          <input type="password" class="password" placeholder="请输入密码" v-model="confirmPassword" minlength="4"
                 maxlength="16"/>
        </div>
        <div class="password-box">
          <input type="password" class="password" placeholder="请确认密码" v-model="password" minlength="4" maxlength="16"/>
        </div>
        <div class="confirm-box">
          <mt-button type="primary" size="small" v-on:click="isPasswordSimilar">确定</mt-button>
        </div>
      </div>
    </div>
    <!--弹出层，是否显示图片组件，是否上传-->
    <div class="layer-photo" v-show="isShowPhoto">
      <mt-header title="照片" class="header">
        <router-link to="/user" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <div class="button-box">
        <button class="confirm-crop" v-on:click="crop">确定</button>
      </div>
      <div class="choose-img-box">
        <img id="image" v-bind:src="url">
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import {DatetimePicker} from 'mint-ui';
  import {Picker} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.min.css'
  import $ from 'jQuery';
  import moment from 'moment'

  export default {

    name: "user-information",
    mounted: function () {
      //初始化数据
      this.mobile = this.$route.query.mobile ? this.$route.query.mobile : this.$cookies.get('mobile');
      this.mac = this.$route.query.mac ? this.$route.query.mac : this.$cookies.get('mac');
      this.getProvince();
      // this.getUserInfo();
      var image = document.getElementById('image');
      var that = this;
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        background: false,
        cropBoxResizable: false,
        zoomable: false,
        ready: function () {
          that.croppable = true;
        }
      });
    },
    data() {
      return {
        sex: '男',
        //获取省份，市信息
        json: null,
        user: {},
        md5: "******",
        mobile: '',
        mac: '',
        provinces: '',
        province: '',
        provinceId: '',
        isFirst: false,
        cityId: '',
        cities: '',
        city: '',
        //用户信息参数
        userInfo: {
          username: '丁宗海',
          sex: '男',
          province: '浙江',
          city: '台州',
          birth: new Date('1994-08-14'),
          profession: '计算机网络应用',
          tag: '人生只需要一条路，一直走下去！',
          password: '*****',
          img: "../assets/images/user.png"
        },
        tips: "密码在4为和16位之间",//密码提示
        //剪切图片的参数
        headerImage: '',
        birthday: '',
        picValue: '',
        password: '',
        confirmPassword: '',
        cropper: '',
        croppable: false,
        url: '',
        isShowSex: false,//是否显示sex框
        isShowDistrict: false,//是否显示地区框
        isShowBirth: false,//是否显示生日选择框
        isShowPassword: false,//是否显示修改password框
        isShowPhoto: false,//是否显示裁切图片框
        isLoading: false,
        data: {
          startDate: new Date('1900-01-01'),
          endDate: new Date()
        },//日期框的开始时间和结束事件
        backgroundColor: {
          gray: "user-information-change"
        },//蒙版
        slots1: [
          {
            flex: 1,
            values: ["北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区", "台湾省", "香港特别行政区", "澳门特别行政区", "海外", "其他"],
            className: 'slot1',
            textAlign: 'right',
            defaultIndex: '0'
          }
        ],
        slots2: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ],//区域数据
      }
    },
    watch: {
      userInfo: function (newVal, oldVal) {
        if (newVal.username.length === 10) {
          Toast({
            message: '昵称最长不能超多10',
            duration: 2000
          });
        }

      },
      deep: true
    },
    computed: {
      transDate: function () {
        if (!this.birthday) return '';
        return moment(this.birthday).format('YYYY-MM-DD');
      },
    },

    methods: {
      /***
       * 获取用户信息
       */
      getUserInfo: function () {
        let that = this;
        $.get(this.CommonConst.BASE_URL + 'demo/user/userinfo', {
          "mobile": that.mobile
        }, function (response) {
          that.user = response.data;
          that.birthday = that.user.Birthday == '' ? '2000-10-01' : that.user.Birthday;
          that.sex = that.user.gender === 1 ? '男' : '女';
          that.province = that.user.region.split(',')[0];
          that.city = that.user.region.split(',')[1];
        });
      },
      // 提交表单
      submit: function () {
        var that = this;
        delete(this.user.headImage);
        this.user.gender = this.sex === '男' ? '1' : '0';
        this.user.region = this.province + ',' + this.city;
        that.user.Birthday = this.transDate;
        $.post(this.CommonConst.BASE_URL + 'demo/user/userUpdate', this.user, function (response) {
            if (response.error === 0) {
              Toast({
                message: '修改成功',
              });
              that.$router.push({
                path: '/user',
                query: {
                  "mobile": that.mobile,
                  "mac": that.mac
                }
              });
            }
          }
        )
      },
      /***
       *密码组件，判断密码是否相同
       */
      isPasswordSimilar: function () {
        if (this.password !== this.confirmPassword) {
          this.tips = "两次输入的密码不一样";
        } else {
          this.user.password = this.password;
          this.hideAllLayer();
        }
      },
      getProvince() {
        let that = this;
        $.ajax({
          method: 'get',
          url: this.CommonConst.BASE_URL + 'demo/publics/locationsList',
          success: function (response) {
            that.provinces = response.data;
            let arrProvince = [];
            for (let index = 0; index < that.provinces.length; index++) {
              arrProvince.push(that.provinces[index].name);
            }
            that.$set(that.slots1[0], 'values', arrProvince);
            that.getCity('1');
            that.getUserInfo();
          }
        })
      },
      getCity(id) {
        let that = this;
        $.ajax({
          method: 'get',
          data: {
            'parent_id': id
          },
          url: this.CommonConst.BASE_URL + 'demo/publics/locationsList',
          success: function (response) {
            that.cities = response.data;
            let arrCity = [];
            for (let index = 0; index < that.cities.length; index++) {
              arrCity.push(that.cities[index].name);
            }
            that.$set(that.slots2[0], 'values', arrCity)
          }
        })

      },
      /***
       * 根据所选省份的不同显示不同的地区
       * @param picker
       */
      onProvinceChange(picker) {
        this.province = picker.getValues()[0];
        let id = '';
        for (let index = 0; index < this.provinces.length; index++) {
          if (this.provinces[index].name === this.province) {
            id = this.provinces[index].id;
            this.getCity(id);
            break;
          }
        }
      },
      /***
       * 根据所选省份的不同显示不同的地区
       * @param picker
       */
      onCityChange(picker) {
        this.city = picker.getValues()[0];
      },
      /***
       * 隐藏所有的弹出层
       */
      hideAllLayer: function () {
        this.isShowSex = false;
        this.isShowDistrict = false;
        this.isShowPassword = false;
        // let date = moment(new Date(this.user.Birthday)).format('YYYY-MM-DD');
        this.closeDatePicker();
      },
      /**
       * 打开日期选择控件
       */
      openDatePicker: function () {
        this.isShowBirth = true;
        this.$refs.picker.open();
      },
      /**
       * 关闭日期控件
       */
      closeDatePicker: function () {
        this.isShowBirth = false;
        this.$refs.picker.close();
      },
      /***
       * 获取所选择图片的url
       * @param file所选择的文件
       * @returns {*返回图片的路径}
       */
      getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      /**
       * 修改头像
       * @param e事件e
       */
      changePhoto: function (e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.isShowPhoto = true;
        this.url = this.getObjectURL(files[0]);
        // //每次替换图片要重新得到新的url
        if (this.cropper) {
          this.cropper.replace(this.url);
        }
        this.isShowPhoto = true;

      },
      /***
       * 剪切，图片
       */
      crop: function () {
        this.isShowPhoto = false;
        this.isLoading = true;
        var croppedCanvas;
        var roundedCanvas;
        if (!this.croppable) {
          return;
        }
        let that = this;
        croppedCanvas = this.cropper.getCroppedCanvas();
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);
        this.user.headImage = roundedCanvas.toDataURL();
        $.post({
          url: that.CommonConst.BASE_URL + 'demo/user/pic_base64',
          type: 'post',
          data: {
            'id': that.user.id,
            'headImage': that.user.headImage,
          }
        }, function (response) {
          that.isLoading = false;
          if (response.error === 0) {
            Toast(response.message);
          }
        })
      },
      /***
       * 通过canvas画图
       * @param sourceCanvas
       * @returns {HTMLCanvasElement}
       */
      getRoundedCanvas: function (sourceCanvas) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.fillRect(0, 0, width, height);
        context.fill();
        return canvas;
      },
    }
  }
</script>

<style scoped>
  .layer-photo {
    width: 100%;
    height: 100%;
    overflow: scroll;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 999;
    opacity: 1;
    font-size: 0.14rem;
    background-color: #000000;
  }

  .button-box {
    width: 100%;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: right;
  }

  .button-box .confirm-crop {
    width: 0.8rem;
    height: 0.4rem;
    margin-right: 0.1rem;
    border: none;
    border-radius: 5px;
    background: white;
  }

  .choose-img-box {

  }

  .choose-img-box img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .shadow {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .layer-sex, .layer-password {
    width: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 0;
    opacity: 1;
    background-color: #ffffff;
    border-radius: 3px;
    transform: translate(-50%, -50%);
    text-align: left;
  }

  .layer-password {
    width: 80%;
    padding-bottom: 0.1rem;
    border-radius: 3px;
  }

  .layer-password .password-header {
    margin-top: 0.1rem;
    height: 0.3rem;
    line-height: 0.3rem;
    width: 100%;
    text-align: center;
    color: #101010;
    font-size: 0.18rem;
  }

  .layer-password .error-tips-box {
    height: 0.3rem;
    line-height: 0.3rem;
    font-size: 0.14rem;
    color: red;
    text-align: center;
  }

  .layer-password > div {
    width: 90%;
    margin: 0 auto;
  }

  .layer-password input {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 0.1rem;
    height: 0.3rem;
    border: 1px solid #bbbbbb;
    border-radius: 3px;
    padding-left: 0.14rem;
    font-size: 0.14rem;
  }

  .confirm-box {
    text-align: center;
  }

  .layer-district, .layer-birth .birth-picker-box {
    width: 100%;
    height: 2rem;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    overflow: hidden;
  }

  .layer-header {
    background-color: #ffffff;
    color: #101010;
    border-bottom: 1px solid #bbbbbb;
  }

  .user-information {
    background-color: rgba(239, 239, 239, 1);
    height: 100%;
  }

  .header {
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: rgba(37, 44, 53, 1);
  }

  .container-box {
    margin-top: 0.1rem;
    overflow: hidden;
  }

  .container-box > .item-box {
    margin-bottom: 0.1rem;
  }

  .container-box > .item-box > div {
    box-sizing: border-box;
    background-color: #ffffff;
    text-align: left;
    padding: 0 0.1rem;
  }

  .not-pay, .not-pay a {
    color: red;
  }

  .container-box .item {
    font-size: 0;
  }

  .container-box .item1 {
    font-size: 0;
    height: 1rem;
    line-height: 1rem;
    position: relative;
  }

  .container-box .item1 > div {

  }

  .container-box .item1 .file-box {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    opacity: 0;
  }

  .container-box .item1 .file-box input {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    display: block;
    margin: 0;
    padding: 0;
  }

  .container-box .item1 span {
    font-size: 0.14rem;
    color: rgba(37, 44, 53, 1);
  }

  .container-box .item1 .user-logo {
    margin-top: 0.1rem;
    width: 0.78rem;
    height: 0.78rem;
    float: right;
  }

  .item-left {
    float: left;
    height: 0.4rem;
    line-height: 0.4rem;
    color: rgba(37, 44, 53, 1);
    font-size: 0.14rem;
    font-family: Arial;
  }

  .item-right {
    float: right;
    height: 0.4rem;
    line-height: 0.4rem;
    color: rgba(174, 183, 194, 1);
    font-size: 0.14rem;
    font-family: Arial;
  }

  .item2, .submit-box {
    height: 0.4rem;
    box-sizing: border-box;
    padding: 0 0.03rem 0 0.12rem;
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

  .underline-box2 {
    background-color: #ffffff;
    width: 100%;
  }

  .underline-box2 hr {
    margin: 0;
    width: 100%;
    border-top: none;
    opacity: 1;
  }

  .submit-box {
    margin-top: 0.3rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    font-size: 0;
    background-color: #ffffff;

  }

  .submit-box span {
    color: rgba(68, 126, 217, 1);
    font-size: 0.14rem;
  }

  .input-txt {
    border: none;
    text-align: right;
    outline: none;
    font-size: 0.14rem;
    color: rgba(174, 183, 194, 1);
    width: 2.1rem;
  }

  .user-information .bottom-box {
    margin: 0;
    padding-top: 0.85rem;
    background-color: rgba(239, 239, 239, 1);;
    padding-bottom: 0.14rem;
  }

  .picker {
    width: 50%;
    float: left;
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
