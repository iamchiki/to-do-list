//Selectors
let todoButton = document.querySelector('.todo-button');
let todoInput = document.querySelector('.todo-input');
let todoList = document.querySelector('.todo-list');

//Event listerner
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteLiItem);


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

function deleteLiItem(e) {

  let targetItem = e.target;
  let parentInput = targetItem.closest('.todo');

  // delete todoInput
  if (targetItem.matches('.trash-btn') || targetItem.matches('.fa-trash')) {
    parentInput.remove();
  }

  // to check for task completion
  if (targetItem.matches('.complete-btn') || targetItem.matches('.fa-check')) {
    parentInput.classList.toggle('completed');
  }
}
