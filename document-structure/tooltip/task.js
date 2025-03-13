class Tooltip {
  constructor() {
    this.hasTooltips = Array.from(document.querySelectorAll(".has-tooltip"));
    this.activeIndex = -1;
    this.activeTooltip = null;

    this.initTooltips();
  }

  initTooltips() {
    this.hasTooltips.forEach((clickedText, index) => {
      clickedText.dataset.tooltipIndex = index;
      clickedText.addEventListener("click", (e) => {
        e.preventDefault();
        this.initTooltipClick(index);
      });
    });
  }

  initTooltipClick(index) {
    if (this.activeIndex === index) {
      this.removeTooltip();
      this.activeIndex = -1;
      return;
    }

    this.removeTooltip();

    this.createTooltip(index);
    this.activeIndex = index;
  }

  createTooltip(index) {
    const tooltip = document.createElement("div");

    tooltip.className = "tooltip tooltip_active";
    tooltip.textContent = element.title;

    const tooltipIndex = this.hasTooltips[index];
    const rect = tooltipIndex.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom}px`;
    tooltip.style.left = `${rect.left}px`;

    document.body.append(tooltip);
    this.activeTooltip = tooltip;
  }

  removeTooltip() {
    if (this.activeTooltip) {
      this.activeTooltip.remove();
      this.activeTooltip = null;
    }
  }
}

new Tooltip();
