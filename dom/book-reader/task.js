class Book {
  constructor(container) {
    this.container = container;
    this.bookContent = container.querySelector(".book__content");
    this.fontSize = Array.from(container.querySelectorAll(".font-size"));
    this.color = Array.from(container.querySelectorAll(".color"));
    this.backgroundColor = Array.from(container.querySelectorAll(".color"));

    this.initBookFont();
    this.initColor();
  }

  initBookFont() {
    this.fontSize.forEach((fontButton) => {
      fontButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.setFontSize(event.currentTarget);
      });
    });
  }

  initColor() {
    this.color.forEach((colorButton) => {
      colorButton.addEventListener("click", (event) => {
        event.preventDefault();
        this.setFontColor(event.currentTarget);
        this.setBackgroundColor(event.currentTarget);
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

  setFontColor(clickedColor) {
    this.color.forEach((fontColorButton) => {
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

  setBackgroundColor(clickedColor) {
    this.color.forEach((bgColorButton) => {
      bgColorButton.classList.remove("color_active");
    });

    clickedColor.classList.add("color_active");

    const color = clickedColor.getAttribute("data-bg-color");

    this.bookContent.classList.remove("book_bg-gray", "book_bg-black");

    if (color === "gray") {
      this.bookContent.classList.add("book_bg-gray");
    } else if (color === "black") {
      this.bookContent.classList.add("book_bg-black");
    }
  }
}

new Book(document.getElementById("book"));
