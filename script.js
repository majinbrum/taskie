// TODO: COLOR THEME
const colorMode_btn = document.querySelector(".color-mode");
colorMode_btn.addEventListener("click", function () {
  const html = document.querySelector("html");
  const colorMode_btnicon = document.querySelector(".color-mode i");
  html.classList.toggle("light-mode");
  html.classList.toggle("dark-mode");
  colorMode_btnicon.classList.toggle("fa-moon");
  colorMode_btnicon.classList.toggle("fa-lightbulb");
});

// TODO: LOCAL STORAGE
const STORAGE_KEY = "dailyTasks";
const dailyTasksList = localStorage.getItem;

let dailyTasks = [];

const storage = localStorage.getItem(STORAGE_KEY);
if (storage) {
  dailyTasks = JSON.parse(storage);
}

// TODO: ELEMENTS OF THE PAGE
// * Popup menu
const newTask_btn = document.querySelector(".new-btn");
const newTask_menu = document.querySelector(".new-task-menu");
const newTask_close = document.querySelector(".new-task-menu .close-icon");

// * Single task
const addTask_inputTitle = document.querySelector(".new-task-title");
const addTask_btn = document.querySelector(".add-task-btn");

// * Task list
const dailyTasks_list = document.querySelector(".daily-list");
const resetList_btn = document.querySelector(".reset-list-btn");

// TODO: CHECK FIRST WHAT TO SHOW
checkContent();

// TODO: OPEN POPUP MENU
newTask_btn.addEventListener("click", function () {
  newTask_menu.classList.add("popup");
});

// TODO: CLOSE POPUP MENU
newTask_close.addEventListener("click", function () {
  newTask_menu.classList.remove("popup");
});

// TODO: CREATE NEW TASK AND PUSH IT IN THE TASK LIST ARRAY -> STORAGE
addTask_btn.addEventListener("click", function () {
  const newTask_title = addTask_inputTitle.value;
  dailyTasks.push(newTask_title);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dailyTasks));

  addTask_inputTitle.value = "";
  newTask_menu.classList.remove("popup");

  checkContent();
});

// TODO: CHECK CONTENT TO SHOW FROM THE LOCAL STORAGE
function checkContent() {
  dailyTasks_list.innerHTML = "";
  if (dailyTasks.length == 0) {
    addTask_HTMLtemplate("Add some tasks!");
  } else {
    dailyTasks.forEach(function (dailyTask) {
      addTask_HTMLtemplate(dailyTask);
    });
  }
}

// TODO: CREATE A TASK DIV (HTML)
function addTask_HTMLtemplate(task_title) {
  const newTask_template = document.createElement("div");
  newTask_template.classList.add("task");
  newTask_template.innerHTML = `
  <h3 class="task-title">${task_title}</h3>
  <button class="check-icon">
  <i class="fa-solid fa-check"></i>
  </button>
  `;

  dailyTasks_list.appendChild(newTask_template);
}

// TODO: RESET TASK LIST
resetList_btn.addEventListener("click", function () {
  if (window.confirm("Do you really want to reset the task list?")) {
    dailyTasks = [];
    localStorage.clear(STORAGE_KEY, JSON.stringify(dailyTasks));

    checkContent();
  } else {
    return;
  }
});
