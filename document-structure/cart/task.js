class Counters {
  constructor(productItem) {
    this.product = productItem;
    this.incButton = productItem.querySelector('.product__quantity-control_inc');
    this.decButton = productItem.querySelector('.product__quantity-control_dec');
    this.productQuantity = productItem.querySelector('.product__quantity-value');
    this.value = 1;

    this.initCounter();
  }

  initCounter() {
  this.updateCounter();

  this.incButton.addEventListener('click', () => this.changeValue(1));
  this.decButton.addEventListener('click', () => this.changeValue(-1));
  }

  changeValue(num) {
    this.value = Math.max(1, this.value + num);
    this.updateCounter();
  }

  updateCounter() {
    this.productQuantity.textContent = this.value;
  }
}

class Cart {
  constructor() {
    this.products = document.querySelectorAll('.product');

    this.initAllCounters();
  }

  initAllCounters() {
    this.products.forEach(product => new Counters(product));
  }
}

new Cart();
