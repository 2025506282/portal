//  http请求拦截器
import axios from "axios/index";
import router from "../router";
axios.interceptors.request.use(config => {
  if(config.data){
    config.data = JSON.stringify(config.data);
  }
  config.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  let token = localStorage.getItem("access_token");
  if (true) {
    let obj = {
      "access_token": 'qnXbV2YsNH89HxlyZExHVYQ7t8MZffWM'
    };
    config.params = Object.assign(obj, config.params);
  }
  return config
}, error => {

});

// // http响应拦截器
axios.interceptors.response.use(response => {// 响应成功关闭loading
  //loadinginstace.close()
  // if (response.data.error === '401') {
  //   localStorage.clear();
  //   router.push('/');
  // }

  return response;
}, error => {
  console.log(111111111111);
  console.log(error);
  if (error.status === 302) {
    alert(2)
    router.push('/');
  }
  return Promise.reject(error)
})
