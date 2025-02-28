let timerElement;

let count;

function getTimer() {
  timerElement = document.getElementById("timer");

  count = parseInt(timerElement.textContent);

  if (count >= 86400) {
    count = 86399;
  } 
}

function getformatTime(seconds) {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;

  return [hh, mm, ss]
    .map((timeElement) => timeElement.toString().padStart(2, "0"))
    .join(":");
}

function showformatTime() {
  timerElement.textContent = getformatTime(count);
}

getTimer();
showformatTime();

const link = document.querySelector("#link");

const countdown = () => {
  count--;

  showformatTime();

  if (count === 0) {
    clearInterval(intervalId);
    alert(`Вы победили в конкурсе!`);
    link.click();
  }
}

const intervalId = setInterval(countdown, 1000);
