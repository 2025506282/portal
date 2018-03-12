<template>
  <div class="home">
    <keep-alive>
      <HomeHeader></HomeHeader>
    </keep-alive>
    <router-view></router-view>
    <CommonBottom></CommonBottom>
  </div>
</template>

<script>
  import HomeHeader from '../components/HomeHeader.vue'

  export default {
    components: {HomeHeader}
  }
</script>

<style scoped>
</style>
