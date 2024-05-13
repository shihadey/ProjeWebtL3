<template>
  <div>
    <!-- <AppMenu></AppMenu> -->
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Se connecter</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>

    <!-- Indicateur de connexion
    <div v-if="this.$store.isLoggedIn" class="connected-indicator">
      Vous êtes connecté en tant que {{ email }}.
    </div> -->
  </div>
</template>

<script>
// import AppMenu from './AppMenu.vue';
export default {
  // mounted() {
  //   this.isLoggedIn = true;
  // },
  name:'LoginPage',
  // components: {
  //   AppMenu
  // },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      // isLoggedIn: false // Variable pour suivre l'état de connexion
    };
  },
  methods: {
    login() {
      // Envoyer les données de connexion au serveur
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
      .then(response => {
        if (response.ok) {
          // Authentification réussie, enregistrer le token JWT dans le stockage local
          return response.json();
        } else {
          throw new Error('Identifiants invalides');
        }
      })
      .then(data => {
        // Stocker le token JWT dans le stockage local
        localStorage.setItem('token', data.token);
        // change les valeurs de l'état de connexion et du rôle de l'utilisateur
        // const role = data.role;
        // this.$store.commit('setLoggedIn', true);
        // if (role === 'admin') {
        //   this.$store.commit('setIsAdmin',true);
        // }
        // else {
        //   this.$store.commit('setIsAdmin',false);
        // }
        this.$router.push('/profile');
        
      })
      .catch(error => {
        console.error('Erreur lors de la connexion:', error);
        this.error = 'Identifiants invalides';
      });
    }

  }
};
</script>

<style>
.error {
  color: red;
}

.connected-indicator {
  background-color: lightgreen;
  padding: 10px;
  border: 1px solid green;
  margin-top: 10px;
}
</style>
