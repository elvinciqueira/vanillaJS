const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

let ticketPrice = parseInt(movieSelect.value);

//save selected movie and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSets', JSON.stringify(seatsIndex));

  const seletedSeatsCount = selectedSeats.length;

  count.innerText = seletedSeatsCount;
  total.innerText = seletedSeatsCount * ticketPrice;
}

movieSelect.addEventListener('change', e => {
  ticketPrice = parseInt(e.target.value);

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//seat click event
container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});
