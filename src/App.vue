<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'App',
    watch: {

    },
    mounted: function () {
      // var json = this.Utils.transLocation('');
      // var json1 = this.Utils.transLocation('http://172.16.1.158/radiusS_php/hotspotlogin.php/?res=notyet&uamip=192.168.10.1&uamport=3990&challenge=7887ba2c8aecfd817497d9a4c6599757&called=5A-E9-5F-D4-F8-FB&mac=F0-79-60-36-CA-25&ip=192.168.10.3&nasid=4f7db2&sessionid=5a52e0ad00000002&userurl=http%3a%2f%2fwifiportal.huazhu.com%2fportal%2fconnectsucc.html%3fHotelid%257C2300312%2fmac%257Cf0%3a79%3a60%3a36%3aca%3a25%2fip%257C192.168.71.93%2fmobile%257C15321588557%2ftype%257CDynmic%2fMemberID%257C119660803%2fparam%257CqOz7gDhGJowol3bjYmiUz4r*MM2k3eyxYI68z2tSZ85OB9iW19TeFxOYjpJZ0Hnh2weFxa1aSaCdNMAV5MZFjll7j16WXPRkzdCUODwilkcYVm8cjMLCRfk1znnKZLfaQ3RqLcEzLp8-9IKl5S9HXVKQsIhH5TD3i1GIonzpuvQYIl3d0lc256SZQw0hCxebGqUjq999RmUMPbfedkCPaQ..&md=008B93235626B8E503E65391EECCF965');
      // var json2 = this.Utils.transLocation('http://172.16.1.158/radiusS_php/hotspotlogin.php?ros=notyet&ip=10.5.63.253&mac=F0%3A79%3A60%3A36%3ACA%3A25&user=&uamport=mikrotik&userurl=http%3A%2F%2Fwww.2345.com%2F%3Fkdf00001&nasid=hukaizhu1_1&uamip=10.5.50.1%3A80&error=&chap-id=%5C106&chap-challenge=%5C376%5C342%5C230%5C132%5C037%5C115%5C046%5C224%5C312%5C235%5C001%5C215%5C133%5C230%5C216%5C255');
    },

  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }


  html {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  body {
    margin: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  #app {
    font-family: 微软雅黑, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0 auto;
  }

  .clear-both {
    clear: both;
  }

  .underline-box {
    padding: 0 0.1rem;
    background-color: #ffffff;
  }

  .underline-box hr {
    opacity: 0.3;
    width: 100%;
  }

  /*home页面公共样式*/
  .header-tag {
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

  .header-tag .icon-logo {
    display: block;
    float: left;
    margin-top: 0.015rem;
    width: 0.06rem;
    height: 0.2rem;
    background-color: rgba(51, 60, 75, 1);
  }

  .header-tag b {
    display: inline-block;
    line-height: 0.2rem;
    margin-left: 0.06rem;
  }

  .content-title {
    margin-top: 0.07rem;
    height: 0.26rem;
    line-height: 0.26rem;
    color: rgba(16, 16, 16, 1);
    font-size: 0.18rem;
  }

  .content-logo-box .content-logo {
    width: 0.35rem;
    height: 0.35rem;
    display: block;
    margin: 0 auto;
  }

  .content-title-tips {
    height: 0.3rem;
    line-height: 0.3rem;
    color: rgba(159, 160, 160, 1);
    font-size: 0.1rem;
  }

  .input-box {
    margin-bottom: 0.07rem;
    font-size: 0;
  }

  .input-box > div {
    position: relative;
    width: 2rem;
    margin: 0 auto;
  }

  .input-box > div > .input {
    display: block;
    border: none;
    outline: none;
    text-align: center;
    width: 2rem;
    font-family: Arial;
    font-size: 0.18rem;
    line-height: 0.26rem;
  }

  .input-box p {
    position: absolute;
    height: 0.26rem;
    line-height: 0.26rem;
    color: rgba(16, 16, 16, 1);
    font-size: 0.12rem;
    font-family: Arial;
    left: -0.1rem;
  }

  .input-box p span {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.12rem;
  }

  .next-step-box {
    margin-top: 0.16rem;
    margin-bottom: 0.16rem;
    height: 0.24rem;
    line-height: 0.24rem;
    font-size: 0;
  }

  .next-step-box > div {
    width: 1.7rem;
    margin: 0 auto;
  }

  .next-step-box > div > a {
    display: block;
    margin: 0 auto;
    font-size: 0.18rem;
  }

  hr {
    margin: 0.02rem auto;
    width: 2rem;
  }

  .next-step-go {
    color: #26a2ff;
  }

  .next-step-stay {
    color: rgba(187, 187, 187, 1);
  }

  .agree-argument-box {
    text-align: center;
    font-size: 0;

  }

  .agree-argument-box #agree {
    font-size: 0.12rem;
    width: 0.12rem;
    height: 0.12rem;
    display: inline-block;
    vertical-align: -0.01rem;
  }

  .agree-argument-box label, .agree-argument-box a {
    display: inline;
    color: rgba(89, 87, 87, 1);
    font-size: 0.12rem;
  }

  /*几种特殊颜色的样式*/
  .light-color {
    color: #447ED9;
  }

  .continue-color {
    color: #259B24;
  }

  .danger-color {
    color: #E51C23;
    font-size: 0.16rem;
  }
  .mint-indicator-wrapper {
    font-size: 0.12rem;
    z-index: 1000;
  }
  .mint-spinner-fading-circle {
    margin: 0.4rem auto 0.2rem;
    width: 0.4rem;
    height: 0.4rem;
  }
  @media screen and (max-width: 1024px) {
    .home-header {
      width: 750px;
      margin: 0 auto;
    }
  }
  @media screen and (max-width: 750px) {
    .home-header {
      width: 100%;
      margin: 0 auto;
    }
  }
</style>
