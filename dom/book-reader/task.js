class Book {
  constructor(container) {
    this.container = container;
    this.bookContent = container.querySelector(".book__content");
    this.fontSizeButtons = Array.from(
      container.querySelectorAll(".book__control_font-size .font-size[data-size]")
    );
    this.textColorButtons = Array.from(
      container.querySelectorAll(".book__control_color .color[data-text-color]")
    );
    this.bgColorButtons = Array.from(
      container.querySelectorAll(
        ".book__control_background .color[data-bg-color]"
      )
    );

    this.initButtons();
  }

  initButtons() {
    this.fontSizeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.setFontSize(e.currentTarget);
      });
    });

    this.textColorButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.setFontColor(e.currentTarget);
      });
    });

    this.bgColorButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.setBackgroundColor(e.currentTarget);
      });
    });
  }

  setFontSize(clickedButton) {
    this.fontSizeButtons.forEach((button) =>
      button.classList.remove("font-size_active")
    );

    clickedButton.classList.add("font-size_active");

    this.bookContent.classList.remove(
      "book_fs-small",
      "book_fs-normal",
      "book_fs-big"
    );

    const sizeButton = clickedButton.dataset.size;

    if (sizeButton === "small") {
      this.bookContent.classList.add("book_fs-small");
    } else if (sizeButton === "normal") {
      this.bookContent.classList.add("book_fs-normal");
    } else if (sizeButton === "big") {
      this.bookContent.classList.add("book_fs-big");
    }
  }

  setFontColor(clickedButton) {
    this.textColorButtons.forEach((button) =>
      button.classList.remove("color_active")
    );

    clickedButton.classList.add("color_active");

    this.bookContent.classList.remove(
      "book_color-black",
      "book_color-gray",
      "book_color-whitesmoke"
    );

    const fontColorButton = clickedButton.dataset.textColor;

    if (fontColorButton === "black") {
      this.bookContent.classList.add("book_color-black");
    } else if (fontColorButton === "gray") {
      this.bookContent.classList.add("book_color-gray");
    } else if (fontColorButton === "whitesmoke") {
      this.bookContent.classList.add("book_color-whitesmoke");
    }
  }

  setBackgroundColor(clickedButton) {
    this.bgColorButtons.forEach((button) =>
      button.classList.remove("color_active")
    );

    clickedButton.classList.add("color_active");

    this.bookContent.classList.remove(
      "book_bg-black",
      "book_bg-gray",
      "book_bg-white"
    );

    const bgColorButton = clickedButton.dataset.bgColor;

    if (bgColorButton === "black") {
      this.bookContent.classList.add("book_bg-black");
    } else if (bgColorButton === "gray") {
      this.bookContent.classList.add("book_bg-gray");
    } else if (bgColorButton === "white") {
      this.bookContent.classList.add("book_bg-white");
    }
  }
}

new Book(document.getElementById("book"));
