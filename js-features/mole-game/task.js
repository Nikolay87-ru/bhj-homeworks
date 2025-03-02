function getHole(index) {
  return document.getElementById(`hole${index}`);
}

function playGame() {
  const deadElement = document.getElementById("dead");
  const lostElement = document.getElementById("lost");

  let deadMole = parseInt(deadElement.textContent);
  let lostMole = parseInt(lostElement.textContent);

  const updateCounters = () => {
    deadElement.textContent = deadMole;
    lostElement.textContent = lostMole;
  };

  for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    hole.onclick = function () {
      if (!hole.classList.contains("hole_has-mole")) {
        lostMole++;
      } else {
        deadMole++;
      }

      updateCounters();
      resetGame();
    };
  }

  function resetGame() {
    if (deadMole >= 10) {
      alert(`Вы победили!`);
      deadMole = 0;
      deadElement.textContent = "0";
    }

    if (lostMole >= 5) {
      alert(`Вы проиграли!`);
      lostMole = 0;
      lostElement.textContent = "0";
    }
  }
}

playGame();