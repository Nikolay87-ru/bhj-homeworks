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
  pollTitle.innerHTML = `${data.title}`;

  const pollAnswers = document.getElementById("poll__answers");

  for (const answer in data.answers) {
    const answers = data.answers[answer];

    const item = document.createElement("button");
    item.classList.add("poll__answer");
    pollAnswers.append(item);
    pollAnswers.innerHTML = `${answers}`;
  }
}

getPoll();
