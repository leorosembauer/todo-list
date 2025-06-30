const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

let tasks = [];

// Carrega tarefas salvas ao iniciar
window.onload = () => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
};

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

clearBtn.addEventListener("click", () => {
  if (confirm("Tem certeza que deseja remover todas as tarefas?")) {
    tasks = [];
    saveAndRender();
  }
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, done: false });
  taskInput.value = "";
  saveAndRender();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("completed");

    li.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      saveAndRender();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveAndRender();
    });

    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });

  // contador de tarefas
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pending = total - done;

  const countDiv = document.getElementById("taskCount");
  countDiv.textContent = `Pendentes: ${pending} | Concluídas: ${done}`;
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
