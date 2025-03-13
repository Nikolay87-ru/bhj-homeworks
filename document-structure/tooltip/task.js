class Tooltip {
  constructor() {
    this.hasTooltip = Array.from(document.querySelectorAll(".has-tooltip"));
    this.tooltip = document.querySelector(".tooltip");

    this.initTooltip();
  }

  initTooltip() {
    this.hasTooltip.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        this.showTooltip(e.currentTarget);
      });
    });
  }

  showTooltip(clickedText) {
    const indexClickedText = this.hasTooltip.indexOf(clickedText);

    if (indexClickedText !== -1) {
      this.tooltip.classList.toggle("tooltip_active");
    }
  }
}

new Tooltip(document.body);

