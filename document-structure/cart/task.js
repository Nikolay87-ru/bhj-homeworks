class Cart {
  constructor() {
    this.product = document.querySelector(".product");
    this.decItem = document.querySelector(".product__quantity-control_dec");
    this.incItem = document.querySelector(".product__quantity-control_inc");
    // this.valueItem = document.querySelectorAll(".product__quantity-value");
    this.counters = [];

    this.initCounters();
  }

  initCounters() {
    this.product.forEach((product) => {
      const id = product.dataset.id;
      this.counters[id] = 1;
      product.querySelector(".product__quantity-value").textContent =
        counters[id];
    });

    this.updateCounters();
  }

  updateCounters() {
    document.addEventListener("click", (e) => {
      const target = e.target;
      const container = target.closest(".product");

      if (!container) return;

      const id = container.dataset.id;
      const decrement = target.classList.contains('product__quantity-control_dec');
      const increment = target.classList.contains('product__quantity-control_inc');

      if (increment) {
        counters[id]++;
      } else if (decrement) {
        counters[id] = Math.max(0, counters[id] - 1);
      }

      const product = document.querySelector(`.product[data-id="${id}"]`);
        if (product) {
            product.querySelector('.product__quantity-value').textContent = counters[id];
        }
    });
  }
}
