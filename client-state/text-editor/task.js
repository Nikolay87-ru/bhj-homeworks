function saveTextEditor() {
  const userText = document.getElementById("editor");

  document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
  });

  window.addEventListener("beforeunload", () => {
    saveToLocalStorage();
  });

  const loadFromLocalStorage = () => {
    userText.value = localStorage.getItem("savedText") || "";
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("savedText", userText.value);
  };
}

function removeText() {
  const removeButton = document.getElementById("remove__text-btn");
  const userText = document.getElementById("editor");

  removeButton.addEventListener("click", () => {
    userText.value = "";
    localStorage.removeItem("savedText"); 
  });
}

removeText();

saveTextEditor();
