<template>
  <div class="jumbotron jumbotron-fluid bg-secondary rounded-bottom rounded-top" style="padding-top: 30px; padding-bottom: 30px; padding-left: 30px;">
    <div class="banner-text text-white">
      <h1>VueJs Shopping App</h1>
      <!-- //tester les routes -->
      <nav>
        <!-- <router-link to="/">Accueil</router-link>
        <router-link to="/products">Produits</router-link>
        <router-link v-if="isLoggedIn" to="/orders">Commandes</router-link>
        <router-link v-if="!isLoggedIn" to="/register">Creer compte</router-link>
        <router-link v-if="!isLoggedIn" to="/login">Se connecter</router-link>
        <router-link v-if="isLoggedIn" to="/profile">Profil</router-link>
        <router-link v-if="isLoggedIn && isAdmin" to="/admin/dashboard">Tableau de bord administrateur</router-link> -->

        <ul>
          <li> <router-link to="/">Accueil</router-link></li>
          <li ><router-link to="/products">Produits</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/profile">Profil</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/orders">Commandes</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/register">Creer compte</router-link></li>
          <!-- <li v-if="isLoggedIn"><button @click="logout">Déconnexion</button></li> -->
          <li v-if="!isAuthenticated"><router-link to="/login">Connexion</router-link></li>
          <li v-if="isAuthenticated && isAdmin"><router-link to="/AdminDashboard">Admin Dashboard</router-link></li>
      </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// import AppMenu from './AppMenu.vue';
import { jwtDecode } from 'jwt-decode';
  export default {
    name: 'AppMenu',
    computed: {
    isAuthenticated() {
      return localStorage.getItem('token') !== null;
    },
    isAdmin() {
      if (this.isAuthenticated) {
        // Décoder le token JWT pour récupérer les informations
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        // Vérifier si l'utilisateur a le rôle d'administrateur
        return decodedToken.role === 'ADMIN';
      }
      return false;
    },
  },
    // components: {
    //   AppMenu
    // },
  methods: {
    logout() {
        // Effacer les informations d'authentification du stockage local
        localStorage.removeItem('token');
        // Mettre à jour l'état de connexion
        this.isLoggedIn = false;
        this.$router.push('/login');
    },
  },
  };
    
</script>

<!-- Add " scoped " attribute to limit CSS to this component only -->
<style scoped>
</style>