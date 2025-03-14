class Todo {
  constructor() {
    this.tasksForm = document.getElementById("tasks__form");
    this.taskInput = document.getElementById("task__input");
    this.tasksList = document.getElementById("tasks__list");
    this.button = document.getElementById("tasks__add");

    this.initTasksForm();
    this.removeInputError();
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

      this.addTask(newTask);
    });
  }

  removeInputError() {
    this.taskInput.addEventListener("input", () => {
      if (this.taskInput.value.trim()) {
        this.taskInput.classList.remove("error");
      }
    });
  }

  addTask(task) {
    const taskItem = document.createElement("div");
    taskItem.className = "task";

    const titleElement = document.createElement("div");
    titleElement.className = "task__title";
    titleElement.textContent = task;

    this.tasksList.appendChild(taskItem);
    taskItem.appendChild(titleElement);
  }
}

new Todo();
