function getData() {
  const loader = document.querySelector(".loader");
  const currencyCache = "currencyCache";

  const cache = localStorage.getItem(currencyCache);
  if (cache) {
    createData(JSON.parse(cache));
  }

  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://students.netoservices.ru/nestjs-backend/slow-get-courses"
  );

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE) {
      const data = JSON.parse(xhr.response).response.Valute;
      localStorage.setItem(currencyCache, JSON.stringify(data));
      createData(data);
    }
    loader.classList.remove("loader_active");
  });

  xhr.send();
}

function createData(valuteData) {
  const itemsContainer = document.getElementById("items");
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

getData();
