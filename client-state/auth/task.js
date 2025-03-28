function checkAuthorization() {
  const userId = localStorage.getItem("user_id");
  const signin = document.getElementById("signin");

  signin.classList.remove("signin_active");

  if (userId) {
    showWelcomeMessage(userId);
  } else {
    signin.classList.add("signin_active");
  }
}

function getLoginFormValues() {
  const signInForm = document.getElementById("signin__form");
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(signInForm);
    const login = formData.get("login");
    const password = formData.get("password");

    sendToServer(login, password);
  });
}

function sendToServer(login, password) {
  const data = `login=${encodeURIComponent(
    login
  )}&password=${encodeURIComponent(password)}`;

  sendRequest({
    method: "POST",
    url: "https://students.netoservices.ru/nestjs-backend/auth",
    data: data,
    onSuccess: (response) => {
      if (response.success) {
        const signInForm = document.getElementById("signin__form");
        signInForm.reset();
        localStorage.setItem("user_id", response.user_id);
        showWelcomeMessage(response.user_id);
      } else {
        showModalMessage("Неверный логин/пароль");
      }
    },
    onError: () => showModalMessage("Введите логин/пароль"),
  });
}

function showWelcomeMessage(userId) {
  const signin = document.querySelector(".signin");
  const welcome = document.querySelector(".welcome");
  const userIdSpan = document.getElementById("user_id");

  signin.classList.remove("signin_active");
  welcome.classList.add("welcome_active");
  userIdSpan.textContent = userId;
}

function showModalMessage(message) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const modalMessage = document.getElementById("modal-message");
  const closeBtn = modal.querySelector(".close-btn");

  modalMessage.textContent = message;

  modal.classList.add("modal_active");
  overlay.classList.add("overlay_active");

  const closeModal = () => {
    modal.classList.remove("modal_active");
    overlay.classList.remove("overlay_active");
  };

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
}

function sendRequest({ method, url, data, onSuccess, onError }) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.responseType = "json";

  xhr.addEventListener("load", () => {
    onSuccess?.(xhr.response);
  });

  xhr.addEventListener("error", () => onError?.("Ошибка сети"));
  xhr.addEventListener("abort", () => onError?.("Запрос прерван"));

  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
}

checkAuthorization();

getLoginFormValues();
