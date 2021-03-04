import { isValidColor } from './colors.js';

function logwords(results) {
  console.log(results[results.length - 1][0].transcript);
}
export function handleResult({ results }) {
  // logwords(results);
  const words = results[results.length - 1][0].transcript;
  let color = words.toLowerCase();
  color = color.replace(/\s/g, '');
  if (!isValidColor(color)) return;
  const colorSpan = document.querySelector(`.${color}`);
  colorSpan.classList.add('got');
  document.body.style.background = color;
}
