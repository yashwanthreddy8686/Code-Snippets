const jokeButton = document.querySelector('.getJoke');
const displayJoke = document.querySelector('.joke p');
const endPoint = 'https://icanhazdadjoke.com';

const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

async function fetchJoke(endpoint) {
  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

function randomItemFromArray(arr, not) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === not) {
    return randomItemFromArray(arr, not);
  }
  return item;
}

async function handleClick() {
  const { joke } = await fetchJoke(endPoint);
  displayJoke.textContent = joke;
  jokeButton.textContent = randomItemFromArray(
    buttonText,
    jokeButton.textContent
  );
}

jokeButton.addEventListener('click', handleClick);
