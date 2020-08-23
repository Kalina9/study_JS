"use strict";
// let money = 6000;

// start();
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let start = document.getElementById("start");
let incomePlus = document.getElementsByTagName("button")[0];
let expensesPlus = document.getElementsByTagName("button")[1];
let checkBox = document.querySelector("#deposit-check");
let possibleIncome = document.querySelectorAll(".additional_income-item");
let budgetDayValue = document.getElementsByClassName("result-total")[1];
let expensesMonthValue = document.getElementsByClassName("result-total")[2];
let additionalIncomeValue = document.getElementsByClassName("result-total")[3];
let additionalExpensesValue = document.getElementsByClassName("result-total")[4];
let incomePeriodValue = document.getElementsByClassName("result-total")[5];
let targetMonthValue = document.getElementsByClassName("result-total")[6];
let budgetMonthValue = document.querySelector(".budget_month-value");
let salaryAmount = document.querySelector(".salary-amount");
let incomeTitle = document.querySelector(".income-title");
let incomeAmount = document.querySelector(".income-amount");
let expensesTitle = document.querySelector(".expenses-title");
let expensesItems = document.querySelectorAll(".expenses-items");
let additionalExpensesItem = document.querySelector(".additional_expenses-item");
let additionalIncomeItem = document.querySelectorAll(".additional_income-item");
let targetAmount = document.querySelector(".target-amount");
let periodSelect = document.querySelector(".period-select");
let incomeItem = document.querySelectorAll(".income-items");

//сОЗДАЕМ ОБЪЕКТ
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  incomeMonth: 0,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  //Методы
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();

  },

  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.ceil(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncomeValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    // Накопления за период меняются при изменении ползунка
    periodSelect.addEventListener("input", appData.showResult);
  },

  //   Делаю доп.строки(клоны) для обязательных расходов
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  // Делаю доп.строки (клоны) для дополнительного дохода
  addIncomeBlock: function () {
    let cloneIncomeItems = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItem = document.querySelectorAll(".income-items");
    if (incomeItem.length === 3) {
      incomePlus.style.display = "none";
    }
  },

  getIncome: function () {
    incomeItem.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += appData.income[key];
    }
  },

  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
      //console.log(appData.expensesMonth);
    }
  },
  getBudget: function () {
    appData.budgetMonth =
      appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
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

  getInfoDeposit: function () {
    if (appData.deposit) {

      //Проверка введенных данных
      do {
        appData.percentDeposit = prompt("Какой готовой процент?", 10);
      } while (isNaN(parseFloat(appData.percentDeposit)));
      do {
        appData.moneyDeposit = prompt("Какая сумма на депозите", 10000);
      } while (isNaN(parseFloat(appData.moneyDeposit)));

    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
};
// Вешаю событие клик на кнопки 

start.addEventListener("click", appData.start);

expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
// Меняю значение в зависимости от положения range
periodSelect.oninput = function () {
  document.querySelector(".period-amount").innerHTML = periodSelect.value;
};
// Кнопка не работает пока инпут пустой
start.disabled = true;
salaryAmount.addEventListener("input", function () {
  start.disabled = salaryAmount.value === "";
});

appData.getInfoDeposit();