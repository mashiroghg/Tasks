// Task-Funktionen
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('addbutton');
const taskList = document.getElementById('task-list');

// Tasks laden/speichern
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Task hinzufügen
function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    const tasks = getTasks();
    const newTask = {
      id: Date.now(),
      text,
      completed: false
    };

    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks();
    taskInput.value = '';
  }
}

// Tasks anzeigen
function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = tasks.map(task => `
    <li class="task-item" data-id="${task.id}">
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      <button class="change-btn">✏️</button>
      <button class="info-btn">ℹ️</button>
      <button class="delete-btn">🗑️</button>
    </li>
  `).join('');

  // Event Listener für Checkboxen
  document.querySelectorAll('.task-item input').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const taskId = parseInt(this.parentElement.dataset.id);
      const tasks = getTasks();
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = this.checked;
        saveTasks(tasks);
        this.nextElementSibling.classList.toggle('completed');
      }
    });
  });

  // Event Listener für Delete-Buttons
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const taskId = parseInt(this.parentElement.dataset.id);
      const tasks = getTasks().filter(t => t.id !== taskId);
      saveTasks(tasks);
      renderTasks();
    });
  });

//event für denn info button der das ertell datum anzeigen soll in der deutschne zeit
    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', function () {
        const taskId = parseInt(this.parentElement.dataset.id);
        const tasks = getTasks();
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            const createdDate = new Date(task.id);
            alert(`Task erstellt am: ${createdDate.toLocaleString('de-DE')}`);
        }
        });
    });
  
    

  // ✅ Event Listener für Change-Buttons (Bearbeiten)
  document.querySelectorAll('.change-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const taskId = parseInt(this.parentElement.dataset.id);
      const tasks = getTasks();
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        const newText = prompt('Edit the Task:', task.text);
        if (newText !== null) {
          task.text = newText.trim();
          saveTasks(tasks);
          renderTasks();
        }
      }
    });
  });
}

// Event Listener
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Initial laden
if (localStorage.getItem('currentUser')) {
  renderTasks();
}
