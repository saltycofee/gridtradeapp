// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
//引入自己的css
import './assets/css/global.css'
import router from './router'
//注册vant组建
Vue.use(Vant)

// Vue.use(echarts)


//注册elemnt-ui 全局变量
Vue.use(ElementUi)
//注册mint-ui 全局变量
Vue.use(MintUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
