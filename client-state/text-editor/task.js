function saveTextEditor() {
  const userText = document.getElementById('editor');

  document.addEventListener('DOMContentLoaded', () => {
    userText.value = localStorage.getItem('savedText') || '';
  });

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('savedText', userText.value);
  });
}

function removeText() {

}

removeText();

saveTextEditor();