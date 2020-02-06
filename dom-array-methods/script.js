const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMillionairesBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateWealthBtn = document.querySelector('#calculate-wealth');

let data = [];

const getRandomUser = async () => {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
};

const doubleMoney = () => {
  data = data.map(user => ({ ...user, money: user.money * 2 }));

  updateDOM();
};

const addData = obj => {
  data.push(obj);

  updateDOM();
};

const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
};

const showMillionaires = () => {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
};

const calculateWealth = () => {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthElement = document.createElement('div');
  wealthElement.innerHTML = `
    <h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;

  main.appendChild(wealthElement);
};

const updateDOM = (providedData = data) => {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(person => {
    const divElement = document.createElement('div');
    divElement.classList.add('person');
    divElement.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;

    main.appendChild(divElement);
  });
};

const formatMoney = number => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
