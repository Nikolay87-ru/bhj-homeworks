class Product {
  constructor(productItem, cart) {
    this.product = productItem;
    this.incButton = productItem.querySelector(".product__quantity-control_inc");
    this.decButton = productItem.querySelector(".product__quantity-control_dec");
    this.removeButtone = productItem.querySelector(".product__remove");
    this.productQuantity = productItem.querySelector(".product__quantity-value");
    this.productAddToCart = productItem.querySelector(".product__add");
    this.image = productItem.querySelector(".product__image").src;
    this.value = 1;
    this.id = productItem.dataset.id;
    this.cart = cart;

    this.initCounter();
  }

  initCounter() {
    this.updateCounter();
    this.initEvents();
  }

  initEvents() {
    this.incButton.addEventListener("click", () => this.changeValue(1));
    this.decButton.addEventListener("click", () => this.changeValue(-1));
    this.productAddToCart.addEventListener("click", () => this.addToCart());
  }

  changeValue(num) {
    this.value = Math.max(1, this.value + num);
    this.updateCounter();
  }

  updateCounter() {
    this.productQuantity.textContent = this.value;
  }

  addToCart() {
    this.cart.addProduct(this.id, this.image, this.value);
  }
}

class CreateCart {
  constructor() {
    this.items = {};
    this.cartContainer = document.querySelector(".cart__products");
    this.cartProduct = document.querySelector(".cart__product");
  }

  addProduct(id, imageSrc, quantity) {
    if (this.items[id]) {
      this.items[id].count += quantity;
      this.items[id].element.querySelector(".cart__product-count").textContent =
        this.items[id].count;
    } else {
      const cartProduct = this.createCartProduct(id, imageSrc, quantity);
      this.cartContainer.append(cartProduct);
      this.items[id] = {
        element: cartProduct,
        count: quantity,
      };
    }
  }

  createCartProduct(id, imageSrc, quantity) {
    const cartProduct = document.createElement("div");
    cartProduct.className = "cart__product";
    cartProduct.dataset.id = id;

    const img = document.createElement("img");
    img.className = "cart__product-image";
    img.src = imageSrc;

    const buttonRemove = document.createElement("div");
    buttonRemove.className = "product__remove";
    buttonRemove.innerHTML = "Удалить";
    this.removeProduct(id);

    const count = document.createElement("div");
    count.className = "cart__product-count";
    count.textContent = quantity;

    cartProduct.append(img, buttonRemove, count);
    return cartProduct;
  }

  removeProduct(id) {
    this.removeButtone.addEventListener("click", () => {
      if (this.items[id]) {
        this.items[id].element.remove();
        delete this.items[id];
      }
    });
  }
}

class CompliteCart {
  constructor() {
    this.cart = new CreateCart();
    this.products = document.querySelectorAll(".product");

    this.initializeProducts();
  }

  initializeProducts() {
    this.products.forEach((productItem) => {
      new Product(productItem, this.cart);
    });
  }
}

new CompliteCart();