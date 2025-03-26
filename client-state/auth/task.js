function checkAuthorization() {
  document.addEventListener("DOMContentLoaded", () => {
    if (response.user_id) {
      showWelcomeMessage(response.user_id);
    }

    setupModal();
  });
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
        showWelcomeMessage(response.user_id);
      } else {
        showMessage("Неверный логин/пароль");
      }
    },
    onError: (error) => showWrongLoginMessage(error),
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

function showWrongLoginMessage(message) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");
  const modalMessage = document.getElementById("modal-message");

  modalMessage.textContent = message;
  modal.classList.add("modal_active");
  overlay.classList.add("overlay_active");

  if (isError) {
    modal.classList.add("modal_error");
  }
}

function setupModal(message) {
  const modal = document.getElementById("modal");
  const overlay = document.getElementById("overlay");

  if (!modal) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal";
    modal.innerHTML = `
          <p id="modal-message">${message}</p>
          <button class="close-btn">Закрыть</button>
      `;
    document.body.append(modal);
  }

  if (!overlay) {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.id = "overlay";
    document.body.append(overlay);
  }

  const closeBtn = modal.querySelector(".close-btn");

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
    if (xhr.status >= 200 && xhr.status < 300) {
      onSuccess?.(xhr.response);
    } else {
      onError?.(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    }
  });

  xhr.addEventListener("error", () => onError?.("Ошибка сети"));
  xhr.addEventListener("abort", () => onError?.("Запрос прерван"));

  if (method === "POST") {
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
  } else {
    xhr.send();
  }
}

checkAuthorization();

setupModal();

getLoginFormValues();
