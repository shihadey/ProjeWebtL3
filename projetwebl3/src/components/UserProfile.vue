<template>
    <div>
      <!-- Afficher le message de bienvenue si l'utilisateur est connecté -->
      <!-- <AppMenu></AppMenu> -->
      <div v-if="isLoggedIn" class="welcome-banner">
        Bienvenue {{ username }}, vous êtes {{ role }}
        <button @click="logout()">Déconnexion</button>
        <!-- <button @click="testAdmin()">TestAdmion</button> -->
      </div>
      <!-- make a button appear if the user is admin-->
    </div>
  </template>
  
  <script>
  import { jwtDecode } from 'jwt-decode';
  // import AppMenu from './AppMenu.vue';
// import router from '@/router';
  // import HomePage from './HomePage.vue';

  export default {
    name:"UserProfile",
    // components: {
    //   AppMenu
    // },
    data() {
      return {
        isLoggedIn: false,
        username: ''
      };
    },
    created() {
      // Vérifier si l'utilisateur est connecté en consultant le stockage local
      const token = localStorage.getItem('token');
      if (token) {
        // Décodez le token JWT pour obtenir les informations de l'utilisateur
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.userId) {
          // Mettre à jour l'état de connexion et le nom d'utilisateur
          this.isLoggedIn = true;
          this.username = decodedToken.username; 
          // Obtenir le rôle de l'utilisateur
          this.role = decodedToken.role;
        }
      }
    },
    methods: {
      logout() {
        // Effacer les informations d'authentification du stockage local
        localStorage.removeItem('token');
        // Mettre à jour l'état de connexion
        this.isLoggedIn = false;
        this.$store.commit('setLoggedIn', false); // Pour connecter l'utilisateur
        this.$store.commit('setIsAdmin', false); // Pour définir l'utilisateur comme administrateur

        // Rediriger l'utilisateur vers la page de connexion ou toute autre page appropriée
        this.$router.push('/login');
      }
    }
  };
  </script>  

  <style>
  .welcome-banner {
    background-color: lightgreen;
    padding: 10px;
    border: 1px solid green;
    margin-bottom: 10px;
  }
  </style>
  