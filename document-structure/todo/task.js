class Todo {
  constructor() {
    this.tasksForm = document.getElementById("tasks__form");
    this.taskInput = document.getElementById("task__input");
    this.tasksList = document.getElementById("tasks__list");

    this.initTasksForm();
  }

  initTasksForm() {
    this.tasksForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newTask = this.taskInput.value.trim();

      if (!newTask) {
        this.taskInput.classList.add("error");
        return;
      }

      this.taskInput.classList.remove("error");
      this.taskInput.value = "";
    });

    this.taskInput.addEventListener("input", () => {
      if (this.taskInput.value.trim()) {
        this.taskInput.classList.remove("error");
      }
    });
  }

  addTask(task) {
    const listItem = document.createElement("li");
    const taskText = document.createElement("span");
    listItem.textContent = task;

    todoList.appendChild(listItem);
  }
}

new Todo();
