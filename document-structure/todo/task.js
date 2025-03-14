class Todo {
  constructor() {
    this.tasksForm = document.getElementById("tasks__form");
    this.taskInput = document.getElementById("task__input");
    this.tasksList = document.getElementById("tasks__list");

    this.initTasksForm();
  }

  initTasksForm() {
    this.tasksForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newTask = this.taskInput.value;
    
      if (newTask === '') {
          alert('Please enter a task!');
          return;
      }
    
      this.taskInput.value = ''; 
    });
  }

  
}

new Todo();
