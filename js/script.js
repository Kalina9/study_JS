'use strict';
const money = prompt("Ваш месячный доход?");
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов?')
const amount1 = prompt('Во сколько это обойдется?');
const expenses2 = prompt('Введите обязательную статью расходов?')
const amount2 = prompt('Во сколько это обойдется?');
const mission = 1000000;
const period = 3;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев')
console.log('Цель заработать ' + mission + ' рублей')
console.log(addExpenses.toLowerCase().split(', '));
const budgetMonth = money - amount1 - amount2;
console.log("Ваш месячный доход " + budgetMonth);
// console.log(addExpenses.split(', '));
console.log("Цель будет достигнута через " + Math.ceil(mission / budgetMonth) + ' месяцев');
let budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}