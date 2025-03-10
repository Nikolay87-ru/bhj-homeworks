class Book {
  constructor(container) {
    this.container = container;
    this.bookContent = container.querySelector(".book__content");
    this.fontSize = Array.from(container.querySelectorAll(".font-size"));

    this.initBookFont();
  }

  initBookFont() {
    this.fontSize.forEach((fontButton) => {
      fontButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.setFontSize(event.currentTarget);
      });
    });
  }

  setFontSize(clickedFont) {
    this.fontSize.forEach((fontSizeButton) => {
      fontSizeButton.classList.remove("font-size_active");
    });

    clickedFont.classList.add("font-size_active");

    const size = clickedFont.getAttribute("data-size");

    this.bookContent.classList.remove("book_fs-small", "book_fs-big");

    if (size === "small") {
      this.bookContent.classList.add("book_fs-small");
    } else if (size === "big") {
      this.bookContent.classList.add("book_fs-big");
    }
  }
}

new Book(document.getElementById("book"));
