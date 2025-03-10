class Rotator {
  constructor(rotator) {
    this.rotator = rotator;
    this.activeCase = this.rotator.querySelector("[data-active]");
    this.activeCase.style.color = this.activeCase.dataset.color;

    this.initRotators();
  }

  initRotators() {
    const speed = parseInt(this.activeCase.dataset.speed, 10);

    setTimeout(() => {
      this.activateRotators();
      this.initRotators();
    }, speed);
  }

  activateRotators() {
    this.activeCase.removeAttribute("data-active");
    this.activeCase =
      this.activeCase.nextElementSibling || this.rotator.firstElementChild;
    this.activeCase.setAttribute("data-active", "true");

    this.activeCase.style.color = this.activeCase.dataset.color;
  }
}

document.querySelectorAll(".rotator").forEach((rotator) => {
  new Rotator(rotator);
});
