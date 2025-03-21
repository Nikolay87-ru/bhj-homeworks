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
}

getPoll();
