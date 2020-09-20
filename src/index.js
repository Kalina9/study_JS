"use strict";
import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import "formdata-polyfill";
import elementClosest from "element-closest";
elementClosest(window);
import "fetch-polyfill";

import sendForm from "./modules/sendForm";
import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopUp from "./modules/togglePopUp";
import makeAnimate from "./modules/makeAnimate";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import changeImg from "./modules/changeImg";
import calc from "./modules/calc";

// ///////////////////send-ajax-form
sendForm("form1");
sendForm("form2");
sendForm("form3", "white");
// Таймер
countTimer(`22 september 2020`);
// Меню
toggleMenu();
// popup
togglePopUp();
// Анимация
makeAnimate();
// табы
tabs();
// Слайдер
slider();
// Изменить фотки при наведении
changeImg();

//  Калькулятор_
calc(100);