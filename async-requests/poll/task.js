function getPoll() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
      createPoll();
    }
  });

  xhr.send();
}

function createPoll() {
  const pollTitle = document.querySelector(".poll__title");
  pollTitle.innerHTML = `Как вы относитесь к собакам?`;

  const pollAnswers = document.getElementById("poll__answers");
  pollAnswers.innerHTML = `
    <button class="poll__answer">
      Хорошо
    </button>
    <button class="poll__answer">
      Отлично
    </button>
    <button class="poll__answer">
      Я люблю собак
    </button>
    <button class="poll__answer">
      Кто тут?
    </button>
    `;
}

getPoll();
