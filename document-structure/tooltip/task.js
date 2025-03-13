class Tooltip {
  constructor() {
    this.hasTooltip = Array.from(document.querySelectorAll(".has-tooltip"));

    this.initTooltipElement();
  }

  initTooltipElement() {
    this.hasTooltip.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        this.createTooltip(e.currentTarget);
      });
    });
  }

  createTooltip(clickedText) {
    if (this.activeTooltip?.dataset.element === clickedText || this.activeTooltip) {
      this.activeTooltip.remove();
      return;
    }

    const tooltip = document.createElement("div");

    tooltip.className = "tooltip tooltip_active";
    tooltip.textContent = clickedText.title;
    tooltip.dataset.element = clickedText;

    const tooltipBox = clickedText.getBoundingClientRect();
    tooltip.style.top = `${tooltipBox.bottom}px`;
    tooltip.style.left = `${tooltipBox.left}px`;

    document.body.append(tooltip);
    this.activeTooltip = tooltip;
  }
}

new Tooltip(document.body);
