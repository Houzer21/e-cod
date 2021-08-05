import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "../src/assets/css/LineIcons.css"
import "../src/assets/css/bootstrap-grid.min.css"
import "../src/assets/css/main.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
