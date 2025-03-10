class Rotator {
  constructor(rotator) {
    this.rotator = rotator;
    this.activeCase = this.rotator.querySelector("[data-active]");
    this.activeCase.style.color = this.activeCase.dataset.color;
    // this.activeCase.style.speed = parseInt(this.activeCase.dataset.speed, 10);

    this.initRotators();
  }

  initRotators() {
    window.addEventListener("load", () => this.activateRotators());
  }

  activateRotators() {
    const switchCase = () => {
      this.activeCase.removeAttribute("data-active");
      this.activeCase =
        this.activeCase.nextElementSibling || this.rotator.firstElementChild;
      this.activeCase.setAttribute("data-active", "true");

      this.activeCase.style.color = this.activeCase.dataset.color;

      const speed = parseInt(this.activeCase.dataset.speed, 10);
      setTimeout(switchCase, speed);
    };

    switchCase();
  }
}

document.querySelectorAll(".rotator").forEach((rotator) => {
  new Rotator(rotator);
});
