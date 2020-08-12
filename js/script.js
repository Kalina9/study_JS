"use strict";
const money = +prompt("Ваш месячный доход?", 50000);
const income = "фриланс";
const addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
const deposit = confirm("Есть ли у вас депозит в банке?");
const expenses1 = prompt("Введите обязательную статью расходов?");
const amount1 = +prompt("Во сколько это обойдется?", 500);
const expenses2 = prompt("Введите обязательную статью расходов?");
const amount2 = +prompt("Во сколько это обойдется?", 500);
const mission = 1000000;
const period = 3;

let showTypeOf = function (data) {
  console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// const budgetMonth = money - amount1 - amount2;

//Фунцкии
function getExpensesMonth(a, b) {
  return a + b;
}
console.log(getExpensesMonth(amount1, amount2));
// Присвоил переменной accumulatedMonth значение функции getAccumulatedMonth
let getAccumulatedMonth = function () {
  return money - amount1 - amount2;
};
getAccumulatedMonth();
let accumulatedMonth = getAccumulatedMonth();
console.log(accumulatedMonth);

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}
console.log(getTargetMonth());
// console.log(addExpenses.split(', '));
console.log(
  "Цель будет достигнута через " +
    Math.ceil(mission / accumulatedMonth) +
    " месяцев"
);
let budgetDay = accumulatedMonth / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (budgetDay < 600 && budgetDay >= 0) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else {
    return "Что то пошло не так";
  }
};
console.log(getStatusIncome());
