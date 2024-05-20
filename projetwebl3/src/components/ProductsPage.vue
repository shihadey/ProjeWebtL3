<template>
  <div class="IndexPage">
    <AppMenu></AppMenu>
    <br>
    <div class="row">
      <div class="col-md-9">
        <div class="row gx-4 gy-4 row-cols-3">
          <div class="col" v-for="product in list_products" :key="product.id">
            <div class="p-3 border bg-light">
              <h5>{{ product.name }}</h5>
              <p>{{ product.desc }}</p>
              <p>Prix: {{ product.price }} €</p>
              <p>Stock: {{ product.stock }}</p>
              <button
                v-if="product.stock > 0"
                type="button"
                class="btn btn-success btn-sm"
                @click="add_to_cart(product.id)"
                >Ajouter au panier</button>
                <span v-else class="text-danger">En rupture de stock</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Cart -->
      <div class="col-6 col-md-3">
        <div class="col">
          <div class="p-3 border bg-success">
            <h5>Cart</h5>
          </div>
        </div>
        <div class="row gx-4 row-cols-1">
          <div class="col" v-for="(value, id) in list_cart" :key="id">
            <div class="p-3 border bg-light">
              {{ get_info_product(id) }}
              <h5>{{ desc_product.name }}</h5>
              <h6>Quantité: {{ value }}</h6>
              <button type="button" class="btn btn-success btn-sm" @click="remove_from_cart(id)">Supprimer</button>
            </div>
          </div>
          <!-- show total -->
          <div class="col">
            <div class="p-3 border bg-success">
              <h5>Total: {{ total_price }}</h5>
              <h6>Nombre de produits: {{ nbr_product }}</h6>
            </div>
          </div>
          <!-- PayPal button -->
          <div class="col">
            <div class="p-3 border bg-light">
              <div id="paypal-button-container"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import AppMenu from './AppMenu.vue';
import { Stock, Cart } from '../manager';

export default {
  name: 'ProductsPage',
  components: {
    AppMenu
  },
  data() {
    return {
      stock: Stock, 
      cart: new Cart(),
      list_products: Stock.get_list_product(),
      list_cart: {},
      desc_product: {},
      total_price: 0,
      nbr_product: 0,
      paypalLoaded: false
    };
  },
  created() {
    this.loadPaypalScript().then(() => {
      this.update_cart();  
      this.loadPaypal();   
    });
  },
  methods: {
    add_to_cart(id) {
      this.cart.addInCart(id, this.stock);
      this.update_cart();
    },
    get_info_product(id) {
      this.desc_product = this.stock.get_prod_by_id(id) || {};
    },
    update_cart() {
      this.list_cart = this.cart.get_list_cart();
      this.update_total();
    },
    update_total() {
      this.total_price = this.cart.get_total_price(this.stock);
      this.nbr_product = this.cart.get_nbr_product();
    },
    remove_from_cart(id) {
      this.cart.removeFromCart(id, this.stock);
      this.update_cart();
    },
    loadPaypalScript() {
      return new Promise((resolve, reject) => {
        if (document.getElementById('paypal-sdk')) {
          return resolve();
        }
        const script = document.createElement('script');
        script.id = 'paypal-sdk';
        script.src = "https://www.paypal.com/sdk/js?client-id=AXbYB1iR9SmZHCpzpmFYgusi-8_qq8LJ7iYTmbHbtOTeKHzznbtpGArXHY0C14ZLltmEl_2A3mOIzzBF&currency=EUR";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    loadPaypal() {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: this.total_price.toString()
                }
              }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              alert('Transaction completed by ' + details.payer.name.given_name);
            });
          },
          onError: (err) => {
            console.error(err);
          }
        }).render('#paypal-button-container');
        this.paypalLoaded = true;
      }
    }
  }
};
</script>
<style scoped>
</style>