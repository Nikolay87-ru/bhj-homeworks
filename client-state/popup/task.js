function showModal() {
  const modal = document.getElementById("subscribe-modal");
  const closeButton = document.querySelector(".modal__close_times");

  document.addEventListener("DOMContentLoaded", () => {
    modal.classList.add("modal_active");
  });

  closeButton.addEventListener("click", () => {
    modal.classList.remove("modal_active");
  })
}

showModal();