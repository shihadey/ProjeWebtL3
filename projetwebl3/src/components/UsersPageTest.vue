<template>
    <div>
      <h1>Utilisateurs</h1>
      <ul>
        <li v-for="user in users" :key="user.id">{{ user.username }}</li>
      </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    axios.get('http://localhost:3000/users')
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      });
  },
};
</script>
