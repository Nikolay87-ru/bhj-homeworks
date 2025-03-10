class Book {
  constructor(container) {
    this.container = container;
    this.bookContent = container.querySelector(".book__content");
    this.fontSize = Array.from(container.querySelectorAll(".font-size"));
    this.fontColor = Array.from(container.querySelectorAll(".color"));

    this.initBookFont();
    this.initBookColor();
    this.initBackgroundColor();
  }

  initBookFont() {
    this.fontSize.forEach((fontButton) => {
      fontButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.setFontSize(event.currentTarget);
      });
    });
  }

  initBookColor() {
    this.fontColor.forEach((colorButton) => {
      colorButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.setFontColor(event.currentTarget);
      });
    });
  }

  initBackgroundColor() {

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

  setFontColor(clickedColor) {
    this.fontSize.forEach((fontColorButton) => {
      fontColorButton.classList.remove("color_active");
    });

    clickedColor.classList.add("color_active");

    const color = clickedColor.getAttribute("data-text-color");

    this.bookContent.classList.remove("book_color-gray", "book_color-whitesmoke");

    if (color === "gray") {
      this.bookContent.classList.add("book_color-gray");
    } else if (color === "whitesmoke") {
      this.bookContent.classList.add("book_color-whitesmoke");
    }
  }
}

new Book(document.getElementById("book"));
