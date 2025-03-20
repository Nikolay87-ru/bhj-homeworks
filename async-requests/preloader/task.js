function getData() {
  const loader = document.querySelector(".loader");
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://students.netoservices.ru/nestjs-backend/slow-get-courses"
  );
  
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
      loader.classList.remove("loader_active");
      createData();
    }
  });
  
  function createData() {
    getValues();

    const item = document.querySelector(".item");
    item.innerHTML = `
      <div class="item__code">${code}</div>
      <div class="item__value">${value}</div>
      <div class="item__currency">${currency}</div>
    `;
  }

  const getValues = () => {

  }

  xhr.send();
}

getData();