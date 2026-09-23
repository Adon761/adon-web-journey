// DOM Elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const type = document.getElementById('type');
const filter = document.getElementById('filter');

// LocalStorage State Initialization
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add New Transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please enter both a description and an amount.');
    return;
  }

  const rawAmount = parseFloat(amount.value);
  const finalAmount = type.value === 'expense' ? -Math.abs(rawAmount) : Math.abs(rawAmount);

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: finalAmount,
    type: type.value
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();

  text.value = '';
  amount.value = '';
}

// Generate Random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add Transaction to DOM List
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    <span>${transaction.text}</span>
    <div>
      <span>${sign}₹${Math.abs(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">✕</button>
    </div>
  `;

  list.appendChild(item);
}

// Update Balance, Income, and Expense Totals
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  balance.innerText = `₹${parseFloat(total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  money_plus.innerText = `+₹${parseFloat(income).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  money_minus.innerText = `-₹${parseFloat(expense).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
}

// Remove Transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

// Filter List Display
function filterTransactions() {
  const filterValue = filter.value;
  list.innerHTML = '';

  let filtered = transactions;
  if (filterValue === 'income') {
    filtered = transactions.filter(t => t.amount > 0);
  } else if (filterValue === 'expense') {
    filtered = transactions.filter(t => t.amount < 0);
  }

  if (filtered.length === 0) {
    list.innerHTML = '<p class="empty-msg">No transactions found.</p>';
  } else {
    filtered.forEach(addTransactionDOM);
  }
}

// Update LocalStorage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize App State
function init() {
  list.innerHTML = '';
  filter.value = 'all';

  if (transactions.length === 0) {
    list.innerHTML = '<p class="empty-msg">No transactions added yet.</p>';
  } else {
    transactions.forEach(addTransactionDOM);
  }

  updateValues();
}

// Event Listeners
form.addEventListener('submit', addTransaction);

// App Start
init();