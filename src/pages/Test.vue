<template>
  <div class="box">
    <div class="item item2" v-on:click="getProvince">
      <div class="item-left">
        <span>地区</span>
      </div>
      <p>{{province}}</p>
      <p>{{city}}</p>
      <div class="item-right">
        <span></span>
        <span></span>
      </div>
    </div>
    <mt-picker :slots="slots1" @change="onProvinceChange" class="picker"></mt-picker>
    <mt-picker :slots="slots2" @change="onCityChange" class="picker"></mt-picker>
  </div>


</template>
<style scoped>
  .box {
    width: 100%;
    height: 100%;
    font-size: 0.12rem;
  }

</style>

<script>
  import {Indicator} from 'mint-ui';
  import moment from 'moment';
  import $ from 'jQuery'
  export default {
    mounted: function () {
      this.getUserInfo();
      this.getProvince();
    },
    data() {
      return {
        birthday: '1994-08-14',
        data: {
          startDate: new Date('1900-01-01'),
          endDate: new Date()
        },//日期框的开始时间和结束事件
        example3: {
          img: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png',
          autoCrop: true,
          autoCropWidth: 200,
          autoCropHeight: 200,
          fixedBox: true
        },
        provinces: {},
        cities: {},
        province: '',
        city: '',
        slots1: [
          {
            flex: 1,
            values: ['1','2','3'],
            className: 'slot1',
            textAlign: 'right',
            parentId: ''
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
    computed: {
      filterBirthday: function () {
        // return this.birthday.getFullYear();
        return moment(this.birthday).format('YYYY-MM-DD');
      }
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
          that.province = that.user.region.split(',')[0];
          that.city = that.user.region.split(',')[1];

        });
      },
      getProvince() {
        let that = this;
        $.ajax({
          method: 'get',
          url: this.CommonConst.BASE_URL + 'demo/publics/locationsList',
          success: function (response) {
            that.provinces = response.data;
            var arr1 = [];
            var arr2 = [];
            for (let index = 0; index < that.provinces.length; index++) {
              arr1.push(that.provinces[index].name);
              arr2.push(that.provinces[index].parent_id);
            }
            that.$set(that.slots1[0], 'values', arr1);
            that.$set(that.slots1[0], 'parentId', arr2);
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
      onProvinceChange(picker,values) {
        // console.log(values)
        // console.log(picker);

        var province = picker.getValues()[0];
        var parentId = '';
        for (let index = 0; index < this.provinces.length; index++) {
          if (this.provinces[index].name === province) {
            console.log(this.provinces[index]);
            parentId = this.provinces[index].id;
            this.getCity(parentId);
            break;
          }
        }
        // console.log(picker.getValues())
        var province = picker.getValues()[0];
        // this.$set(this.userInfo, 'province', province);
        // var parentId = '';
        // for (let index = 0; index < this.provinces.length; index++) {
        //   if (this.provinces[index].name === province) {
        //     parentId = this.provinces[index].parent_id;
        //     this.getCity(parentId);
        //     break;
        //   }
        // }
      },
      /***
       * 根据所选省份的不同显示不同的地区
       * @param picker
       */
      onCityChange(picker) {

      }
      ,
      hideAllLayer: function () {

      }
      ,
      openPicker() {
        this.$refs.picker.open();
      }
      ,
      closePicker() {
        this.$refs.picker.close();
      }
      ,
    }
  }

</script>
