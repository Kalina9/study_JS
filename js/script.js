'use strict'
// Создаю конструктор
const DomElement = function (selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}
// Добавляю метод с условиями
DomElement.prototype.newElement = function () {
    if (this.selector.charAt(0) === '.') {
        let newDiv = document.createElement('div');
        newDiv.className = this.selector.substring(1);
        newDiv.textContent = 'London is the capital of Great Britian'
        newDiv.style.cssText = `selector: ${this.selector}; height: ${this.height}; width: ${this.width}; background: ${this.bg}; fontSize: ${this.fontSize}`;
        let body = document.querySelector('body');
        body.append(newDiv)
    } else if (this.selector.charAt(0) === '#') {
        let newParag = document.createElement('p');
        newParag.id = this.selector.substring(1);
        newParag.textContent = 'London is the capital of Great Britian'
        newParag.style.cssText = `selector: ${this.selector}; height: ${this.height}; width: ${this.width}; background: ${this.bg}; fontSize: ${this.fontSize}`;
        let body = document.querySelector('body');
        body.append(newParag);
    }
}
//  Создаю новый обьект
const domElementNew = new DomElement('.block', '500px', '500px', 'red', '45px');

domElementNew.newElement()