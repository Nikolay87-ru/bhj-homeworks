class Tooltip {
  constructor() {
    this.hasTooltip = document.querySelectorAll(".has-tooltip");
    this.tooltip = document.createElement("div");
    this.tooltip.className = "tooltip";
    document.body.append(this.tooltip);

    this.activeLink = null;

    this.initTooltip();
  }

  initTooltip() {
    this.hasTooltip.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggle(link);
      });
    });
  }

  toggle(link) {
    if (this.activeLink === link) {
      this.hideTooltip();
    } else {
      this.showTooltip(link);
    }
  }

  showTooltip(link) {
    this.hideTooltip();
    this.tooltip.textContent = link.title;
    const rect = link.getBoundingClientRect();
    this.tooltip.style.cssText = `
      top: ${rect.bottom}px;
      left: ${rect.left}px;
    `;
    this.tooltip.classList.add("tooltip_active");
    this.activeLink = link;
  }

  hideTooltip() {
    this.tooltip.classList.remove("tooltip_active");
    this.activeLink = null;
  }
}

new Tooltip();
