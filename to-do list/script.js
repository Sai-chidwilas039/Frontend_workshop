const form = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");
const template = document.querySelector("#list-item-template");
const list = document.querySelector(".list");
const filterSection = document.querySelector(".filter-section");

const LOCAL_STORAGE_PREFIX = "ADVANCE_TODO_LIST";
const TODO_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;

let todoList = getTodo();

renderAllTodo();

list.addEventListener("change", function (e) {
  if (!e.target.matches("[data-list-item-checkbox]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todoList.find((t) => t.id == todoId);
  todo.isCompleted = e.target.checked;
  console.log(todo);
  saveTodo();
  if (activeFilterRole) {
    showFilteredTodos();
  }
});

list.addEventListener("click", function (e) {
  if (!e.target.matches(".delete-todo")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove();

  todoList = todoList.filter((t) => t.id != todoId);
  saveTodo();
});

let selectedEditTodo = null;
list.addEventListener("click", function (e) {
  if (!e.target.matches(".edit-todo")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  selectedEditTodo = todoList.find((t) => t.id == todoId);
  todoInput.value = selectedEditTodo.name;
  document.querySelector('button[type="submit"]').innerText = "Update";
  form.querySelector("#todo-input").focus();
});

function editTodoFunk(newValue) {
  todoList = todoList.map((todo) => {
    if (todo.id == selectedEditTodo.id) {
      return {
        ...todo,
        name: newValue,
      };
    } else return todo;
  });

  const todoOnDom = document.querySelector(
    `[data-todo-id="${selectedEditTodo.id}"]`
  );
  todoOnDom.querySelector("[data-list-item-text]").innerHTML = newValue;
  saveTodo();
  todoInput.value = "";
  selectedEditTodo = ''
  document.querySelector('button[type="submit"]').innerText = "Submit";

}

function renderAllTodo() {
  todoList.forEach((todo) => {
    renderTodo(todo);
  });
}

let previousFilterElm = null;
let activeFilterRole = "";
filterSection.addEventListener("click", function (e) {
  const target = e.target;
  if (!target.matches("button")) return;

  activeFilterRole = target.getAttribute("data-role");
  showFilteredTodos();

  if (previousFilterElm !== null) {
    previousFilterElm.classList.remove("active-filter");
  }

  previousFilterElm = target;

  target.classList.add("active-filter");
  console.log(target);
});

function showFilteredTodos() {
  if (activeFilterRole === "all") {
    list.innerHTML = "";
    todoList.forEach((todo) => {
      renderTodo(todo);
    });
  } else if (activeFilterRole === "active") {
    list.innerHTML = "";

    const activeTodos = todoList.filter((todo) => !todo.isCompleted);
    activeTodos.forEach((todo) => {
      renderTodo(todo);
    });
  } else if (activeFilterRole === "completed") {
    list.innerHTML = "";

    const completedTodos = todoList.filter((todo) => todo.isCompleted);
    completedTodos.forEach((todo) => {
      renderTodo(todo);
    });
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!todoInput.value) return;

  if (selectedEditTodo) {
    editTodoFunk(todoInput.value);
    return;
  }

  const newTodo = {
    id: new Date().valueOf(),
    name: todoInput.value,
    isCompleted: false,
  };

  todoList.push(newTodo);
  renderTodo(newTodo);
  saveTodo();
  todoInput.value = "";
});

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = todo.id;
  const todoText = templateClone.querySelector("[data-list-item-text]");
  todoText.innerText = todo.name;
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]");
  checkbox.checked = todo.isCompleted;

  list.appendChild(templateClone);
}

function saveTodo() {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todoList));
}

function getTodo() {
  const list = localStorage.getItem(TODO_STORAGE_KEY);
  return JSON.parse(list) || [];
}

function renderEmptyMessage(msg) {
  const pElm = document.createElement("p");
  pElm.classList.add("empty-msg");
  pElm.textContent = msg;
  list.appendChild(pElm);
}
