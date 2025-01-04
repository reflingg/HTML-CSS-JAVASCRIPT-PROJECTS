// Select DOM elements
const todoInput = document.getElementById("todoInput");
const addTaskButton = document.getElementById("addTaskButton");
const todoList = document.getElementById("todoList");

// Load tasks from localStorage when the app starts
document.addEventListener("DOMContentLoaded", loadTasks);

// Add a new task when the button is clicked
addTaskButton.addEventListener("click", addTask);

// Function to add a new task
function addTask() {
  const task = todoInput.value.trim(); // Remove unnecessary spaces

  // Check if the input is empty
  if (task === "") {
    alert("Please enter a task!");
    return;
  }

  // Add the task to the list
  createTaskElement(task);

  // Save the task in localStorage
  saveTask(task);

  // Clear the input field
  todoInput.value = "";
}

// Function to create a task element and add it to the DOM
function createTaskElement(task, completed = false) {
  const li = document.createElement("li");
  li.textContent = task;

  if (completed) {
    li.classList.add("completed");
  }

  // Add click listener to toggle completion
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTaskStatus(task, li.classList.contains("completed"));
  });

  // Add delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTask(task);
    li.remove();
  });

  li.appendChild(deleteButton);
  todoList.appendChild(li);
}

// Function to save a task to localStorage
function saveTask(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to get tasks from localStorage
function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(({ task, completed }) => {
    createTaskElement(task, completed);
  });
}

// Function to update task status in localStorage
function updateTaskStatus(taskToUpdate, completed) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.map((task) =>
    task.task === taskToUpdate ? { ...task, completed } : task
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Function to delete a task from localStorage
function deleteTask(taskToDelete) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.filter((task) => task.task !== taskToDelete);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
