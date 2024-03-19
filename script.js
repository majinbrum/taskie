/*
* Highlighted comment
! Red comment
? Blue comment
TODO: orange comment
*/

// * Color theme
const colorMode_btn = document.querySelector(".color-mode");
colorMode_btn.addEventListener("click", function () {
  const html = document.querySelector("html");
  const colorMode_btnicon = document.querySelector(".color-mode i");
  html.classList.toggle("light-mode");
  html.classList.toggle("dark-mode");
  colorMode_btnicon.classList.toggle("fa-moon");
  colorMode_btnicon.classList.toggle("fa-lightbulb");
});

/* *************************************************
 * Open and close the popup menu to add a task
 ************************************************* */

const newTask_btn = document.querySelector(".new-btn");
const newTask_menu = document.querySelector(".new-task-menu");
const newTask_close = document.querySelector(".new-task-menu .cancel-icon");

newTask_btn.addEventListener("click", function () {
  newTask_menu.classList.add("popup");
});

newTask_close.addEventListener("click", function () {
  newTask_menu.classList.remove("popup");
});

/* *************************************************
 * Create a task and add it to the task list
 ************************************************* */
let dailyActivities = [];
const addTask_inputTitle = document.querySelector(".new-task-title");
const addTask_btn = document.querySelector(".add-task-btn");
const dailyTasks_section = document.querySelector(".daily-section");

addTask_btn.addEventListener("click", function () {
  let newTask_title = addTask_inputTitle.value;

  dailyActivities.push(newTask_title);

  addTask_HTMLtemplate(newTask_title);

  addTask_inputTitle.value = "";
  newTask_menu.classList.remove("popup");

  checkTaskCount();
});

/* *************************************************
 * Function to create a task div
 ************************************************* */
function addTask_HTMLtemplate(task_title) {
  let newTask_template = document.createElement("div");
  newTask_template.classList.add("task");
  newTask_template.innerHTML = `
            <h3 class="task-title">${task_title}</h3>
            <span class="check-icon">
              <i class="fa-solid fa-check"></i>
            </span>
            `;
  dailyTasks_section.appendChild(newTask_template);
}

/* *************************************************
 * Check how many tasks are unchecked to change the taskie avatar img and header text
 ************************************************* */
window.addEventListener("load", checkTaskCount());

function checkTaskCount() {
  const taskieAvatar = document.querySelector(".header-img img");
  const headerTitle = document.querySelector("header h2");
  const headerText = document.querySelector("header h4");

  if (dailyActivities.length <= 3) {
    taskieAvatar.src = "img/supataskie.png";
    headerTitle.textContent = "OMG YOU ROCK!!";
    headerText.textContent = "No tasks onsight, keep it up!";
  }

  if (dailyActivities.length > 3 && dailyActivities.length <= 6) {
    taskieAvatar.src = "img/sorridentetaskie.png";
    headerTitle.textContent = "You got this!";
    headerText.textContent = "Cmon hooman, just do it!";
    // headerText.textContent = "I know it's hard but I believe in you!";
  }

  if (dailyActivities.length > 6 && dailyActivities.length <= 9) {
    taskieAvatar.src = "img/madtaskie.png";
    headerTitle.textContent = "What have you been up to??!!";
    headerText.textContent = "They're piling up, don't lose control!";
  }

  if (dailyActivities.length > 9) {
    taskieAvatar.src = "img/dedtaskie.png";
    headerTitle.textContent = "Oh jeez...";
    headerText.textContent = ".. .. . . ... .. . . . .. . . ... .. .. . . ... .. . . . .. . .";
  }
}
