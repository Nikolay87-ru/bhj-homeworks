function showProgressBar() {
  const form = document.getElementById("form");
  const file = document.getElementById("file");
  const progress = document.getElementById("progress");
  const progressText = document.getElementById("progressCounter");
  // progress.value = 0.7;

  form.addEventListener("submit", uploadFile);

  function uploadFile(upload) {
    upload.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");

    xhr.upload.addEventListener("progress", e => {
      const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;
      progress.value = percent;
      progressText.textContent = percent.toFixed(2) + "%";

      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(new FormData(form));
    });
  }
}

showProgressBar();