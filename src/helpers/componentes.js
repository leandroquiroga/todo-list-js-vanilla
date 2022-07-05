import { Todo } from './../class/classes';
import { todoList } from './../index';

// Reference to a element;
const ul             = document.querySelector('.todo-list'); 
const inputTodo      = document.querySelector('.new-todo');
const btnDeleteTodos = document.querySelector('.clear-completed');
const ulFilters      = document.querySelector('.filters');
const todoCount      = document.querySelector('.todo-count'); 
let total            = document.querySelector('#count');

// const anclaSelected  = document.querySelectorAll('filtro');

export const countTaskTotal = () => {
  total.textContent = JSON.parse(localStorage.getItem('todo')).length;
};


export const createTodoHTML = (todo) => {

  let li = document.createElement('li');
  let divView = document.createElement('div');
  let inputToggle = document.createElement('input');
  let label = document.createElement('label');
  let button = document.createElement('button');
  let inputEdit = document.createElement('input')


  //li
  li.className = (`${(todo.complete)? 'completed' : ''}`);
  li.id = todo.id;

  //div
  divView.classList.add('view');

  //input 
  inputToggle.classList.add('toggle');
  inputToggle.type = 'checkbox';
  inputToggle.checked =  (`${(todo.complete)? true : ''}`);

  //label
  label.textContent = todo.task;

  //button 
  button.classList.add('destroy');


  //Insert elements in divView
  divView.appendChild(inputToggle);
  divView.appendChild(label);
  divView.appendChild(button);

  //input
  inputEdit.classList.add('edit');
  inputEdit.value = 'Create to TodoMNV templete';
  
  // Insert the element divView to the elemente li
  li.appendChild(divView);
  li.appendChild(inputEdit);


  // Insert li to parent node 
  ul.appendChild(li);


  return ul;
};

//Events

inputTodo.addEventListener('keyup', (e) => {
  
  // Press enter and create a new todo
  if (e.keyCode === 13 && e.target.value.length > 0) {
    const newTodo = new Todo(e.target.value);
    // Add a new todo
    todoList.newTodo(newTodo);
    // Clean the input
    inputTodo.value = '';
    createTodoHTML(newTodo);
    countTaskTotal()
    return
  };
  inputTodo.classList.add('new-todo-error');
});


ul.addEventListener('click', (e) => {

  const nameElementCurrent = e.target.localName;
  const parentElementTodo = e.target.parentElement.parentElement;
  const todoID = parentElementTodo.getAttribute('id');


  // Check that current element is the same as input and complete a todo
  if (nameElementCurrent.includes('input')) {
    todoList.toggleTodo(todoID);
    parentElementTodo.classList.toggle('completed');
    
  } else if (nameElementCurrent.includes('button')) {
    // Check that current element is the same as button and delete a todo 
    todoList.deleteTodo(todoID);
    countTaskTotal()
    parentElementTodo.parentNode.removeChild(parentElementTodo)
  };
});


btnDeleteTodos.addEventListener('click', () => {
  todoList.deleteAllTodo();
  countTaskTotal()
  for (let i = ul.children.length - 1; i >= 0; i--){
    const element = ul.children[i];
    if (element.classList.contains('completed')) {
      ul.removeChild(element);
    };
  };
  todoCount.children[1].textContent = 'All(s)'
});

ulFilters.addEventListener('click', (e) => {
  const filter = e.target.text;
  if (!filter) return;
  for (const element of ul.children) {
    element.classList.remove('hidden');
    const complete = element.classList.contains('completed');
    switch (filter) {
      case 'All':
        countTaskTotal();
        todoCount.children[1].textContent = 'All(s)'
        break;
      case 'Pendients':
        if (complete) {
          let count = 0
          element.classList.add('hidden');
          for (let totalPendients of ul.children) {
            if (!totalPendients.classList.contains('completed', 'hidden')) {
              count++
            };
          }; 
          total.textContent = count;
        };
        todoCount.children[1].textContent = 'Pendient(s)'
        break;
      case 'Complete':
        if (!complete) {
          let count = 0
          element.classList.add('hidden');
          // total = total.textContent;
            for (let totalCompleted of ul.children) {
              if (totalCompleted.classList.contains('completed')) {
                ++count
              };
            };
            total.textContent = count;
        };
        todoCount.children[1].textContent = 'Complete(s)'
        break;
    };
  }
});