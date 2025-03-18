class Product {
  constructor(productItem, cart) {
    this.product = productItem;
    this.incButton = productItem.querySelector(".product__quantity-control_inc");
    this.decButton = productItem.querySelector(".product__quantity-control_dec");
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
    this.cartTitle = document.querySelector(".cart__title");
    this.loadFromLocalStorage();
  }

  addProduct(id, imageSrc, quantity) {
    if (this.items[id]) {
      this.items[id].count += quantity;
      this.items[id].element.querySelector(".cart__product-count").textContent =
        this.items[id].count;
    } else {
      const cartProduct = this.createCartProduct(id, imageSrc, quantity);
      this.cartContainer.append(cartProduct);
      this.items[id] = { element: cartProduct, count: quantity, imageSrc };
    }

    if (Object.keys(this.items).length !== 0) {
      this.cartTitle.classList.add("cart__title_active");
    } else {
      this.cartTitle.classList.remove("cart__title_active");
    }

    this.saveToLocalStorage();
  }

  createCartProduct(id, imageSrc, quantity) {
    const cartProduct = document.createElement("div");
    cartProduct.className = "cart__product";
    cartProduct.dataset.id = id;

    const img = document.createElement("img");
    img.className = "cart__product-image";
    img.src = imageSrc;

    const count = document.createElement("div");
    count.className = "cart__product-count";
    count.textContent = quantity;

    const buttonRemove = document.createElement("div");
    buttonRemove.className = "product__remove";
    buttonRemove.textContent = "Удалить";
    buttonRemove.addEventListener("click", () => this.removeProduct(id));

    cartProduct.append(img, count, buttonRemove);
    return cartProduct;
  }

  removeProduct(id) {
    if (this.items[id]) {
      this.items[id].element.remove();
      delete this.items[id];

      if (Object.keys(this.items).length === 0) {
        this.cartTitle.classList.remove("cart__title_active");
      }

      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    const savedData = {};
    for (const id in this.items) {
      savedData[id] = {
        count: this.items[id].count,
        imageSrc: this.items[id].imageSrc,
      };
    }
    localStorage.setItem("cart", JSON.stringify(savedData));
  }

  loadFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem("cart")) || {};
    for (const id in savedData) {
      const { count, imageSrc } = savedData[id];
      this.addProduct(id, imageSrc, count);
    }
  }
}

class CompleteCart {
  constructor() {
    this.cart = new CreateCart();
    this.initProducts();
  }

  initProducts() {
    document.querySelectorAll(".product").forEach((product) => {
      new Product(product, this.cart);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CompleteCart();
});
