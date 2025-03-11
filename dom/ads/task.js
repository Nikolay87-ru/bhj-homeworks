class Rotator {
  constructor(rotator) {
    this.rotator = rotator;
    this.activeCase = this.rotator.querySelector("[data-active]");
    this.activeCase.style.color = this.activeCase.dataset.color;

    this.initRotator();
  }

  initRotator() {
    const speed = parseInt(this.activeCase.dataset.speed, 10);

    setTimeout(() => {
      this.activateRotator();
      this.initRotator();
    }, speed);
  }

  activateRotator() {
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
