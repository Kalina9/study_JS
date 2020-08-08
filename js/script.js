const money = 50019;
const income = 'фриланс';
const addExpenses = 'метро, Связь';
const deposit = false;
const mission = 100000000;
const period = 3;
const budgetDay = money / 30;
console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев')
console.log('Цель заработать ' + mission + ' рублей')
console.log(addExpenses.toLowerCase().split(', '));
// console.log(addExpenses.split(', '));
console.log(budgetDay);