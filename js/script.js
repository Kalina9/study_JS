'use strict';

class Todo {
    constructor(form, input, todolist, todoCompleted) {
        this.form = document.querySelector(form)
        this.input = document.querySelector(input)
        this.todolist = document.querySelector(todolist)
        this.todoCompleted = document.querySelector(todoCompleted)
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')))
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]))
    }

    render() {
        this.todolist.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage()
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `

        	<span class="text-todo">${todo.value}</span>
			<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
            </div>`);
        if (todo.completed) {
            this.todoCompleted.append(li)
        } else {
            this.todolist.append(li)
        }
    }
    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {


            const newTodo = {

                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render()
        }

    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    }
    deleteItem() {
        // найти элемент по ключу и удалить из new Map

    }
    completedItem() {
        // перебрать элементы todoData и найти ключ элемента на который мы нажали и поменять значение  completed

    }

    handler() {
            // делегирование
            let todoContainer = document.querySelector('.todo-container');
            todoContainer.addEventListener("click", (event) => {
                    let target = event.target;
                    if (target.classList.contains("todo-remove")) {
                        this.deleteItem();
                    } else if (target.classList.contains("todo-complete")) {
                        this.completedItem();
                    }
                }

                init() {

                    this.form.addEventListener('submit', this.addTodo.bind(this))
                    this.render()
                }
            }
            const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
            todo.init()