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
  const removeButton = document.querySelector(".remove__text-btn");
  const userText = document.getElementById("editor");

  removeButton.addEventListener("click", (event) => {
    if (event.currentTarget) {
      userText.value = "";
      return;
    }
  });
}

removeText();

saveTextEditor();
