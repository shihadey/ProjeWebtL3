<template>
  <div>
    <AppMenu></AppMenu>
    <h1>Accueil</h1>
    <p>Bienvenue sur notre site !</p>
  </div>
</template>

<script>
  import AppMenu from './AppMenu.vue';
  
  export default {
    name: 'HomePage',
    components: {
      AppMenu
    }
  }
</script>

  