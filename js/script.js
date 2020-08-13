"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = "фриланс";
const addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
const deposit = confirm("Есть ли у вас депозит в банке?");
// const expenses1 = prompt("Введите обязательную статью расходов?");
// const amount1 = +prompt("Во сколько это обойдется?", 500);
// const expenses2 = prompt("Введите обязательную статью расходов?");
// const amount2 = +prompt("Во сколько это обойдется?", 500);
const mission = 1000000;
const period = 3;

let start = function () {
  //money = prompt("Ваш месячный доход?");

  // while (isNaN(money) || money.trim() === '' || money === null) {
  //   money = prompt("Ваш месячный доход?");
  // }
  //   while (isNaN(parseFloat(money))) {
  //     money = prompt("Ваш месячный доход?");
  //   }
  //   while (!isNumber(money)) {
  //     money = prompt("Ваш месячный доход?");
  //   }
  // };
  // start();
  do {
    money = prompt("Ваш месячный доход?");
  } while (isNaN(parseFloat(money)));
};
start();

let showTypeOf = function (item) {
  console.log(typeof item);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// const budgetMonth = money - amount1 - amount2;
// let expenses1, expenses2;
let expenses = [];
//Фунцкии
let getExpensesMonth = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    // if (i === 0) {
    //   expenses1 = prompt('Введите обязательную статью расходов', 'Садик');
    // } else if (i === 1) {
    //   expenses2 = prompt('Введите обязательную статью расходов', 'Клуб');
    // }
    expenses[i] = prompt("Введите обязательную статью расходов", "Клуб");
    //Создаю переменную которую проверю на число и вставлю ее в sum
    let checker = prompt("Во сколько это обойдется?");
    while (!isNumber(checker)) {
      checker = prompt("Во сколько это обойдется?");
    }
    sum += +checker;
  }

  console.log(sum);
  return sum;
};

let expensesAmount = getExpensesMonth();
console.log("Расходы за месяц:" + expensesAmount);

let getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();
let getTargetMonth = function () {
  return mission / accumulatedMonth;
};
getTargetMonth();
let getTargetStatus = function () {
  if (getTargetMonth() < 0) {
    console.log("Цель не  будет достигнута  ");
  } else {
    console.log(
      "Цель будет достигнута через " + Math.ceil(getTargetMonth()) + " месяцев"
    );
  }
};
getTargetStatus();

let budgetDay = accumulatedMonth / 30;

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
