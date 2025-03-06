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
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    this.setNewWord();
  }

  registerEvents() {
    document.addEventListener("keydown", (event) => {
      if (!this.currentSymbol) return;

      const inputLetter = event.key?.toLowerCase();
      const currentSymbolText = this.currentSymbol.textContent.toLowerCase();

      if (inputLetter === currentSymbolText) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add("symbol_correct");
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol) {
      this.currentSymbol.classList.add("symbol_current");
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert("Победа!");
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  fail() {
    clearInterval(this.timer);

    if (++this.lossElement.textContent === 5) {
      alert("Вы проиграли!");
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  setNewWord() {
    this.currentWord = this.getWord();
    this.renderWord(this.currentWord);
    this.startCountdown();
  }

  getWord() {
    const words = [
        "bob дилан",
        "awesome код",
        "школа netology",
        "hello медвед",
        "kitty кэт",
        "rock энд ролл",
        "канал youtube",
        "вкусный popcorn",
        "cinema продакшн",
        "петрович love пиво",
        "страшный javascript",
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

      if (count <= 0) {
        this.fail();
      }
    }, 1000);
  }
}

new Game(document.getElementById("game"));
