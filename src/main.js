import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
// import '@/permission' // permission control
import api from './api'
// import VueSocketIO from 'vue-socket.io'

window.API = api
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *区·
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// beforeRouteEnter (to, from, next) {
// next()
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://192.168.105.97:8888'
// }))
// }
new Vue({
  router,
  store,
  render: h => h(App)
  // sockets: {
  //   reply({ value }) {
  //     console.log(value)
  //   },
  //   connect: function() {
  //     console.log('socket connected')
  //   }
  // }
}).$mount('#app')
