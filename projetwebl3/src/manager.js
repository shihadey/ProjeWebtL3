class Product {
    constructor(id = "", name = "", desc = "", price = 0, stock = 0) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.stock = stock;
    }
}

class Stock {
    constructor() {
        this.list_product = [];
        this.init();
    }

    get_list_product() {
        return this.list_product;
    }

    get_prod_by_id(id) {
        return this.list_product.find(product => product.id == id) || null;
    }

    init() {
        this.list_product.push(new Product(1, "Germinal 1", "description germinal 1", 10, 10));
        this.list_product.push(new Product(2, "Germinal 2", "description germinal 2", 20, 7));
        this.list_product.push(new Product(3, "Germinal 3", "description germinal 3", 30, 5));
        this.list_product.push(new Product(4, "Germinal 4", "description germinal 4", 40, 9));
        this.list_product.push(new Product(5, "Germinal 5", "description germinal 5", 50, 4));
        this.list_product.push(new Product(6, "Germinal 6", "description germinal 6", 60, 5));
        this.list_product.push(new Product(7, "Germinal 7", "description germinal 7", 70, 3));
        this.list_product.push(new Product(8, "Germinal 8", "description germinal 8", 80, 11));
        this.list_product.push(new Product(9, "Germinal 9", "description germinal 9", 90, 8));
        this.list_product.push(new Product(10, "Germinal 10", "description germinal 10", 100, 5));
        this.list_product.push(new Product(11, "Germinal 11", "description germinal 11", 110, 9));
    }
}

// Creating a singleton instance for Stock
const stockInstance = new Stock();

class Cart {
    constructor() {
        this.list_cart = {};
    }

    get_list_cart() {
        return this.list_cart;
    }

    addInCart(id, stock) {
        const product = stock.get_prod_by_id(id);
        if (product && product.stock > 0) {
            if (this.list_cart[id]) {
                this.list_cart[id]++;
            } else {
                this.list_cart[id] = 1;
            }
            product.stock--;
        }
    }

    removeFromCart(id, stock) {
        const product = stock.get_prod_by_id(id);
        if (product && this.list_cart[id]) {
            this.list_cart[id]--;
            product.stock++;
            if (this.list_cart[id] === 0) {
                delete this.list_cart[id];
            }
        }
    }

    get_nbr_product() {
        return Object.values(this.list_cart).reduce((total, quantity) => total + quantity, 0);
    }

    get_total_price(stock) {
        return Object.entries(this.list_cart).reduce((total, [id, quantity]) => {
            const product = stock.get_prod_by_id(id);
            return total + (product ? product.price * quantity : 0);
        }, 0);
    }
}

export { Product, stockInstance as Stock, Cart };
