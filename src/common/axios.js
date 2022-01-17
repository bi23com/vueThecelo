import axios from 'axios'
import { Toast } from 'vant';
import router from "../router";
import store from "../store";
// 添加请求拦截器
axios.interceptors.request.use(config => {
  if(config.url == '/api/files/one'){
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  // method=dashboard
  if(config.params.method != 'dashboard'){
    // loading方法
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner',
    });
  }
  return config
}, function (error) {
  console.log(error + "====error")
  // 对请求错误做些什么
  Toast({
    message: '网络不可用,请检查',
    position: 'bottom',
    duration: 5000
  });
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  Toast.clear();
  if (typeof response.data === 'object') {
    if (response.data.statusCode == '401') {
      Toast({
        message: response.data.message+'请登录！',
        position: 'bottom',
        duration: 3000
      });
      return {data: {}};
    }
    return response;
  } else {
    return response
  }
}, function (error) {
  Toast.clear();
  // 对响应错误做点什么
  Toast({
    message: '网络不可用,请稍后再试',
    position: 'bottom',
    duration: 5000
  });
  return Promise.reject(error)
})

export default axios
