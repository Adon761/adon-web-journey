// Initial State
export let state = [];

// Pure Function: Add Item without mutating existing state
export const addTask = (currentState, title, priority) => {
  const newTask = {
    id: Date.now(),
    title,
    priority,
    completed: false
  };
  return [...currentState, newTask]; // Immutability via spread
};

// Pure Function: Remove Item by ID
export const removeTask = (currentState, id) => {
  return currentState.filter(task => task.id !== id);
};

// Derived State Calculations using Reduce & Filter
export const getTaskStats = (currentState) => {
  const total = currentState.length;
  const highPriority = currentState.filter(task => task.priority === 'High').length;

  return { total, highPriority }; // Object shorthand
};