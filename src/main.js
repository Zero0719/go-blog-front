import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
import './main.css'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// eslint-disable-next-line camelcase
var axios_instance = Axios.create({
  // config里面有这个transformRquest， 这个选项会在发送参数前进行处理。 这时候我们通过Qs.stringify转换为表单查询参数
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }],
  // 设置Content - Type
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
Vue.use(VueAxios, axios_instance)
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
