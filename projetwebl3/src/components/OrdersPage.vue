order

<template>
  <div class="CommandePage">
    <AppMenu></AppMenu>
    <br>
    <div class="row">
      <div class="col-6 col-md-3">
        <div class="col">
          <div class="p-3 border bg-light">
            <h5>Commandes/Statistiques</h5>
          </div>
        </div>
        <!-- Afficher les statistiques -->
        <div class="row gx-4 row-cols-1">
          <div class="col">
            <div class="p-3 border bg-light">
              <h5>Total des ventes: {{ sales_amount }} €</h5>
              <h6>Nombre de commandes: {{ sales_nb }}</h6>
              <h6>Germinal 1 ventes: {{ g1_sales }}</h6>
              <h6>Germinal 2 ventes: {{ g2_sales }}</h6>
              <h6>Germinal 3 ventes: {{ g3_sales }}</h6>
              <h6>Germinal 4 ventes: {{ g4_sales }}</h6>
              <h6>Germinal 5 ventes: {{ g5_sales }}</h6>
              <h6>Germinal 6 ventes: {{ g6_sales }}</h6>
              <h6>Germinal 7 ventes: {{ g7_sales }}</h6>
              <h6>Germinal 8 ventes: {{ g8_sales }}</h6>
              <h6>Germinal 9 ventes: {{ g9_sales }}</h6>
              <h6>Germinal 10 ventes: {{ g10_sales }}</h6>
              <h6>Germinal 11 ventes: {{ g11_sales }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppMenu from './AppMenu.vue';

export default {
  name: 'OrdersPage',
  components: {
    AppMenu
  },
  data() {
    return {
      sales_amount: 0,
      sales_nb: 0,
      g1_sales: 0,
      g2_sales: 0,
      g3_sales: 0,
      g4_sales: 0,
      g5_sales: 0,
      g6_sales: 0,
      g7_sales: 0,
      g8_sales: 0,
      g9_sales: 0,
      g10_sales: 0,
      g11_sales: 0
    };
  }
};
</script>
<style scoped>
</style>
