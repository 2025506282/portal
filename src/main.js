// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'animate.css/animate.min.css'
import CommonBottom from './components/CommonBottom.vue'
import Utils from './utils/utils.js'
import CommonConst from './utils/const.js'
import VueCookies from 'vue-cookies'
import Calendar from 'vue2-datepick';
Vue.config.productionTip = false;
Vue.use(Calendar);
Vue.use(VueCookies);
Vue.use(MintUI);

/***
 * 注册全局组件
 */
Vue.component("CommonBottom", CommonBottom);
router.afterEach((to,from,next) => {

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = document.body.scrollTop = 0;
})
Vue.prototype.CommonConst = CommonConst;
Vue.prototype.Utils = Utils;
Vue.prototype.trimAll = function (str) {
  var arr = str;
  var newArr = [];
  for (var index in arr) {
    if (arr[index] !== ' ') {
      newArr.push(arr[index]);
    }
  }
  return newArr.join('');
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: {App},
  template: '<App/>'
});

