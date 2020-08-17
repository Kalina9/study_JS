"use strict";
let money = 6000;
let start = function () {

  do {
    money = prompt("Ваш месячный доход?");
  } while (isNaN(parseFloat(money)));
};
start();
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//сОЗДАЕМ ОБЪЕКТ
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  peroid: 3,


  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  //Методы
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
      console.log(appData.expensesMonth)
    }
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay < 600 && appData.budgetDay >= 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else {
      return "Что то пошло не так";
    }
  },
  getTargetStatus: function () {
    if (appData.getTargetMonth() < 0) {
      console.log("Цель не  будет достигнута  ");
    } else {
      console.log(
        "Цель будет достигнута через " + Math.ceil(appData.getTargetMonth()) + " месяцев"
      );
    }
  },
  asking: function () {
    let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (let i = 0; i < 2; i++) {
      let checker;
      let expenses;
      expenses = prompt("Введите обязательную статью расходов");
      //Создаю переменную которую проверю на число и вставлю ее в sum
      do {
        checker = prompt("Во сколько это обойдется?");
      }
      while (!isNumber(checker));
      appData.expenses[expenses] = +checker;

    }
  }
}

console.log(appData)
appData.asking()
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();
appData.getTargetMonth();
console.log("Расходы за месяц:" + appData.expensesMonth);
console.log(appData.getTargetStatus())
console.log(appData.getStatusIncome())

for (let key in appData) {
  console.log("Наша программа включает в себя данные: " + key + appData[key])
}