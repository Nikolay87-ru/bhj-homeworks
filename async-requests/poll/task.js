function getPoll() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
      const dataPool = JSON.parse(xhr.response);
      createPoll(dataPool.data);
    }
  });

  initAnswerSelecting();
  xhr.send();
}

function createPoll(data) {
  const pollTitle = document.querySelector(".poll__title");
  pollTitle.textContent = data.title;

  const pollAnswers = document.getElementById("poll__answers");
  pollAnswers.innerHTML = "";

  data.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "poll__answer";
    button.textContent = answer;
    pollAnswers.append(button);
  });
}

function initAnswerSelecting() {
  answerButtons = document.querySelectorAll(".poll__answer");
  const modal = document.createElement("modal");
  modal.className = "modal";
  modal.innerHTML = `<p>Спасибо, ваш голос засчитан!</p>`;

  const buttonClose = modal.createElement("button");
  buttonClose.className = "close-btn";
  buttonClose.textContent = `Закрыть`;

  const openMessage = () => {
    modal.classList.add("modal_active");
    overlay.classList.add("overlay_active");
  };

  const closeMessage = () => {
    modal.classList.remove("modal_active");
    overlay.classList.remove("overlay_active");
  };

  answerButtons.forEach((button) => {
    button.addEventListener("click", openMessage);
  });

  buttonClose.addEventListener("click", closeMessage);
  overlay.addEventListener("click", closeMessage);
}

getPoll();
