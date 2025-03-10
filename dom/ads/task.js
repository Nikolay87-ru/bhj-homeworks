class Rotator {
  constructor(rotator) {
    this.rotator = rotator;
    this.cases = Array.from(this.rotator.querySelectorAll(".rotator__case"));
    this.activeCase = this.rotator.querySelector("[data-active]");

    this.initRotators();
  }

  initRotators() {
    window.addEventListener("load", () => this.activateRotators());
  }

  activateRotators() {
    // const isActive = this.activeCase.hasAttribute(
    //   "[data-active]"
    // );

    setInterval(() => {
      // if (isActive) {
      this.activeCase.removeAttribute("data-active");
      this.activeCase =
        this.activeCase.nextElementSibling || this.rotator.firstElementChild;
      this.activeCase.setAttribute("data-active", "true");
      // }
    }, 1000);
  }
}

document.querySelectorAll(".rotator").forEach((rotator) => {
  new Rotator(rotator);
});
