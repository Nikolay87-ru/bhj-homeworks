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

function showMessage(message, isError = false) {
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');
  const modalMessage = document.getElementById('modal-message');
  
  modalMessage.textContent = message;
  modal.classList.add('modal_active');
  overlay.classList.add('overlay_active');

  if (isError) {
      modal.classList.add('modal_error');
  }
}

function setupModal() {
  let modal = document.querySelector('.modal');
  let overlay = document.querySelector('.overlay');

  if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal';
      modal.id = 'modal';
      modal.innerHTML = `
          <p id="modal-message"></p>
          <button class="close-btn">Закрыть</button>
      `;
      document.body.append(modal);
  }

  if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.id = 'overlay';
      document.body.append(overlay);
  }

  const closeModal = () => {
      modal.classList.remove('modal_active', 'modal_error');
      overlay.classList.remove('overlay_active');
  };

  modal.querySelector('.close-btn').addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
}

function getPoll() {
  sendRequest({
      method: 'GET',
      url: 'https://students.netoservices.ru/nestjs-backend/poll',
      onSuccess: (response) => {
          if (!response?.data) throw new Error('Неверный формат ответа');
          createPoll({
              id: response.id,
              title: response.data.title,
              answers: response.data.answers,
          });
      },
      onError: (error) => showMessage(error, true)
  });
}

function createPoll(pollData) {
  const pollTitle = document.getElementById('poll__title');
  const pollAnswers = document.getElementById('poll__answers');
  
  pollTitle.textContent = pollData.title;
  pollAnswers.innerHTML = '';

  pollData.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.className = 'poll__answer';
      button.textContent = answer;
      button.addEventListener('click', () => sendVote(pollData.id, index));
      pollAnswers.append(button);
  });
}

function sendVote(pollId, index) {
  sendRequest({
      method: 'POST',
      url: 'https://students.netoservices.ru/nestjs-backend/poll',
      data: `vote=${pollId}&answer=${index}`,
      onSuccess: (response) => {
          showPollResults(response.stat);
          showMessage('Спасибо, ваш голос засчитан!');
      },
      onError: (error) => showMessage(error, true)
  });
}

function showPollResults(stats) {
  const pollAnswers = document.getElementById('poll__answers');
  pollAnswers.innerHTML = '';
  pollAnswers.classList.add('poll__answers_active');

  const total = stats.reduce((sum, stat) => sum + stat.votes, 0);
  
  stats.forEach(stat => {
      const percent = total > 0 
          ? ((stat.votes / total) * 100).toFixed(2) 
          : 0;
      const result = document.createElement('div');
      result.className = 'poll__result';
      result.textContent = `${stat.answer}: ${percent}%`;
      pollAnswers.append(result);
  });
}

setupModal();
getPoll();