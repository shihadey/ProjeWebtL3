<template>
  <div id="app">
    <AppMenu></AppMenu>
    <router-view/>
  </div>
</template>

<script>
  // import IndexPage from './components/IndexPage.vue';
  import AppMenu from './components/AppMenu.vue';
  // import AppMenu from './components/AppMenu.vue';

  export default {
    name: 'App',
    components: {
      AppMenu
    }
  }
</script>

<style>
</style>