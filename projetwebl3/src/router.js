import Vue from 'vue';
import VueRouter from 'vue-router';

// Importez vos composants pour chaque route
import Home from './components/HomePage.vue';
import Products from './components/ProductsPage.vue';
import Orders from './components/OrdersPage.vue';
import Register from './components/RegisterNew.vue';
import Login from './components/LoginPop.vue';
import UserProfile from './components/UserProfile.vue';
import AdminDashboard from './components/AdminDashboard.vue';


//routes pour les droits
Vue.use(VueRouter);

// Définissez vos routes
const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/orders', component: Orders },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profile', component: UserProfile },
  { path: '/admin/dashboard', component: AdminDashboard }
];

const router = new VueRouter({
    routes
  });
  
  export default router;