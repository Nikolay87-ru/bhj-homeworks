class Reveal {
  constructor(container) {
    this.container = container;
    this.reveals = container.querySelectorAll(".reveal");

    this.initReveals();
  }

  initReveals() {
    window.addEventListener("scroll", () => this.showActiveReveals());
    window.addEventListener("load", () => this.showActiveReveals());
  }

  showActiveReveals() {
    this.reveals.forEach((reveal) => {
      const { innerHeight } = window;

      const { top } = reveal.getBoundingClientRect();

      if (top < innerHeight && top > 0) {
        reveal.classList.add("reveal_active");
      } else {
        reveal.classList.remove("reveal_active");
      }
    });
  }
}

new Reveal(document.body);
