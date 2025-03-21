function getPoll() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
      const dataPool = JSON.parse(xhr.response);
      createPoll(dataPool.data);
    }
  });

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

  initModalMessage();
}

function initModalMessage() {
  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.append(overlay);
  }

  let modal = document.querySelector('.modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<p>Спасибо, ваш голос засчитан!</p>`;
    document.body.append(modal);

    const buttonClose = document.createElement("button");
    buttonClose.className = "close-btn";
    buttonClose.textContent = `Закрыть`;
    modal.append(buttonClose);

    buttonClose.addEventListener("click", closeMessage);
    overlay.addEventListener("click", closeMessage);
  }

  const answerButtons = document.querySelectorAll(".poll__answer");
  answerButtons.forEach((button) => {
    button.addEventListener("click", openMessage);
  });

  function openMessage() {
    modal.classList.add("modal_active");
    overlay.classList.add("overlay_active");
  }

  function closeMessage() {
    modal.classList.remove("modal_active");
    overlay.classList.remove("overlay_active");
  }
}

getPoll();
