<template>
    <div>
      <h2>Inscription</h2>
      <form @submit.prevent="register">
        <div>
          <label for="username">Nom d'utilisateur:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Mot de passe:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">S'inscrire</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        error: ''
      };
    },
    methods: {
      register() {
        // Envoyer les données d'inscription au serveur
        console.log(this.username, this.email, this.password);
        fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          })
        })
        .then(response => {
        if (response.ok) {
            // Rediriger l'utilisateur vers une autre page après l'inscription
            this.$router.push('/login');
        } else {
            // Afficher un message d'erreur avec le contenu de la réponse
            response.json().then(data => {
            this.error = data.message;
            }).catch(error => {
            console.error('Erreur lors de la conversion de la réponse JSON:', error);
            this.error = 'L\'inscription a échoué. Veuillez réessayer.';
            });
        }
        })
        .catch(error => {
        console.error('Erreur lors de la requête d\'inscription:', error);
        this.error = 'L\'inscription a échoué. Veuillez réessayer.';
        });
      }
    }
  };
  </script>
  
  <style>
  .error {
    color: red;
  }
  </style>
  