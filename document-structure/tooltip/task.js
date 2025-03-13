class Tooltip {
  constructor(container) {
    this.container = container;
    this.hasTooltip = Array.from(document.querySelectorAll(".has-tooltip"));
    this.tooltip = document.querySelector(".tooltip");

    this.initTooltip();
  }

  initTooltip() {
    this.hasTooltip.forEach((click) => {
      click.addEventListener("click", (e) => {
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

document.querySelectorAll(".has-tooltip").forEach((tooltipContainer) => {
  new Tooltip(tooltipContainer);
});
