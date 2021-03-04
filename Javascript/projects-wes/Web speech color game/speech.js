import { handleResult } from './handlers.js';

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
