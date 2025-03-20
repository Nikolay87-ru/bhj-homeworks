function f1() {
  const loader = document.querySelector(".loader");
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://students.netoservices.ru/nestjs-backend/slow-get-courses"
  );
  
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
      loader.classList.remove("loader_active");
    }
  });
  
  // xhr.onload = function() {
  //   console.log(xhr.status);
  //   console.log(xhr.response);
  //   const data = JSON.parse(xhr.response);
  //   console.log(data);
  // }
  
  xhr.send();
}

f1();