"use strict";
const book = document.querySelectorAll(".book");
const titleChapter = document.querySelectorAll("a");
const adv = document.querySelector(".adv");
const body = document.querySelector("body");
const collection = document.querySelectorAll("ul");
const elems = document.querySelectorAll("li");
// Меняю порядок глав
book[0].before(book[1]);
book[5].after(book[2]);
book[4].after(book[3]);
// Меняю фоновую картинку
body.style.backgroundImage = 'url("image/you-dont-know-js.jpg")';
// Меняю текст в 3 главе
titleChapter[4].textContent = "Книга 3. this и Прототипы Объектов";

// Удалил рекламу
adv.remove();

//Меняю порядок лишек
elems[9].after(elems[2]);
elems[3].after(elems[6]);
elems[6].after(elems[8]);
elems[48].before(elems[55]);
elems[50].after(elems[48]);
elems[53].after(elems[51]);

// Создал новую лишку в 6 главе
const newElem = document.createElement("li");
collection[2].append(newElem);
newElem.textContent = "Глава 8: За пределами ES6";
newElem.after(elems[26]);

console.log(collection);
console.log(elems);
console.log(titleChapter[4]);
console.log(book);
