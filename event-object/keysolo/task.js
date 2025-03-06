class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector(".word");
    this.winsElement = container.querySelector(".status__wins");
    this.lossElement = container.querySelector(".status__loss");
    this.countdownElement = container.querySelector(".status__time");
    this.currentWord = "";
    this.timer = null;

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    this.updateCountdown();
  }

  registerEvents() {
    document.addEventListener("keydown", (event) => {
      const inputLetter = event.key?.toLowerCase();
      const currentSymbolText = this.currentSymbol.textContent;

      if (inputLetter === currentSymbolText) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    // clearInterval(this.timer);
    if (this.currentSymbol.classList.contains("symbol_current"))
      this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add("symbol_correct");
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add("symbol_current");
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert("Победа!");
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    clearInterval(this.timer);
    if (++this.lossElement.textContent === 5) {
      alert("Вы проиграли!");
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    this.currentWord = this.getWord();
    this.renderWord(this.currentWord);
    // this.updateCountdown();
    this.startCountdown();
  }

  getWord() {
    const words = [
        "bob",
        "awesome",
        "netology",
        "hello",
        "kitty",
        "rock",
        "youtube",
        "popcorn",
        "cinema",
        "love",
        "javascript",
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? "symbol_current" : ""}">${s}</span>`
      )
      .join("");
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector(".symbol_current");
  }

  updateCountdown() {
    this.countdownElement.textContent = this.currentWord.length;
  }

  startCountdown() {
    clearInterval(this.timer);

    let count = this.currentWord.length;
    this.countdownElement.textContent = count;

    this.timer = setInterval(() => {
      count--;
      this.countdownElement.textContent = count;

      if (count === 0) {
        this.fail();
        clearInterval(this.timer);
      }
    }, 1000);
  }
}

new Game(document.getElementById("game"));
