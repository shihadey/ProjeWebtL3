<template>
  <div>
    <input type="text" v-model="username" placeholder="Nom d'utilisateur">
    <input type="password" v-model="password" placeholder="Mot de passe">
    <button @click="login">Connexion</button>
    <button @click="register">S'inscrire</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Logique de connexion à implémenter
    },
    register() {
      // Logique d'inscription à implémenter
    }
  }
}
</script>
