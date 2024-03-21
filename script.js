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

// TODO: LOCAL STORAGE 1
const STORAGE_KEY1 = "dailyTasks";
const dailyTasksList = localStorage.getItem;

let dailyTasks = [];

const storage_daily = localStorage.getItem(STORAGE_KEY1);
if (storage_daily) {
  dailyTasks = JSON.parse(storage_daily);
}

// TODO: LOCAL STORAGE 2
const STORAGE_KEY2 = "dailyTasks_checked";
const dailyTasksList_checked = localStorage.getItem;

let dailyTasks_checked = [];

const storage_daily_checked = localStorage.getItem(STORAGE_KEY2);
if (storage_daily_checked) {
  dailyTasks_checked = JSON.parse(storage_daily_checked);
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
const dailyTasks_HTML = document.querySelector(".daily-list");
const dailyTasksCompleted_HTML = document.querySelector(".daily-list-completed");
// * Reset task list + dialog
const resetList_btn = document.querySelector(".reset-list-btn");
const resetList_dialog = document.querySelector(".reset-list-dialog");
const resetList_confirm = document.querySelector(".confirm-reset");
const resetList_cancel = document.querySelector(".cancel-reset");
// * Trash list + dialog
const trash_btn = document.querySelector(".trash-btn");
const trash_dialog = document.querySelector(".trash-dialog");
const trash_confirm = document.querySelector(".confirm-trash");
const trash_cancel = document.querySelector(".cancel-trash");

// TODO: CHECK FIRST WHAT TO SHOW
checkTaskList();
checkCompletedTaskList();
checkTaskCount();

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
  const newTask_title = addTask_inputTitle.value.trim();
  if (newTask_title.length > 0) {
    dailyTasks.push(newTask_title);
    localStorage.setItem(STORAGE_KEY1, JSON.stringify(dailyTasks));

    addTask_inputTitle.value = "";
    newTask_menu.classList.remove("popup");

    checkTaskList();
    checkTaskCount();
  }
});

// TODO: CHECK TASK LIST TO SHOW FROM THE LOCAL STORAGE1
function checkTaskList() {
  dailyTasks_HTML.innerHTML = "";

  if (dailyTasks.length > 0) {
    dailyTasks.forEach(function (dailyTask) {
      addTask_HTMLtemplate(dailyTask);
      activate_checkButtons();
      resetList_btn.style.display = "block";
    });
  } else {
    addTask_HTMLtemplate("Add some tasks!");
    resetList_btn.style.display = "none";
  }
}

// TODO: CHECK COMPLETED TASK LIST TO SHOW FROM THE LOCAL STORAGE2
function checkCompletedTaskList() {
  dailyTasksCompleted_HTML.innerHTML = "";
  if (dailyTasks_checked.length > 0) {
    dailyTasks_checked.forEach(function (dailyTask_checked) {
      completedTask_HTMLtemplate(dailyTask_checked);
    });
  } else {
    completedTask_HTMLtemplate("Complete some tasks!");
    trash_btn.style.display = "none";
  }
}

// TODO: CHECK BUTTONS OF EACH TASK
function activate_checkButtons() {
  const check_btns = document.querySelectorAll(".check-btn");
  check_btns.forEach(function (check_btn, index) {
    check_btn.addEventListener("click", function () {
      const dailyTask_checked = dailyTasks.splice(index, 1)[0];
      console.log(index);

      const dailyTasks_checked = JSON.parse(localStorage.getItem(STORAGE_KEY2) || "[]");
      dailyTasks_checked.push(dailyTask_checked);

      localStorage.setItem(STORAGE_KEY1, JSON.stringify(dailyTasks));
      localStorage.setItem(STORAGE_KEY2, JSON.stringify(dailyTasks_checked));

      completedTask_HTMLtemplate(dailyTask_checked);

      checkTaskList();
      trash_btn.style.display = "block";

      checkTaskCount();
    });
  });
}

// TODO: CREATE A TASK DIV (HTML)
function addTask_HTMLtemplate(task_title) {
  const newTask_template = document.createElement("div");
  newTask_template.classList.add("task");
  newTask_template.innerHTML = `
  <h3 class="task-title">${task_title}</h3>
  <button class="check-btn">
  <i class="fa-solid fa-check"></i>
  </button>
  `;

  dailyTasks_HTML.appendChild(newTask_template);
}

// TODO: CREATE A COMPLETED TASK DIV (HTML)
function completedTask_HTMLtemplate(completedtask_title) {
  const completedTask_template = document.createElement("div");
  completedTask_template.classList.add("task");
  completedTask_template.classList.add("checked");
  completedTask_template.innerHTML = `
  <h3 class="task-title">${completedtask_title}</h3>
  <button class="check-btn">
  <i class="fa-solid fa-check"></i>
  </button>
  `;
  dailyTasksCompleted_HTML.appendChild(completedTask_template);
}

// TODO: RESET TASK LIST
resetList_btn.addEventListener("click", function () {
  resetList_dialog.showModal();
});

resetList_confirm.addEventListener("click", function () {
  dailyTasks = [];
  localStorage.setItem(STORAGE_KEY1, JSON.stringify(dailyTasks));
  checkTaskList();

  checkTaskCount();
  resetList_dialog.close();
});

resetList_cancel.addEventListener("click", function () {
  resetList_dialog.close();
});

// TODO: TRASH LIST
trash_btn.addEventListener("click", function () {
  trash_dialog.showModal();
});

trash_confirm.addEventListener("click", function () {
  dailyTasks_checked = [];
  localStorage.setItem(STORAGE_KEY2, JSON.stringify(dailyTasks_checked));
  checkCompletedTaskList();

  checkTaskCount();
  trash_dialog.close();
});

trash_cancel.addEventListener("click", function () {
  trash_dialog.close();
});

// TODO: TASKIE
function checkTaskCount() {
  const taskieAvatar = document.querySelector(".header-img img");
  const headerTitle = document.querySelector("header h2");
  const headerText = document.querySelector("header h4");

  if (dailyTasks.length <= 3) {
    taskieAvatar.src = "img/supataskie.png";
    headerTitle.textContent = "OMG YOU ROCK!!";
    headerText.textContent = "No tasks onsight, keep it up!";
  }

  if (dailyTasks.length > 3 && dailyTasks.length <= 6) {
    taskieAvatar.src = "img/sorridentetaskie.png";
    headerTitle.textContent = "You got this!";
    headerText.textContent = "Cmon hooman, just do it!";
  }

  if (dailyTasks.length > 6 && dailyTasks.length <= 9) {
    taskieAvatar.src = "img/madtaskie.png";
    headerTitle.textContent = "What have you been up to??!!";
    headerText.textContent = "They're piling up, don't lose control!";
  }

  if (dailyTasks.length > 9) {
    taskieAvatar.src = "img/dedtaskie.png";
    headerTitle.textContent = "Oh jeez...";
    headerText.textContent = ".. .. . . ... .. . . . .. . . ... .. .. . . ... .. . . . .. . ... .. . . ... .. . . . .. . . ... .. .. . . ... .. . . . .. .";
  }
}
