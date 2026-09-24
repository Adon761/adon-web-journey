export const renderTasks = (container, tasks, onDelete) => {
  container.innerHTML = '';

  if (tasks.length === 0) {
    container.innerHTML = `<li style="color: var(--muted); text-align: center; padding: 12px;">No tasks available.</li>`;
    return;
  }

  tasks.forEach(({ id, title, priority }) => { // Destructuring in parameters
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <div>
        <span>${title}</span>
        <span class="tag ${priority}">${priority}</span>
      </div>
      <button class="delete-btn" data-id="${id}">✕</button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => onDelete(id));
    container.appendChild(li);
  });
};

export const updateStatsDisplay = (totalEl, highEl, { total, highPriority }) => { // Object destructuring parameter
  totalEl.textContent = total;
  highEl.textContent = highPriority;
};