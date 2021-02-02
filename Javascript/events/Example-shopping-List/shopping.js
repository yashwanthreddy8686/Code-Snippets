const shoppingForm = document.querySelector('.shopping');
const lists = document.querySelector('.list');

let items = [];

function displayItems(e) {
  const html = items
    .map(
      (item) => `
    <li class="shopping-item">
        <input 
        type="checkbox" 
        value=${item.id}
        ${item.complete ? 'checked' : ''}>
        <span class="itemName">${item.name}</span>
        <button 
        aria-label="Remove ${item.name}"
        value=${item.id}
        >&times</button>
    </li>
    `
    )
    .join('');
  lists.innerHTML = html;
}

function submitHandler(e) {
  e.preventDefault();
  console.log('submitted');
  const name = e.currentTarget.item.value;
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false,
  };
  items.push(item);
  console.log(`now, you have ${items.length} your state `);
  e.target.reset();
  lists.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem('items'));
  if (lsItems.length) {
    // items = lsItems;
    // lsItems.forEach((item) => {
    //   items.push(item);
    // });
    items.push(...lsItems);
    lists.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}
function deleteItem(id) {
  items = items.filter((item) => item.id !== id);
  lists.dispatchEvent(new CustomEvent('itemsUpdated'));
}
function markAsComplete(id) {
  const itemRef = items.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;
  lists.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', submitHandler);
lists.addEventListener('itemsUpdated', displayItems);
lists.addEventListener('itemsUpdated', mirrorToLocalStorage);

lists.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    deleteItem(parseInt(e.target.value));
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(parseInt(e.target.value));
  }
});
restoreFromLocalStorage();
