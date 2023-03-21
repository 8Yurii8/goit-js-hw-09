const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');
let timerId = null;

buttonStartEl.addEventListener('click', () => {
  disableButtonStart();
  eneyblButtonEnd();
  timerId = setInterval(() => {
    changeColor();
  }, 1000);
});

buttonStopEl.addEventListener('click', () => {
  eneyblButtonStart();
  disableButtonEnd();
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColor(color) {
  color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}

const disableButtonStart = () => {
  buttonStartEl.disabled = true;
};

const eneyblButtonStart = () => {
  buttonStartEl.disabled = false;
};

const disableButtonEnd = () => {
  buttonStopEl.disabled = true;
};

const eneyblButtonEnd = () => {
  buttonStopEl.disabled = false;
};
