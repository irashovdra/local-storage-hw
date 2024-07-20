document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.querySelector(".task-input");
  const addTaskButton = document.querySelector(".task-button");
  const taskList = document.querySelector(".task-list");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    addTaskToDOM(task);
  });

  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const task = { text: taskText, completed: false };
      tasks.push(task);
      addTaskToDOM(task);
      saveTasks();
      taskInput.value = "";
    }
  });

  function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", function () {
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function (e) {
      e.stopPropagation();
      taskList.removeChild(li);
      tasks.splice(tasks.indexOf(task), 1);
      saveTasks();
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
