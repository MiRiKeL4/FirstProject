const form = document.querySelector(".todo-header-form");
const inputText = document.querySelector(".header-inputText");
const taskList = document.querySelector(".todo-main-form");

let tasks = [];

if (localStorage.getItem("tasks")) {
   tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function (task) {

   const cssClass = task.done ? "todo-main-label todo-main-label-hr" : "todo-main-label";

   // формируем разметку для новой задачи
   const taskHTML = `
                     <div id="${task.id}"class="todo-main-form-list">
                        <label for="" class="${cssClass}">
                           ${task.text}
                        </label>
                        <div class="main-form__button">
                           <input type="submit" data-action="done" value="✔" class="complete-point">
                           <input type="submit" data-action="delete" value="✖" class="delete-point">
                        </div>
                     </div>`;
   // добавляем задачу на страницу
   taskList.insertAdjacentHTML("beforeend", taskHTML);
})

function addList(event) {
   // отменяем отправку формы
   event.preventDefault();

   // достаём текст с поля ввода
   const taskText = inputText.value;

   const newTask = {
      id: Date.now(),
      text: taskText,
      done: false
   }

   tasks.push(newTask)
   const cssClass = newTask.done ? "todo-main-label todo-main-label-hr" : "todo-main-label";

   // формируем разметку для новой задачи
   const taskHTML = `
                     <div id="${newTask.id}"class="todo-main-form-list">
                        <label for="" class="${cssClass}">
                           ${newTask.text}
                        </label>
                        <div class="main-form__button">
                           <input type="submit" data-action="done" value="✔" class="complete-point">
                           <input type="submit" data-action="delete" value="✖" class="delete-point">
                        </div>
                     </div>`;
   // добавляем задачу на страницу
   taskList.insertAdjacentHTML("beforeend", taskHTML);

   // очищяем поле ввода и возвращяем на него фокус
   inputText.value = "";
   inputText.focus();
   saveToLocalStorage()
}
// добавление задачи
form.addEventListener("submit", addList);


function deleteTask(event) {
   event.preventDefault();
   if (event.target.dataset.action === "delete") {
      const perenNode = event.target.closest(".todo-main-form-list");

      const id = Number(perenNode.id);

      const index = tasks.findIndex(function (task) {
         return task.id === id;
      })


      tasks.splice(index, 1)

      perenNode.remove();
   }
   saveToLocalStorage()
}

// удаление задачи
taskList.addEventListener("click", deleteTask);


function doneTask(event) {
   event.preventDefault();
   if (event.target.dataset.action === "done") {
      const perentNode = event.target.closest(".todo-main-form-list");
      const taskTitle = perentNode.querySelector(".todo-main-label");
      taskTitle.classList.toggle("todo-main-label-hr")

      const id = Number(perentNode.id);
      const task = tasks.find((task) => task.id === id);
      task.done = !task.done
      console.log(task)
   }
   saveToLocalStorage()
}

// выполнение задачи
taskList.addEventListener("click", doneTask);

function saveToLocalStorage() {
   localStorage.setItem("tasks", JSON.stringify(tasks));
}