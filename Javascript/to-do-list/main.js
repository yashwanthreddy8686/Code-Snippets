const todoFormEl = document.querySelector('#todo-form');
const todoInputEl = document.querySelector('#todo-input');
const todoListEl = document.querySelector('#todo-list');

function buildUniqueId(prefix) {
    return prefix + '-' + Math.floor(Math.random() * Date.now())
}

function createTask(name) {
    return {
        name,
        id: buildUniqueId('todo')
    }
}

const state = {
    taskName: '',
    tasks: [{
        name: 'Prepare for your interview',
        id: 'todo - 0'
    }]
}

function renderInput() {
    todoInputEl.value = state.taskName;
}

function renderTodoList() {
    const fragment = document.createDocumentFragment();
    state.tasks.forEach(task => {
        const item = buildTodoItemEl(task.id, task.name);
        fragment.appendChild(item);
    });
    while (todoListEl.lastChild) {
        todoListEl.removeChild(todoListEl.lastChild);
    }
    todoListEl.appendChild(fragment);
}

function init() {
    todoFormEl.addEventListener('submit', handleFormSubmit);
    todoInputEl.addEventListener('change', handleInputChange);
    renderInput();
    renderTodoList();
}

function handleInputChange(e) {
    state.taskName = e.target.value
}

function handleFormSubmit(e) {
    e.preventDefault();
    state.tasks = [...state.tasks, createTask(state.taskName)];
    state.taskName = '';
    renderInput();
    renderTodoList();
}

function buildTodoItemEl(id, name) {
    const item = document.createElement('li');
    const spanEl = document.createElement('span');
    const textNode = document.createTextNode(name);

    spanEl.appendChild(textNode);
    item.id = id;
    item.appendChild(spanEl);
    item.appendChild(buildDeleteButtonEl(id));

    return item;
}

function buildDeleteButtonEl(id) {
    const button = document.createElement('button');
    const textContent = document.createTextNode('Delete');

    button.setAttribute('type', 'button')
    button.addEventListener('click', handleTodoDeleteButtonClick.bind(null, id));
    button.appendChild(textContent);

    return button;
}

function handleTodoDeleteButtonClick(id) {
    state.tasks = state.tasks.filter(task => task.id != id);
    renderTodoList();
}

document.addEventListener('DOMContentLoaded', init);