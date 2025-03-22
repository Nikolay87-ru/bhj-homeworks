function getPoll() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
      const dataPool = JSON.parse(xhr.response);
      createPoll({
        id: dataPool.id,
        title: dataPool.data.title,
        answers: dataPool.data.answers,
      });
    }
  });

  xhr.send();
}

function createPoll(pollData) {
  const pollTitle = document.querySelector(".poll__title");
  pollTitle.textContent = pollData.title;

  const pollAnswers = document.getElementById("poll__answers");
  pollAnswers.innerHTML = "";

  pollData.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "poll__answer";
    button.textContent = answer;

    button.addEventListener("click", () => {
      sendVote(pollData.id, index);
    });

    pollAnswers.append(button);
  });

  initModalMessage();
}

function sendVote(pollId, index) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/poll");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.response);
    showPollResults(response.stat);
  });

  xhr.send(`vote=${pollId}&answer=${index}`);
}

function showPollResults(stats) {
  const pollAnswers = document.getElementById("poll__answers");
  pollAnswers.innerHTML = "";

  const totalVotes = stats.reduce((total, stat) => total + stat.votes, 0);

  stats.forEach((stat) => {
    const element = document.createElement("div");
    element.className = "poll__result";

    const percentage =
      totalVotes > 0 ? ((stat.votes / totalVotes) * 100).toFixed(2) : 0;

    element.textContent = `${stat.answer}: ${percentage}%`;
    pollAnswers.append(element);
    pollAnswers.classList.add("poll__answers_active");
  });
}

function initModalMessage() {
  let overlay = document.querySelector(".overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.append(overlay);
  }

  let modal = document.querySelector(".modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "modal";
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
