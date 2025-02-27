let timerElement = document.getElementById('timer');

let count = parseInt(timerElement.textContent);

function getformatTime(seconds) {
  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;
  
  return [hh, mm, ss]
      .map(timeElement => timeElement.toString().padStart(2, '0'))
      .join(':');
}

function showformatTime() {
  timerElement.textContent = getformatTime(count);
}

showformatTime()

const countdown = () => {
    count--;
  
    showformatTime();

  if (count === 0) {
    clearInterval(intervalId);
    alert(`Вы победили в конкурсе!`);
  } 
}

const intervalId = setInterval(countdown, 1000);
