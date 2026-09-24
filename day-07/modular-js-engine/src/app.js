import { state, addTask, removeTask, getTaskStats } from './state.js';
import { renderTasks, updateStatsDisplay } from './ui.js';
import * as StateEngine from './state.js';

// App Controller State
let appState = [...state];

// DOM Element Selectors
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const taskListContainer = document.getElementById('task-list');
const totalCountEl = document.getElementById('total-count');
const highCountEl = document.getElementById('high-count');

// UI Sync Function
const syncUI = () => {
  renderTasks(taskListContainer, appState, handleTaskDelete);
  const stats = getTaskStats(appState);
  updateStatsDisplay(totalCountEl, highCountEl, stats);
};

// Handlers
const handleTaskSubmit = (e) => {
  e.preventDefault();
  const title = input.value.trim();
  const priority = prioritySelect.value;

  if (!title) return;

  appState = addTask(appState, title, priority);
  input.value = '';
  syncUI();
};

const handleTaskDelete = (id) => {
  appState = removeTask(appState, id);
  syncUI();
};

// Event Listeners
form.addEventListener('submit', handleTaskSubmit);

// Initial Render
syncUI();