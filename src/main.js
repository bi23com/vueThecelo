import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'default-passive-events'
import './common/directive'

Vue.config.productionTip = false;
// 全局引用
// import ElementUI from 'element-ui'
// import locale from '../node_modules/element-ui/lib/locale/lang/en.js'; 
// Vue.use(ElementUI, {locale} );
import 'element-ui/lib/theme-chalk/index.css'

// aa按需加载
import lang from '../node_modules/element-ui/lib/locale/lang/en.js'; 
import locale from 'element-ui/lib/locale'
// 设置语言
locale.use(lang)
import element from './element/index'
Vue.use(element)

// 
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
import '../node_modules/echarts/map/js/world.js' // 引入世界地图

// vue中使用react
import { VuePlugin } from 'vuera'
Vue.use(VuePlugin)

// 等高插件
import VueMatchHeights from "vue-match-heights";
Vue.use(VueMatchHeights);

// 瀑布流
// import waterfall from 'vue-waterfall2'
// Vue.use(waterfall)

// 格式化
import format from './common/format' // 全局util
Vue.prototype.$format = format;
Vue.use(format);

// 全局filter
import * as filters from './common/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 复制
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

// 导出 excel
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel);
 

router.beforeEach((to, from, next) => {
  // change 头部 navs
  if(to.meta.menuId || to.meta.menuId == 0){
    store.commit('updateheadTabClsId',to.meta.menuId);
  }
  window.scroll(0, 0);
  next()
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
