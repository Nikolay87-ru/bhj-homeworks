function getData() {
  const loader = document.querySelector(".loader");
  const itemsContainer = document.getElementById("items");
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://students.netoservices.ru/nestjs-backend/slow-get-courses"
  );

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
      loader.classList.remove("loader_active");
      const data = JSON.parse(xhr.response);
      createData(data.response.Valute);
    }
  });

  function createData(valuteData) {
    itemsContainer.innerHTML = "";

    for (const currencyCode in valuteData) {
      const currency = valuteData[currencyCode];

      const item = document.createElement("div");
      item.classList.add("item");

      item.innerHTML = `
        <div class="item__code">${currency.CharCode}</div>
        <div class="item__value">${currency.Value}</div>
        <div class="item__currency">руб.</div>
      `;

      itemsContainer.append(item);
    }
  }

  function saveDataToLocalStorage() {
    const data = {};
    document.querySelectorAll(".items .item").forEach((item) => {
      const codeText = item.querySelector(".item__code").textContent;
      const valueText = item.querySelector(".item__value").textContent;
      const currencyText = item.querySelector(".item__currency").textContent;
      data.push({ code: codeText, value: valueText, currency: currencyText });
    });

    localStorage.setItem("data", JSON.stringify(data));
  }

  function loadDataFromLocalStorage() {
    const savedData = JSON.parse(localStorage.getItem("data")) || [];
    savedData.forEach((data) => {
      createData(data.text);
    });
  }

  xhr.send();
}

getData();
