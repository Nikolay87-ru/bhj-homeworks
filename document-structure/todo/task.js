class Todo {
  constructor() {
    this.tasksForm = document.getElementById("tasks__form");
    this.taskInput = document.getElementById("task__input");
    this.tasksList = document.getElementById("tasks__list");

    this.initTasksForm();
    this.removeInputError();
    this.loadTasksFromLocalStorage();
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

    const removeTask = document.createElement("a");
    removeTask.href = "#";
    removeTask.className = "task__remove";
    removeTask.innerHTML = "&times;";

    removeTask.addEventListener("click", (e) => {
      e.preventDefault();
      taskItem.remove();
      this.saveTasksToLocalStorage();
    });

    this.tasksList.appendChild(taskItem);
    taskItem.appendChild(titleElement);
    taskItem.appendChild(removeTask);
    this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".tasks__list .task").forEach((task) => {
      const taskText = task.querySelector(".task__title").textContent;
      tasks.push({ text: taskText });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
      this.addTask(task.text);
    });
  }
}

new Todo();
