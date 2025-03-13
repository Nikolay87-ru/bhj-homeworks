class Tooltip {
  constructor() {
    this.hasTooltip = Array.from(document.querySelectorAll(".has-tooltip"));

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
    const tooltip = document.createElement("div");

    tooltip.className("tooltip tooltip_active");
    tooltip.textContent = clickedText.title;
    tooltip.dataset.element = clickedText;

    document.body.append(tooltip);
    this.activeTooltip = tooltip;
  }
}
new Tooltip(document.body);
