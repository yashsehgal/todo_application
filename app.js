// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// event listeners
todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteCheck);

filterOption.addEventListener('click', filterTodo);

// functions

function addTodo(event) {
  // preventing form button from submitting
  event.preventDefault();

  // Creating a todo div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Creating a List element to store the todo item
  // in the form of list-item
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-item');
  newTodo.innerText = todoInput.value;

  // appending the newTodo as a child node in 
  // the todo division
  todoDiv.appendChild(newTodo);

  // adding the check mark button for the todo item
  const completedButton = document.createElement('button');
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  // adding the delete(trash) button for the todo item - deletion
  const trashButton = document.createElement('button');
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  // appending the todo list items in the todo-div
  todoList.appendChild(todoDiv);

  // clearing the todoInput(value) to nothing
  // after adding new items 
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // checking condition to delete the todo item
  // by checking the click item's class name
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // adding the deleting item transition
    todo.classList.add('fall');
    // adding an event-listener - which will wait for the
    // transition effect/animation to complete itself
    // and remove the item component after that
    todo.addEventListener('transitionend', function() {
      // removing the todo after the ending of the 
      // transition effect
      todo.remove();
    });
  }

  // checking condition to check the todo item
  // by checking the click item's class name
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

// creating a function method to implement the filter feature
// to filter the todo items - That is o the basis of All, Completed
// Tasks and Remaining/Uncompleted Tasks

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(e.target.value) {
      case "all":
        todo.style.display = "flex";
      case "completed":
        if (todo.classList.contains('completed')) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  })
}