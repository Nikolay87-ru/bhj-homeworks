function getAuthFormValues() {
  const signinForm = document.getElementById('signin__form');
  signinForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(signinForm);
    const login = formData.get('login');
    const password = formData.get('password');

    sendToServer(login, password);
  });
}

function sendToServer(login, password) {
  const data = `login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`;

  sendRequest({
    method: 'POST',
    url: 'https://students.netoservices.ru/nestjs-backend/auth',
    data: data,
    onSuccess: () => {
      showWelcomeMessage(response.user_id);
    },
    onError: (error) => showMessage(error, true)
});
}

function showWelcomeMessage(userId) {
  const signin = document.querySelector('.signin');
  const welcome = document.querySelector('.welcome');
  const userIDSpan = document.getElementById('user_id');
  
  signin.classList.remove('signin_active');
  welcome.classList.add('welcome_active');
  userIDSpan.textContent = userId;
}

// function showMessage(message) {
//   alert(message);
// }

function sendRequest({ method, url, data, onSuccess, onError }) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
          onSuccess?.(xhr.response);
      } else {
          onError?.(`Ошибка ${xhr.status}: ${xhr.statusText}`);
      }
  });

  xhr.addEventListener('error', () => onError?.('Ошибка сети'));
  xhr.addEventListener('abort', () => onError?.('Запрос прерван'));

  if (method === 'POST') {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(data);
  } else {
      xhr.send();
  }
}

getAuthFormValues();
