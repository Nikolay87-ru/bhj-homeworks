let clickerElement;

let count;

const cookie = document.getElementById("cookie");

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
  count++;
  showCounter();

  cookie.width = 210;

  setTimeout(() => {
    cookie.width = 200;
  }, 100);
}







