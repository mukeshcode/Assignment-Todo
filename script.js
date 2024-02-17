const todoText = document.getElementById("todoText");
const addBtn = document.getElementById("addBtn");
const container = document.getElementById("todosContainer");
let cnt = 0;

addBtn.addEventListener("click", handleAddTodo);

function handleAddTodo(event) {
  event.preventDefault();
  const todo = todoText.value;

  if (todo == "") {
    alert("Nothing to add!");
    return;
  }

  renderNewTodo(todo);

  cnt++;
  todoText.value = "";
}

function renderNewTodo(todo) {

  const div = document.createElement("div");
  div.setAttribute("id", "div" + cnt);
  div.setAttribute("class", "todoBox")

  const text = document.createElement("p");
  text.setAttribute("id", "text" + cnt);
  text.setAttribute("class", "todoText");
  text.textContent = todo;

  const btnWrapper = document.createElement("div");
  btnWrapper.setAttribute("class", "btnWrapper")

  const updateBtn = document.createElement("button");
  updateBtn.setAttribute("id", "updateBtn" + cnt);
  updateBtn.setAttribute("class", "todoUpdateBtn");
  updateBtn.textContent = "Update";

  const delBtn = document.createElement("button");
  delBtn.setAttribute("id", "delBtn" + cnt);
  delBtn.setAttribute("class", "todoDelBtn");
  delBtn.textContent = "Delete";

  btnWrapper.appendChild(updateBtn);
  btnWrapper.appendChild(delBtn);

  div.appendChild(text);
  div.appendChild(btnWrapper);

  container.appendChild(div);

  addNewEventListener();
}

// deletion and updation code starts here
let delBtns = document.querySelectorAll(".todoUpdateBtn");
let updateBtns = document.querySelectorAll(".todoUpdateBtn");

function addNewEventListener() {
  updateBtns = document.querySelectorAll(".todoUpdateBtn");
  for (let i = 0; i < updateBtns.length; i++)
    updateBtns[i].addEventListener("click", handleUpdate);

  delBtns = document.querySelectorAll(".todoDelBtn");
  for (let i = 0; i < delBtns.length; i++)
    delBtns[i].addEventListener("click", handleDelete);
}

function handleDelete(event) {
  event.preventDefault();
  let id = extractId(event.target.id);
  container.removeChild(document.getElementById("div" + id));

}

function handleUpdate(event) {
  event.preventDefault();

  let id = extractId(event.target.id);
  const particularTodo = document.getElementById("text" + id);
  particularTodo.setAttribute("contenteditable", "true");
  particularTodo.classList.add("activeTodo");
  setTimeout(() => {
    particularTodo.setAttribute("contenteditable", "false");
    particularTodo.classList.remove("activeTodo")
  }, 10000);
}


// extract id
function extractId(value) {
  let id = ""
  for (let i = value.length - 1; i >= 0; i--) {
    if ((value.charCodeAt(i) >= 97 && value.charCodeAt(i) <= 122) || (value.charCodeAt(i) >= 65 && value.charCodeAt(i) <= 90)) {
      id = value.slice(i + 1);
      break;
    }
  }

  return id;
}