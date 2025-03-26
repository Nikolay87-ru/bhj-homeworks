function showModal() {
  const modal = document.getElementById("subscribe-modal");
  const closeButton = document.querySelector(".modal__close_times");

  document.addEventListener("DOMContentLoaded", () => {
    modal.classList.add("modal_active");
  });

  closeButton.addEventListener("click", () => {
    modal.classList.remove("modal_active");

    setCookie("modalClosed", "true", 30);
  });

  const setCookie = (name, value, days) => {
    expirationDate = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};expiration-date=${expirationDate};path=/`;
  }
}

showModal();
