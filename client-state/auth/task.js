function getAuthFormValues() {
  const signinForm = document.getElementById('signin__form');
  signinForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.querySelector('input[name="login"]').value;
    const password = document.querySelector('input[name="password"]').value;

    sendToServer(username, password);
  });
}

function sendToServer(username, password) {
  const signin = document.querySelector('.signin');
  const welcome = document.querySelector('.welcome');

  sendRequest({
    method: 'POST',
    url: 'https://students.netoservices.ru/nestjs-backend/auth',
    data: `login=${username}&password=${password}`,
    onSuccess: () => {
      signin.classList.remove('signin_active');
      welcome.classList.add('welcome_active');
    },
    onError: (error) => showMessage(error, true)
});
}

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
