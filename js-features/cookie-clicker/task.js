let clickerElement;

let count;

const cookie = document.getElementById("cookie");

let clickTime = null;

const speedClickElement = document.getElementById("clicker__speed");

speedClickElement.textContent = 0;

function getCounter() {
  clickerElement = document.getElementById("clicker__counter");

  count = parseInt(clickerElement.textContent);
}

function showCounter() {
  clickerElement.textContent = count;
}

getCounter();
showCounter();

cookie.onclick = function () {
  const currentTime = new Date();

  count++;
  showCounter();

  if (clickTime) {
    const timeBetweenClick = (currentTime - clickTime) / 1000;
    const clicksPerSecond = (1 / timeBetweenClick).toFixed(2);
    speedClickElement.textContent = clicksPerSecond;
  }

  clickTime = currentTime;

  cookie.width = 210;

  setTimeout(() => {
    cookie.width = 200;
  }, 100);
};
