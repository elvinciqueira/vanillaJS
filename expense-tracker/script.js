const balance = document.querySelector('#balance');
const moneyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transactions = dummyTransactions;

const addTransaction = event => {
  event.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: parseInt(amount.value)
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    text.value = '';
    amount.value = '';
  }
};

const generateId = () => {
  return Math.floor(Math.random() * 100000000);
};

const addTransactionDOM = transaction => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const itemElement = document.createElement('li');

  const classValue = transaction.amount < 0 ? 'minus' : 'plus';
  itemElement.classList.add(classValue);

  itemElement.innerHTML = `
    ${transaction.text} 
      <span>
        ${sign}${Math.abs(transaction.amount)}
      </span>
      <button 
        class="delete-btn" 
        onclick="removeTransaction(${transaction.id})"
      >
        x
     </button>
  `;

  list.appendChild(itemElement);
};

const updateValues = () => {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
};

const init = () => {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);

  updateValues();
};

const removeTransaction = id => {
  transactions = transactions.filter(transaction => transaction.id !== id);

  init();
};

init();

form.addEventListener('submit', addTransaction);
