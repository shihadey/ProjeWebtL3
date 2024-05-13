import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router';
import axiosInstance from './axios';
// import store from './store';
// import jwt_decode from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.prototype.$http = axiosInstance;


new Vue({
 router,
//  store,
 render: h => h(App),
}).$mount('#app')
