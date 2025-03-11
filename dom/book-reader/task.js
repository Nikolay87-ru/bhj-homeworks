class Book {
  constructor(container) {
    this.container = container;
    this.bookContent = container.querySelector(".book__content");
    this.fontSizeButtons = Array.from(container.querySelectorAll(".book__control_font-size .font-size[data-size]"));
    this.textColorButtons = Array.from(container.querySelectorAll(".book__control_color .color[data-text-color]"));
    this.bgColorButtons = Array.from(container.querySelectorAll(".book__control_background .color[data-bg-color]"));

    this.initButtons();
  }

  initButtons() {
    this.fontSizeButtons.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        this.setFontSize(e.currentTarget);
      });
    });

    this.textColorButtons.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        this.setFontColor(e.currentTarget);
      });
    });

    this.bgColorButtons.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        this.setBackgroundColor(e.currentTarget);
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
    } else if (size === "normal") {
      this.bookContent.classList.add("book_fs-normal");
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

    if (color === "black") {
      this.bookContent.classList.add("book_color-black");
    } else if (color === "gray") {
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

    if (color === "black") {
      this.bookContent.classList.add("book_bg-black");
    } else if (color === "gray") {
      this.bookContent.classList.add("book_bg-gray");
    } else if (color === "white") {
      this.bookContent.classList.add("book_bg-white");
    }
  }
}

new Book(document.getElementById("book"));
