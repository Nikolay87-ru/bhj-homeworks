class Tooltip {
  constructor() {
    this.hasTooltip = document.querySelectorAll(".has-tooltip");
    this.tooltip = document.createElement("div");
    this.tooltip.className = "tooltip";
    document.body.appendChild(this.tooltip);
    
    this.activeLink = null;

    this.initTooltip()
  }

  initTooltip() {
    this.hasTooltip.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        this.toggle(link);
      });
    });
  }

  initTooltipClick() {

  }

  createTooltip() {

  }

  removeTooltip() {

  }
}

new Tooltip();
