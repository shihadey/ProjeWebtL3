<template>
    <div>
      <AppMenu></AppMenu>
        <!-- Lien vers la page du tableau de bord de l'administrateur -->
        <!-- <router-link v-if="isLoggedIn && isAdmin" to="/admin/dashboard">Tableau de bord administrateur</router-link> -->
        <!-- <router-link to="/admin/dashboard">Tableau de bord administrateur NH</router-link> -->
        <!-- Autres liens et contenu de la page ici -->
      <p>Bienvenue sur le dashbaord admin</p>
    </div>
  </template>
  
  <script>
  import AppMenu from './AppMenu.vue';
  // import { jwtDecode } from 'jwt-decode';
  
  export default {
    // data() {
    //   return {
    //     isLoggedIn: false,
    //     isAdmin: false
    //   };
    // },
    components: {
      AppMenu
    },
    // created() {
    //   // Vérifier si l'utilisateur est connecté en consultant le stockage local
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     // Décodez le token JWT pour obtenir les informations de l'utilisateur
    //     const decodedToken = jwtDecode(token);
    //     if (decodedToken && decodedToken.userId) {
    //       // Mettre à jour l'état de connexion
    //       this.isLoggedIn = true;
    //       // Vérifier si l'utilisateur est administrateur
    //       if (decodedToken.role === 'ADMIN') {
    //         this.isAdmin = true;
    //       }
    //     }
    //   }
    // }
  };
  </script>
  