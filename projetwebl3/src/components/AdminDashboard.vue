<template>
  <div class="AdminDashboard">
      <AppMenu></AppMenu>
    <h1>Gestion de stock des produits</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Nom du produit</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in list_products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.stock }}</td>
          <td>
            <button class="btn btn-success btn-sm" @click="increaseStock(product.id)">Ajouter</button>
            <button class="btn btn-danger btn-sm" @click="decreaseStock(product.id)" :disabled="product.stock === 0">Enlever</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Stock } from '../manager';
import AppMenu from './AppMenu.vue';


export default {
  name: 'AdminDashboard',
   components: {
      AppMenu
 },
  data() {
    return {
      stock: Stock,
      list_products: Stock.get_list_product()
    };
  },
  methods: {
    increaseStock(id) {
      const product = this.stock.get_prod_by_id(id);
      if (product) {
        product.stock += 1;
      }
    },
    decreaseStock(id) {
      const product = this.stock.get_prod_by_id(id);
      if (product && product.stock > 0) {
        product.stock -= 1;
      }
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f4f4f4;
}

.btn {
  margin: 0 5px;
}
</style>
