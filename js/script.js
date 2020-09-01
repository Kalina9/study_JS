"use strict";
// let money = 6000;

// start();
const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let start = document.getElementById("start"),
  incomePlus = document.getElementsByTagName("button")[0],
  expensesPlus = document.getElementsByTagName("button")[1],
  checkBox = document.querySelector("#deposit-check"),
  possibleIncome = document.querySelectorAll(".additional_income-item"),
  budgetDayValue = document.getElementsByClassName("result-total")[1],
  expensesMonthValue = document.getElementsByClassName("result-total")[2],
  additionalIncomeValue = document.getElementsByClassName("result-total")[3],
  additionalExpensesValue = document.getElementsByClassName("result-total")[4],
  incomePeriodValue = document.getElementsByClassName("result-total")[5],
  targetMonthValue = document.getElementsByClassName("result-total")[6],
  budgetMonthValue = document.querySelector(".budget_month-value"),
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  incomeAmount = document.querySelector(".income-amount"),
  expensesTitle = document.querySelector(".expenses-title"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  incomeItem = document.querySelectorAll(".income-items"),
  btnCancel = document.getElementById("cancel"),
  data = document.querySelector(".data"),
  periodAmount = document.querySelector(".period-amount"),
  depositCheck = document.getElementById("deposit-check"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent");
//сОЗДАЕМ ОБЪЕКТ
class AppData {
  constructor() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.incomeMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
  check() {
    if (salaryAmount.value == "") {
      start.removeAttribute("disabled");
    }
  }
  start() {
    if (salaryAmount.value == "") {
      start.setAttribute("disabled", "true");
      return;
    }
    const allInput = document.querySelectorAll(".data input[type=text]");
    allInput.forEach((item) => {
      item.setAttribute("disabled", "true");
    });
    incomePlus.setAttribute("disabled", "true");
    expensesPlus.setAttribute("disabled", "true");
    start.style.display = "none";
    cancel.style.display = "block";

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.validatorPercent();
    this.disabledBtn();
    this.getBudget();

    this.showResult();
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    // Накопления за период меняются при изменении ползунка
    // periodSelect.addEventListener("input", () => this.showResult);
    periodSelect.addEventListener("change", () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  }
  //   Делаю доп.строки(клоны) для обязательных расходов
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  }
  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector(".expenses-title").value;
      const cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  //   Делаю доп.строки(клоны) для дохода
  addIncomeBlock() {
    const cloneIncomeItems = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItem = document.querySelectorAll(".income-items");
    if (incomeItem.length === 3) {
      incomePlus.style.display = "none";
    }
  }
  getIncome() {
    incomeItem.forEach((item) => {
      const itemIncome = item.querySelector(".income-title").value;
      const cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  }
  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    }, this);
  }
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    }, this);
  }
  // Расходы за месяц
  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
      //console.log(appData.expensesMonth);
    }
  }
  // Получаю бюджет
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return `У вас средний уровень дохода`;
    } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
      return `К сожалению у вас уровень дохода ниже среднего`;
    } else {
      return `Что то пошло не так`;
    }
  }
  getTargetStatus() {
    if (this.getTargetMonth() < 0) {
      console.log(`Цель не  будет достигнута `);
    } else {
      console.log(
        `Цель будет достигнута через ` +
          Math.ceil(this.getTargetMonth()) +
          `  месяцев`
      );
    }
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }
  // К начальному состоянию
  reset() {
    const inputText = document.querySelectorAll(".data input[type=text]");
    const resultInput = document.querySelectorAll(".result input[type=text]");

    inputText.forEach((elem) => {
      elem.value = "";
      elem.removeAttribute("disabled");
      periodSelect.value = "0";
      periodAmount.innerHTML = periodSelect.value;
    });
    resultInput.forEach((elem) => {
      elem.value = "";
    });
    // Удаление блоков с доходами
    incomeItem = document.querySelectorAll(".income-items");
    incomeItem.forEach((item, index) => {
      if (index >= 1) {
        item.remove();
      }
    });
    // Удаление блоков с расходами
    expensesItems = document.querySelectorAll(".expenses-items");
    expensesItems.forEach((item, index) => {
      if (index >= 1) {
        item.remove();
      }
    });

    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.incomeMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    depositPercent.style.display = "none";
    depositBank.value = "";
    cancel.style.display = "none";
    start.style.display = "block";
    incomePlus.removeAttribute("disabled");
    expensesPlus.removeAttribute("disabled");
    checkBox.checked = false;
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === "other") {
      depositPercent.style.display = "inline-block";
      depositPercent.disabled = false;
      depositPercent.value = "";
    } else {
      depositPercent.style.display = "";
      depositPercent.disabled = true;
      depositPercent.value = valueSelect * 100;
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = "true";
      start.disabled = true;
      depositBank.addEventListener("input", this.changePercent);
      depositPercent.addEventListener(
        "input",
        this.validatorPercent.bind(this)
      );
      depositAmount.addEventListener("input", this.validatorPercent.bind(this));
      depositBank.addEventListener("input", this.validatorPercent.bind(this));
    } else {
      depositBank.style.display = "";
      depositAmount.style.display = "";
      depositBank.value = 0;
      depositAmount.value = "";
      this.deposit = "false";
      this.disabledBtn();
      depositBank.removeEventListener("input", this.validatorPercent);
      depositPercent.removeEventListener(
        "input",
        this.validatorPercent.bind(this)
      );
      depositAmount.removeEventListener(
        "input",
        this.validatorPercent.bind(this)
      );
      depositBank.removeEventListener(
        "input",
        this.validatorPercent.bind(this)
      );
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.persentDeposit = +depositPercent.value;
      this.moneyDeposit = +depositAmount.value;
    }
  }

  disabledBtn() {
    if (depositCheck.checked) {
      if (depositPercent.value !== "" && depositAmount.value !== "") {
        start.disabled = !salaryAmount.value.trim();
      } else {
        start.disabled = true;
      }
    } else {
      start.disabled = !salaryAmount.value.trim();
    }
  }

  validatorPercent() {
    if (!(depositPercent.value > 0 && depositPercent.value < 100)) {
      if (depositBank.value !== "0" && depositPercent.value !== "") {
        alert("Введите корректное значение");
      }
      depositPercent.value = "";
    }
    this.disabledBtn();
  }

  // Навешивание событий
  eventListeners() {
    // Вешаю событие клик на кнопки
    // const _this = this;
    start.addEventListener("click", this.start.bind(this));
    expensesPlus.addEventListener("click", this.addExpensesBlock);
    incomePlus.addEventListener("click", this.addIncomeBlock);
    salaryAmount.addEventListener("keyup", this.check);
    cancel.addEventListener("click", this.reset.bind(this));
    depositCheck.addEventListener("change", this.depositHandler.bind(this));
    // Меняю значение в зависимости от положения range
    periodSelect.addEventListener("change", () => {
      periodAmount.innerHTML = periodSelect.value;
    });

    // Кнопка не работает пока инпут пустой
    start.disabled = true;
    salaryAmount.addEventListener("input", () => {
      start.disabled = salaryAmount.value === "";
    });
  }
}

const appData = new AppData();
console.log(appData);
appData.eventListeners();
