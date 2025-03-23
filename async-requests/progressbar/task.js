function showProgressBar() {
  const form = document.getElementById("form");
  const progress = document.getElementById("progress");
  const progressText = document.getElementById("progressCounter");

  form.addEventListener("submit", uploadFile);

  function uploadFile(upload) {
    upload.preventDefault();

    const xhr = new XMLHttpRequest();
    const formData = new FormData(form);

    progress.style.width = '0%';
    progress.value = 0;
    progressText.textContent = '0%';

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");

    xhr.upload.addEventListener("progress", e => {
      if (e.lengthComputable) {
        const percent = (e.loaded / e.total) * 100;
        progress.value = percent; 
        progress.style.width = `${percent}%`; 
        progressText.textContent = percent.toFixed(2) + "%";
      }
    });
    xhr.send(formData);
  }
}

showProgressBar();