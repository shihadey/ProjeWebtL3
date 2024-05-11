import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
Vue.use(BootstrapVue)


//routes pour les droits
Vue.use(VueRouter);
// Importez vos composants pour chaque route
import Home from './components/HomePage.vue';
import Products from './components/ProductsPage.vue';
import Orders from './components/OrdersPage.vue';
import Register from './components/RegisterNew.vue';
import Login from './components/LoginPop.vue';


// Définissez vos routes
const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/orders', component: Orders },
  { path: '/register', component: Register },
  { path: '/login', component: Login }
];

// Créez une instance de Vue Router avec les routes définies
const router = new VueRouter({
  routes
});

new Vue({
 router,
 render: h => h(App),
}).$mount('#app')
