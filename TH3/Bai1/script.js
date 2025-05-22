// script.js

let tasks = [];

document.addEventListener("DOMContentLoaded", function () {
  loadTasksFromLocalStorage();

  document.getElementById("add-task-btn").addEventListener("click", addTask);
});

function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Vui lòng nhập nội dung công việc.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    isDone: false
  };

  tasks.push(task);
  saveTasksToLocalStorage();
  renderTasks();

  input.value = "";
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.isDone) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.cursor = "pointer";
    span.addEventListener("click", () => toggleTask(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xóa";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    const actionDiv = document.createElement("div");
    actionDiv.className = "actions";
    actionDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actionDiv);

    list.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, isDone: !task.isDone } : task
  );
  saveTasksToLocalStorage();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToLocalStorage();
  renderTasks();
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
    renderTasks();
  }
}
