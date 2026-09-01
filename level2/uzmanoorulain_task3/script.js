// ===========================
// TaskFlow To-Do App
// ===========================

// Select Elements

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");
const totalCount = document.getElementById("totalCount");

const pendingText = document.getElementById("pendingText");
const completedText = document.getElementById("completedText");

const searchInput = document.getElementById("searchInput");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

const toast = document.getElementById("toast");

const clearCompleted = document.getElementById("clearCompleted");

const currentDate = document.getElementById("currentDate");

// ===========================
// Load Tasks
// ===========================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===========================
// Current Date
// ===========================

currentDate.innerHTML = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

// ===========================
// Add Task
// ===========================

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    showToast("Please enter a task");
    return;
  }

  const task = {
    id: Date.now(),

    text: text,

    completed: false,

    createdAt: new Date().toLocaleString(),

    completedAt: null,
  };

  tasks.unshift(task);

  saveTasks();

  renderTasks();

  taskInput.value = "";

  showToast("✅ Task Added");
}

// ===========================
// Render Tasks
// ===========================

function renderTasks() {
  pendingTasks.innerHTML = "";

  completedTasks.innerHTML = "";

  let filteredTasks = tasks;

  const searchValue = searchInput.value.toLowerCase();

  if (searchValue) {
    filteredTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(searchValue),
    );
  }

  const pending = filteredTasks.filter((task) => !task.completed);

  const completed = filteredTasks.filter((task) => task.completed);

  // Pending

  if (pending.length === 0) {
    pendingTasks.innerHTML = emptyMessage("📝", "No pending tasks");
  } else {
    pending.forEach((task) => {
      pendingTasks.innerHTML += createTaskCard(task);
    });
  }

  // Completed

  if (completed.length === 0) {
    completedTasks.innerHTML = emptyMessage("🎉", "No completed tasks yet");
  } else {
    completed.forEach((task) => {
      completedTasks.innerHTML += createTaskCard(task);
    });
  }

  updateStats();
}

// ===========================
// Create Task Card
// ===========================

function createTaskCard(task) {
  return `

<div class="task-card">


<h3 class="task-title">

${task.completed ? "✓ " : "☐ "}
${task.text}

</h3>



<p class="task-time">

Added:
${task.createdAt}

</p>



${
  task.completed
    ? `

<p class="task-time">

Completed:
${task.completedAt}

</p>

`
    : ""
}



<div class="task-actions">


<button 
class="complete-btn"
onclick="toggleComplete(${task.id})">

${task.completed ? "Undo" : "Complete"}

</button>



<button 
class="edit-btn"
onclick="editTask(${task.id})">

Edit

</button>



<button 
class="delete-btn"
onclick="deleteTask(${task.id})">

Delete

</button>


</div>


</div>

`;
}

// ===========================
// Toggle Complete
// ===========================

function toggleComplete(id) {
  const task = tasks.find((task) => task.id === id);

  task.completed = !task.completed;

  if (task.completed) {
    task.completedAt = new Date().toLocaleString();
  } else {
    task.completedAt = null;
  }

  saveTasks();

  renderTasks();

  showToast(task.completed ? "🎉 Task Completed" : "Task moved back");
}

// ===========================
// Delete Task
// ===========================

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();

  renderTasks();

  showToast("🗑 Task Deleted");
}

// ===========================
// Edit Task
// ===========================

function editTask(id) {
  const task = tasks.find((task) => task.id === id);

  const updatedText = prompt("Edit your task:", task.text);

  if (updatedText && updatedText.trim()) {
    task.text = updatedText.trim();

    saveTasks();

    renderTasks();

    showToast("✏ Task Updated");
  }
}

// ===========================
// Update Statistics
// ===========================

function updateStats() {
  const pending = tasks.filter((task) => !task.completed).length;

  const completed = tasks.filter((task) => task.completed).length;

  const total = tasks.length;

  pendingCount.innerText = pending;

  completedCount.innerText = completed;

  totalCount.innerText = total;

  pendingText.innerText = `${pending} pending`;

  completedText.innerText = `${completed} completed`;

  updateProgress();
}

// ===========================
// Progress Bar
// ===========================

function updateProgress() {
  if (tasks.length === 0) {
    progressFill.style.width = "0%";

    progressPercent.innerText = "0%";

    return;
  }

  const percentage = Math.round(
    (tasks.filter((t) => t.completed).length / tasks.length) * 100,
  );

  progressFill.style.width = percentage + "%";

  progressPercent.innerText = percentage + "%";
}

// ===========================
// Empty Message
// ===========================

function emptyMessage(icon, text) {
  return `

<div class="empty-state">

<h3>${icon}</h3>

<p>${text}</p>

</div>

`;
}

// ===========================
// Local Storage
// ===========================

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===========================
// Toast
// ===========================

function showToast(message) {
  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// ===========================
// Search
// ===========================

searchInput.addEventListener("input", renderTasks);

// ===========================
// Clear Completed
// ===========================

clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);

  saveTasks();

  renderTasks();

  showToast("Completed tasks cleared");
});

// Initial Render

renderTasks();
