"use strict";

const todoControl = document.querySelector(".todo-control"),
  headerInput = document.querySelector(".header-input"),
  todoList = document.querySelector(".todo-list"),
  headerButton = document.querySelector(".header-button"),
  todoCompleted = document.querySelector(".todo-completed");

let todoData = [
  // {
  //     value: 'Сварить кофе',
  //     completed: false
  // },
  // {
  //     value: 'Помыть посуду',
  //     completed: true
  // },
];

const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";
  // После добавления дела input очищается
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
    const btnTodoComplete = li.querySelector(".todo-complete");
    btnTodoComplete.addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
    //Удаляю дело при клике на корзину

    // const btnTodoRemove = li.querySelector('.todo-remove');
    // btnTodoRemove.addEventListener('click', function () {
    //     li.remove();
    //     const newTodo = {
    //         value: headerInput.value,
    //     };
    //     todoData.shift(newTodo)

    //     render();
    // })
  });
};
// Проверяю на пустое значение
headerInput.addEventListener("input", function () {
  if (headerInput.value !== "") {
    headerButton.disabled = false;
  } else {
    headerButton.disabled = true;
  }
});

render();
todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTodo = {
    value: headerInput.value,
    completed: false,
  };
  todoData.push(newTodo);

  render();
});

//Пустой инпут не добавляю в список дел

render();
