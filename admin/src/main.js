import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http.js'

Vue.prototype.$http = http

Vue.config.productionTip = false

// mixin 混入
Vue.mixin({
  computed: {
    // 上传的基本地址
    baseUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    // 设置请求头
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      } 
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
