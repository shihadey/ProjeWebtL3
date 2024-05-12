import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';
import axiosInstance from './axios';
// import jwt_decode from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.prototype.$http = axiosInstance;

//routes pour les droits
Vue.use(VueRouter);
// Importez vos composants pour chaque route
import Home from './components/HomePage.vue';
import Products from './components/ProductsPage.vue';
import Orders from './components/OrdersPage.vue';
import Register from './components/RegisterNew.vue';
import Login from './components/LoginPop.vue';
import UserProfile from './components/UserProfile.vue';

// Définissez vos routes
const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/orders', component: Orders },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profile', component: UserProfile }
];

// Créez une instance de Vue Router avec les routes définies
const router = new VueRouter({
  routes
});

new Vue({
 router,
 render: h => h(App),
}).$mount('#app')
