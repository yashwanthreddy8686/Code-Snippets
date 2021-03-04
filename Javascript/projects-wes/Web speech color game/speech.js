import { handleResult } from './handlers.js';
import { colorByLength, isDark } from './colors.js';

const colorsEl = document.querySelector('.colors');

function displayColors(colors) {
  return colors
    .map(
      (color) =>
        `<span class="color ${color} ${
          isDark(color) ? 'dark' : ''
        }"style="background:${color}">${color}</span>`
    )
    .join('');
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function start() {
  if (!('SpeechRecognition' in window)) {
    console.log('sorry. your browser doesnt support SR ');
  }
  // make a new recognition
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = handleResult;
  recognition.start();
}

start();
colorsEl.innerHTML = displayColors(colorByLength);
