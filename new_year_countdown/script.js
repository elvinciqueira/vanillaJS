const daysElement = document.querySelector('#days');
const hoursElement = document.querySelector('#hours');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');
const countdownElement = document.querySelector('#countdown');
const yearElement = document.querySelector('#year');
const loadingElement = document.querySelector('#loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

yearElement.innerText = currentYear + 1;

function updateCountdown() {
  const currentTime = new Date();
  const difference = newYearTime - currentTime;

  const days = Math.floor(difference / 1000 / 3600 / 24);
  const hours = Math.floor(difference / 1000 / 3600) % 24;
  const minutes = Math.floor(difference / 1000 / 60) % 60;
  const seconds = Math.floor(difference / 1000) % 60;

  daysElement.innerHTML = days;
  hoursElement.innerHTML = hours < 10 ? '0' + hours : hours;
  minutesElement.innerHTML = minutes < 10 ? '0' + minutes : minutes;
  secondsElement.innerHTML = seconds < 10 ? '0' + seconds : seconds;
}

setTimeout(() => {
  loadingElement.remove();

  countdownElement.style.display = 'flex';
}, 1000);

setInterval(updateCountdown, 1000);
