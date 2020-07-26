//Selectors
let todoButton = document.querySelector('.todo-button');
let todoInput = document.querySelector('.todo-input');
let todoList = document.querySelector('.todo-list');
let filterOption = document.querySelector('.filter-todo');

//Event listerner
document.addEventListener('DOMContentLoaded', getTodo);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//functions
function addTodo(event) {

  //prevent form submission
  event.preventDefault();

  // creat div
  let todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // creat Li
  let liItem = document.createElement('li');
  liItem.classList.add('todo-item');
  liItem.innerText = todoInput.value;
  todoDiv.append(liItem);

  // save localStorage
  saveTodo(todoInput.value);

  // creat check Button
  let checkButton = document.createElement('button');
  checkButton.classList.add('complete-btn');
  checkButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
  todoDiv.append(checkButton);

  // creat trash Button
  let trashButton = document.createElement('button');
  trashButton.classList.add('trash-btn');
  trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  todoDiv.append(trashButton);

  // append div to ul
  todoList.append(todoDiv);

  // clear input after padding
  todoInput.value = '';
}

function deleteCheck(e) {

  let targetItem = e.target;
  let parentInput = targetItem.closest('.todo');

  // delete todoInput
  if (targetItem.matches('.trash-btn') || targetItem.matches('.fa-trash')) {
    // adding animation in delete functionality
    parentInput.classList.add('animation');
    removeLocalStorage(parentInput);
    // input remove
    parentInput.addEventListener('transitionend', function () {
      parentInput.remove();
    });
  }

  // to check for task completion
  if (targetItem.matches('.complete-btn') || targetItem.matches('.fa-check')) {
    parentInput.classList.toggle('completed');
  }
}

function filterTodo(e) {

  let optionVal = e.target.value;
  let todos = todoList.children;

  for (let val of todos) {

    switch (optionVal) {
      case 'completed':
        if (val.matches('.completed')) {
          val.style.display = 'flex';
        } else {
          val.style.display = 'none';
        }
        break;
      case 'pending':
        if (!val.matches('.completed')) {
          val.style.display = 'flex';
        } else {
          val.style.display = 'none';
        }
        break;
      case 'all':
        val.style.display = 'flex';
        break;
    }
  }
}

// save to localStorage
function saveTodo(todo) {

  let todoArr;

  if (localStorage.getItem('todoArr') == null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(localStorage.getItem('todoArr'));
  }
  todoArr.push(todo);
  localStorage.setItem('todoArr', JSON.stringify(todoArr));
}

// to retrieve localStorage
function getTodo() {

  let todoArr;

  if (localStorage.getItem('todoArr') == null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(localStorage.getItem('todoArr'));
  }

  todoArr.forEach(function(todoVal) {

    // creat div
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // creat Li
    let liItem = document.createElement('li');
    liItem.classList.add('todo-item');
    liItem.innerText = todoVal;
    todoDiv.append(liItem);

    // creat check Button
    let checkButton = document.createElement('button');
    checkButton.classList.add('complete-btn');
    checkButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    todoDiv.append(checkButton);

    // creat trash Button
    let trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    todoDiv.append(trashButton);

    // append div to ul
    todoList.append(todoDiv);
  })
}

// to remove localStorage
function removeLocalStorage(elem) {

  let todoArr;

  if (localStorage.getItem('todoArr') == null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(localStorage.getItem('todoArr'));
  }

  let liItem = elem.children[0].innerText;
  let index = todoArr.indexOf(liItem);
  todoArr.splice(index, 1);
  localStorage.setItem('todoArr', JSON.stringify(todoArr))
}
// localStorage.clear();
