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
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  //Методы
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
      console.log(appData.expensesMonth);
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
        "Цель будет достигнута через " +
          Math.ceil(appData.getTargetMonth()) +
          " месяцев"
      );
    }
  },
  asking: function () {
    if (confirm("Есть у вас доп заработок?")) {
      let itemIncome;
      //Проверка введенных данных в доп.заработке
      do {
        itemIncome = prompt(
          "Какой у вас есть дополнительный заработок?",
          "Таксую"
        );
      } while (itemIncome == null || !isNaN(itemIncome));

      // let cashIncome;
      let cashIncome;
      //Проверка введенных данных
      do {
        cashIncome = prompt("Сколько зарабатываете на этом?");
      } while (isNaN(parseFloat(cashIncome)));
      // do {
      //   cashIncome = prompt("Сколько зарабатываете на этом?", 555);
      // } while (isNaN(cashIncome)) || cashIncome === null || );
      cashIncome = Number(cashIncome);

      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses;
    for (let i = 0; i < appData.addExpenses.length; i++) {
      appData.addExpenses[i] =
        appData.addExpenses[i][0].toUpperCase() +
        appData.addExpenses[i].slice(1).toLowerCase();
    }

    //Проверка введенных данных
    do {
      addExpenses = prompt(
        "Перечислите возможные расходы за рассчитываемый период через запятую",
        "Кино, метро, инет"
      );
    } while (addExpenses == null || !isNaN(addExpenses));

    appData.addExpenses = addExpenses.toLowerCase().split(",");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (let i = 0; i < 2; i++) {
      let checker;
      let expenses;
      //Проверка введенных данных
      do {
        expenses = prompt("Введите обязательную статью расходов");
      } while (expenses == null || !isNaN(expenses));
      //expenses = prompt("Введите обязательную статью расходов");
      do {
        checker = prompt("Во сколько это обойдется?");
      } while (!isNumber(checker));
      appData.expenses[expenses] = +checker;
    }
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      // appData.percentDeposit = +prompt("Какой готовой процент?", "10");
      //Проверка введенных данных
      do {
        appData.percentDeposit = prompt("Какой готовой процент?", 10);
      } while (isNaN(parseFloat(appData.percentDeposit)));
      do {
        appData.moneyDeposit = prompt("Какая сумма на депозите", 10000);
      } while (isNaN(parseFloat(appData.moneyDeposit)));
      // appData.moneyDeposit = +prompt("Какая сумма на депозите", 10000);
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.peroid;
  },
};

console.log(appData);
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();
appData.getTargetMonth();
console.log("Расходы за месяц:" + appData.expensesMonth);
console.log(appData.getTargetStatus());
console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log("Наша программа включает в себя данные: " + key + appData[key]);
}
appData.getInfoDeposit();
console.log(appData.percentDeposit);
console.log(appData.moneyDeposit);
console.log(appData.calcSavedMoney());

// for (let i = 0; i < monthExpenses.length; i++) {
//   monthExpenses[i] =
//     monthExpenses[i][0].toUpperCase() + monthExpenses[i].slice(1).toLowerCase();
// }
appData.addExpenses.forEach(function (addExpenses, i, arr) {
  arr[i] = addExpenses[0].toUpperCase() + addExpenses.slice(1).toLowerCase();
  console.log(appData.addExpenses);
});

// appData.addExpenses = appData.addExpenses
//   .split(/\s+ /)
//   .map((word) => word[0].toUpperCase() + word.substring(1))
//   .join("");
// console.log(appData.addExpenses);
