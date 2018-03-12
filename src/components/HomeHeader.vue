<template>
  <div class="home-header">
    <div>
      <img :src="placeBanner" class="header-logo"/>
    </div>
    <div class="header-tag">
      <span class="icon-logo"></span>
      <b>{{placeName}}</b>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery';

  export default {
    name: "bottom",
    mounted: function () {
      let that = this;
      if(this.$cookies.isKey('placeName')){
        that.placeBanner = this.$cookies.get('placeBanner');
        that.placeName =  this.$cookies.get('placeName');
      } else {
        let locationJson = this.Utils.transLocation(location.href);
        locationJson['url'] = location.href;
        if(locationJson.hasOwnProperty('gwid')) {
          locationJson['nasid'] = locationJson.gwid;
        }
        locationJson['client_type'] = 'mobile';
        $.get(this.CommonConst.BASE_URL + 'demo/place/read', locationJson, function (response) {
          that.placeBanner = response.data.place_info.place_banner;
          that.placeName = response.data.place_info.place_name;
          that.$cookies.set("placeBanner",that.placeBanner);
          that.$cookies.set("placeName",that.placeName);
        });
      }


    },
    data: function () {
      return {
        placeBanner: '',
        placeName: ''
      }
    }
  }
</script>

<style scoped>
  /*components中HomeHeader的组件样式*/
  .home-header {
    overflow: hidden;
  }
  .home-header .header-logo {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: 0 auto;
  }

  .home-header .header-tag {
    margin-top: 0.1rem;
    width: 100%;
    text-align: left;
    height: 0.24rem;
    line-height: 0.24rem;
    box-sizing: border-box;
    margin-left: 0.1rem;
    color: rgba(51, 60, 75, 1);
    font-size: 0.14rem;
  }

  .home-header .header-tag .icon-logo {
    display: block;
    float: left;
    margin-top: 0.015rem;
    width: 0.06rem;
    height: 0.2rem;
    background-color: rgba(51, 60, 75, 1);
  }

  .home-header .header-tag b {
    display: inline-block;
    line-height: 0.2rem;
    margin-left: 0.06rem;
  }

</style>
