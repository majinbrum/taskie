const colorMode_btn = document.querySelector(".color-mode");
colorMode_btn.addEventListener("click", function () {
  const html = document.querySelector("html");
  const colorMode_btnicon = document.querySelector(".color-mode i");
  html.classList.toggle("light-mode");
  html.classList.toggle("dark-mode");
  colorMode_btnicon.classList.toggle("fa-moon");
  colorMode_btnicon.classList.toggle("fa-lightbulb");
});

const newTask_btn = document.querySelector(".new-btn");
const newTask_menu = document.querySelector(".new-task-menu");
const newTask_close = document.querySelector(".new-task-menu .cancel-icon");

newTask_btn.addEventListener("click", function () {
  newTask_menu.classList.add("popup");
});

newTask_close.addEventListener("click", function () {
  newTask_menu.classList.remove("popup");
});

let dailyActivities = [];
const task_Title_input = document.querySelector(".new-task-title");
const addTask_btn = document.querySelector(".add-task-btn");
const dailyTasks_section = document.querySelector(".daily-section");

addTask_btn.addEventListener("click", function () {
  let newTask_title = task_Title_input.value;
  dailyActivities.push(newTask_title);

  let newTask_template = document.createElement("div");
  newTask_template.classList.add("task");
  newTask_template.innerHTML = `
            <h3 class="task-title">${newTask_title}</h3>
            <span class="check-icon">
              <i class="fa-solid fa-check"></i>
            </span>
            `;
  dailyTasks_section.appendChild(newTask_template);

  task_Title_input.value = "";
  newTask_menu.classList.remove("popup");
});
