// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners
document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteCheck);

filterOption.addEventListener('click', filterTodo);

// functions

function addTodo(event) {
  // preventing form button from submitting
  event.preventDefault();

  /// saving the new todo item in the todo file
  // saving it in a local-storage
  // saveLocalTodos(todoInput.value);
  if (!saveLocalTodos(todoInput.value)) {
    return;
  }
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

    // playing the card removing sound on the click
    document.getElementById('remove-sound').play();

    // adding the deleting item transition
    todo.classList.add('fall');

    // removing the local todo from the local-storage
    removeLocalTodos(todo);

    // adding an event-listener - which will wait for the
    // transition effect/animation to complete itself
    // and remove the item component after that
    todo.addEventListener('transitionend', function () {
      // removing the todo after the ending of the 
      // transition effect
      todo.remove();
    });
  }

  // checking condition to check the todo item
  // by checking the click item's class name
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    document.getElementById('complete-sound').play();
    todo.classList.toggle('completed');
  }
}

// creating a function method to implement the filter feature
// to filter the todo items - That is o the basis of All, Completed
// Tasks and Remaining/Uncompleted Tasks

// function filterTodo(e) {
//   const todos = todoList.childNodes;
//   todos.forEach(function(todo) {
//     switch(e.target.value) {
//       case "all":
//         todo.style.display = "flex";
//         break;
//       case "completed":
//         if (todo.classList.contains('completed')) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//         break;
//       case "uncompleted":
//         if (!todo.classList.contains("uncompleted")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//         break;
//       default:
//         console.log("something went wrong! The list items are not working");
//         break;
//     }
//   });
// }

function saveLocalTodos(todo) {
  // check if todo is blank
  if (!todo) return;

  // creating a check - To check the already written
  // data(todo-items) in the local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // check if todo already exists
  let isTodoPresent = todos.filter(oldTodo => oldTodo.toLowerCase() === todo.toLowerCase());
  if (isTodoPresent.length) {
    // show something to notify user
    let validationToast = document.getElementById('validation-toast');
    validationToast.innerHTML = "Todo already exists!";
    validationToast.classList.add('show-toast');
    setTimeout(function () {
      validationToast.classList.remove("show-toast");
      validationToast.innerHTML = "";
    }, 3000);
    return;
  }

  /// pushing a the todo item in the file
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  return true;
}

// creating a feature to implement the todos saved in the local
// storage in the UI of the webpage - Means, Getting the array of save
// data from the local storage to the UI (Todo Item Cards)

function getTodos() {

  // creating a check - To check the already written
  // data(todo-items) in the local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    // Creating a todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Creating a List element to store the todo item
    // in the form of list-item
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo;

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
  });
}

// creating a function to remove localStorage todos
// ones they are deleted by the user
function removeLocalTodos(todo) {

  // creating a check - To check the already written
  // data(todo-items) in the local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // Getting the IndexValue of the element or
  // (todo-items) that has to be removed
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  // after deleting the todo-item, here we need to
  // update the localStorage
  localStorage.setItem('todos', JSON.stringify(todos));
}