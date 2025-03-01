function startClicker() {
  let clickerElement;
  let count;
  
  const cookie = document.getElementById("cookie");
  
  let clickTime = null;
  
  const speedClickElement = document.getElementById("clicker__speed");
  
  const getCounter = () => {
    clickerElement = document.getElementById("clicker__counter");
    count = parseInt(clickerElement.textContent);
  }
  
  const updateCounter = () => {
    clickerElement.textContent = count;
  }
  
  getCounter();
  updateCounter();
  
  cookie.onclick = function () {
    const currentTime = new Date();
  
    count++;
    updateCounter();
  
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
}

startClicker();
