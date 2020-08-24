"use strict";

const todoControl = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  headerButton = document.querySelector(".header-button"),
  todoCompleted = document.querySelector(".todo-completed");

let todoData = [];
// LocalStorage сохраняется после перезагрузки
if (localStorage.getItem("todo")) {
  todoData = JSON.parse(localStorage.getItem("todo"));
}
const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";

  headerInput.value = "";
  todoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
     // Сохраняю в локал выполненые дела и не выполненые
    if (item.completed) {
      localStorage.setItem("todo", JSON.stringify(todoData, item.completed));
    } else {
      localStorage.setItem("todo", JSON.stringify(todoData));
    }
    const btnTodoComplete = li.querySelector(".todo-complete");
    btnTodoComplete.addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
// Удаляю дела
    const todoRemove = li.querySelector(".todo-remove");
    todoRemove.addEventListener("click", function () {
      let index = todoData.indexOf(item);
      todoData.splice(index, 1);

      li.remove();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
// Проверяю на пустое значение и добавляю в массив
  if (headerInput.value.trim()) {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };
    todoData.push(newTodo);
    headerInput.value = "";
    render();
    //  сохраняю дела в LocalStorage
//     localStorage.setItem("todo", JSON.stringify(todoData));
  }
});

render();
