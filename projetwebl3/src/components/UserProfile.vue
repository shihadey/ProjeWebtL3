<template>
    <div>
      <!-- Afficher le message de bienvenue si l'utilisateur est connecté -->
      <div v-if="isLoggedIn" class="welcome-banner">
        Bienvenue {{ username }}
        <button @click="logout">Déconnexion</button>
      </div>
      <!-- Autres contenus de la page ici -->
    </div>
  </template>
  
  <script>
  import { jwtDecode } from 'jwt-decode';

  export default {
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
          this.username = decodedToken.username; // Assurez-vous que votre token JWT contient le nom d'utilisateur
        }
      }
    },
    methods: {
      logout() {
        // Effacer les informations d'authentification du stockage local
        localStorage.removeItem('token');
        // Mettre à jour l'état de connexion
        this.isLoggedIn = false;
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
  