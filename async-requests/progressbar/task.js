function showProgressBar() {
  const form = document.getElementById("form");
  const progress = document.getElementById("progress");
  const progressText = document.getElementById("progressCounter");
  const progressBar = document.querySelector(".progress-bar");
  const divLoadIsComplite = document.createElement("div");

  form.addEventListener("submit", uploadFile);

  function uploadFile(upload) {
    upload.preventDefault();

    const xhr = new XMLHttpRequest();
    const formData = new FormData(form);

    progress.style.width = "0%";
    progress.value = 0;
    progressText.textContent = "0%";

    divLoadIsComplite.className = "message";
    divLoadIsComplite.innerHTML = ``;

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        progress.value = percent;
        progress.style.width = `${percent}%`;
        progressText.textContent = percent.toFixed(2) + "%";
      }
      showMessage(progress.style.width);
    });

    function showMessage(progressDone) {
      if (progressDone === "100%") {
        divLoadIsComplite.innerHTML = `<span>Ваш файл успешно загружен!</span>`;
        progressBar.parentNode.insertBefore(
          divLoadIsComplite,
          progressBar.nextSibling
        );
        return;
      }
    }
    xhr.send(formData);
  }
}

showProgressBar();
