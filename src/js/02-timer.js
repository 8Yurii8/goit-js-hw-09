import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

const timerEl = document.querySelector('.timer');
const fieldEl = document.querySelectorAll('.field');
const valueEl = document.querySelectorAll('.value');

timerEl.style.display = 'flex';
timerEl.style.gap = '20px';
fieldEl.forEach(fieldEl => {
  fieldEl.style.maxWidth = 'min-content';
  fieldEl.style.textAlign = 'center';
});
valueEl.forEach(valueEl => {
  valueEl.style.fontSize = '2rem';
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      startButton.disabled = true;
      Notiflix.Report.warning('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);
startButton.addEventListener('click', () => {
  const selectedDate = datetimePicker.value;
  const currentDate = new Date();
  const endDate = new Date(selectedDate);

  // Calculate the time remaining until the specified date
  const timeRemaining = endDate - currentDate;
  // Convert milliseconds to days, hours, minutes, and seconds
  const time = convertMs(timeRemaining);
  // Update the timer interface
  daysElement.innerText = addLeadingZero(time.days);
  hoursElement.innerText = addLeadingZero(time.hours);
  minutesElement.innerText = addLeadingZero(time.minutes);
  secondsElement.innerText = addLeadingZero(time.seconds);
  // Calculate the time remaining every second
  const interval = setInterval(() => {
    // Calculate the time remaining until the specified date
    const timeRemaining = endDate - new Date();
    // Convert milliseconds to days, hours, minutes, and seconds
    const time = convertMs(timeRemaining);
    // Update the timer interface
    daysElement.innerText = addLeadingZero(time.days);
    hoursElement.innerText = addLeadingZero(time.hours);
    minutesElement.innerText = addLeadingZero(time.minutes);
    secondsElement.innerText = addLeadingZero(time.seconds);
    // Stop the timer when it reaches the end date
    if (timeRemaining <= 1) {
      clearInterval(interval);
    }
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
