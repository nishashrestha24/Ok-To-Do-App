// app.js

// DOM Elements
const loginSection = document.getElementById('loginSection');
const genderSelection = document.getElementById('genderSelection');
const userForm = document.getElementById('userForm');
const todoSection = document.getElementById('todoSection');
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const dogImage = document.getElementById('dogImage');
const bell = new Audio('bell.mp3');

let currentTheme = '';

// Login handling
document.getElementById('loginBtn').addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  if (username) {
    localStorage.setItem('username', username);
    document.getElementById('greeting').textContent = `Hi ${username},`; 
    loginSection.style.display = 'none';
    genderSelection.style.display = 'block';
  }
});

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const gender = document.querySelector('input[name="gender"]:checked').value;
  setTheme(gender);
});

function setTheme(gender) {
  if (gender === 'girl') {
    document.body.className = 'girl-theme';
    currentTheme = 'girl';
  } else {
    document.body.className = 'boy-theme';
    currentTheme = 'boy';
  }
  genderSelection.style.display = 'none';
  todoSection.style.display = 'block';
  dogImage.style.display = 'block';
  loadTasks();
}

addTodoBtn.addEventListener('click', () => {
  const task = todoInput.value.trim();
  const date = document.getElementById('datePicker').value;
  if (task !== '') {
    const li = document.createElement('li');
    li.innerHTML = `${task} <small>${date}</small> <button class="done">✔</button>`;
    todoList.appendChild(li);
    saveTask(task, date);
    scheduleNotification(task);
    todoInput.value = '';
    document.getElementById('datePicker').value = '';
  }
});

todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('done')) {
    const taskItem = e.target.parentElement;
    deleteTask(taskItem.textContent);
    taskItem.remove();
  }
});

function saveTask(task, date) {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.push({ task, date });
  localStorage.setItem('tasks', JSON.stringify(saved));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(({ task, date }) => {
    const li = document.createElement('li');
    li.innerHTML = `${task} <small>${date}</small> <button class="done">✔</button>`;
    todoList.appendChild(li);
  });
}

function deleteTask(taskText) {
  let saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved = saved.filter(t => !taskText.includes(t.task));
  localStorage.setItem('tasks', JSON.stringify(saved));
}

function scheduleNotification(task) {
  setTimeout(() => {
    bell.play();
    alert(`🛎 Reminder: ${task}`);
  }, 5000);
}

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('✅ Service Worker Registered'))
    .catch(error => console.error('Service Worker registration failed:', error));
}
