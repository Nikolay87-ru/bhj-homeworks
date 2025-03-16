class Cart {
  constructor(product ) {
    this.product = product;
    this.incButton = productElement.querySelector('.product__quantity-control_inc');
    this.decButton = productElement.querySelector('.product__quantity-control_dec');
    this.productQuantity = productElement.querySelector('.product__quantity-value');
    this.value = 1;

    this.initCounters();
  }

  initCounters() {
  this.updateCounters();

  this.incButton.addEventListener('click', () => this.changeValue(1));
  this.decButton.addEventListener('click', () => this.changeValue(-1));
  }

  changeValue(num) {
    this.value = Math.max(1, this.value + num);
    this.updateCounters();
  }

  updateCounters() {
    this.productQuantity.textContent = this.value;
  }
}

new Cart();
