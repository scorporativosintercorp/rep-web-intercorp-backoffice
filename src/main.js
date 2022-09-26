// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import JQuery from 'jquery'
import VueSlideBar from 'vue-slide-bar'
import VueSweetalert2 from 'vue-sweetalert2'
import VueGoodWizard from 'vue-good-wizard'
import Loading from 'vue-loading-overlay'
import VueConfirmDialog from 'vue-confirm-dialog'
import InputColorPicker from 'vue-native-color-picker'
import 'vue-loading-overlay/dist/vue-loading.css'
// eslint-disable-next-line
let $ = JQuery

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.use(Loading)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2, options)
Vue.use(VueGoodWizard)
Vue.use(VueConfirmDialog)
Vue.use(InputColorPicker)
Vue.use(require('vue-moment'))
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

Vue.component('vue-slide-bar', VueSlideBar)
Vue.config.productionTip = false

Vue.prototype.$http = Axios
Vue.prototype.$axios = Axios

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['x-access-token'] = token
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
