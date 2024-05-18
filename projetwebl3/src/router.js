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
import NotFound from './components/NotFound.vue';

//libs
import { jwtDecode } from 'jwt-decode';


//routes pour les droits
Vue.use(VueRouter);

// Définissez vos routes
const routes = [
  { path: '/', component: Home },
  { path: '*', component: NotFound },
  { path: '/products', component: Products },
  { path: '/orders', component: Orders },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profile', component: UserProfile },
  // { path: '/AdminDashboard', component: AdminDashboard },
  {path: '/AdminDashboard', 
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true }
    }
];

const router = new VueRouter({
  mode: 'history',
  routes
  });

// Navigation guard pour vérifier l'authentification et le rôle
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const token = localStorage.getItem('token');
  const isAdmin = token ? jwtDecode(token).role === 'ADMIN' : false;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login');
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});
  
  export default router;