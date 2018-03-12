<template>
  <div class="home-bottom">
    <div class="agree-argument-box">
      <input type="checkbox" id="agree"  v-model="checked"/>
      <label for="agree">我同意此上网服务条款</label>
    </div>
    <div class="bottom-box">
      ©由如来云提供云计费服务
    </div>
  </div>

</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        tel: "",
        password: "",
        isStay: true,
        checked: false,
        nextStepStayClass: "next-step-stay",
        nextStepGoingClass: "next-step-go"
      }
    },
    methods: {
      submit: function() {
        if(this.password.length<4||this.password.length>17) {
          return false;
        } else {
          alert(this.checked)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-box {
    width: 100%;
    position: fixed;
    bottom: 14px;
    text-align: center;
    height: 23px;
    line-height: 23px;
    color: rgba(16, 16, 16, 1);
    font-size: 10px;
    overflow: hidden;
  }
  .agree-argument-box {
    margin-top: 4px;
  }
  .agree-argument-box #agree {
    vertical-align: middle;
  }
  .agree-argument-box label{
    width: 121px;
    height: 23px;
    line-height: 17px;
    color: rgba(89, 87, 87, 1);
    font-size: 12px;
  }
</style>
