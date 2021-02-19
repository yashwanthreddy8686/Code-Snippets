const baseEndpoint = 'http://www.recipepuppy.com/api';
const proxy = `https://cors-anywhere.herokuapp.com/`;
const form = document.querySelector('form.search');
const recipeGrid = document.querySelector('.recipes');

async function fetchRecipes(query) {
  const res = await fetch(`${proxy}${baseEndpoint}?q=${query}`);
  const data = await res.json();
  return data;
}

function displayRecipes(recipes) {
  console.log('creating HTML');
  const html = recipes.map(
    (recipe) => `<div class="recipe">
        <h2>${recipe.title}</h2>
        <p>${recipe.ingredients}</p>
        ${
          recipe.thumbnail &&
          `<img src="${recipe.thumbnail}" alt="${recipe.title}">`
        }
        </div>`
  );
  recipeGrid.innerHTML = html.join('');
}

async function handleSubmit(e) {
  e.preventDefault();
  const el = e.currentTarget;
  console.log(el.query.value);
  el.submit.disabled = true;
  const recipes = await fetchRecipes(el.query.value);
  console.log(recipes);
  el.submit.disabled = false;
  displayRecipes(recipes.results);
}

form.addEventListener('submit', handleSubmit);

// fetchRecipes('pizza');
