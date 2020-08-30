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
let additionalExpensesValue = document.getElementsByClassName(
    "result-total"
)[4];
let incomePeriodValue = document.getElementsByClassName("result-total")[5];
let targetMonthValue = document.getElementsByClassName("result-total")[6];
let budgetMonthValue = document.querySelector(".budget_month-value");
let salaryAmount = document.querySelector(".salary-amount");
let incomeTitle = document.querySelector(".income-title");
let incomeAmount = document.querySelector(".income-amount");
let expensesTitle = document.querySelector(".expenses-title");
let expensesItems = document.querySelectorAll(".expenses-items");
let additionalExpensesItem = document.querySelector(
    ".additional_expenses-item"
);
let additionalIncomeItem = document.querySelectorAll(".additional_income-item");
let targetAmount = document.querySelector(".target-amount");
let periodSelect = document.querySelector(".period-select");
let incomeItem = document.querySelectorAll(".income-items");
let btnCancel = document.getElementById("cancel");
let data = document.querySelector(".data");
let periodAmount = document.querySelector(".period-amount");

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
    check: function () {
        if (salaryAmount.value == "") {
            start.removeAttribute("disabled");
        }
    },
    start: function () {
        if (salaryAmount.value == "") {
            start.setAttribute("disabled", "true");
            return;
        }
        let allInput = document.querySelectorAll(".data input[type=text]");
        allInput.forEach(function (item) {
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
        this.getBudget();

        this.showResult();
    },

    showResult: function () {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(", ");
        additionalIncomeValue.value = this.addIncome.join(", ");
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        // Накопления за период меняются при изменении ползунка
        // periodSelect.addEventListener("input", () => this.showResult);
        periodSelect.addEventListener("change", function () {
            incomePeriodValue.value = _this.calcPeriod();
        });
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
                this.expenses[itemExpenses] = +cashExpenses;
            }
        }, this);
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
                this.income[itemIncome] = +cashIncome;
            }
        }, this);

        for (let key in this.income) {
            this.incomeMonth += this.income[key];
        }
    },
    // Дополнительный расходы
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== "") {
                this.addExpenses.push(item);
            }
        }, this);
    },
    // Дополнителный доход
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== "") {
                this.addIncome.push(itemValue);
            }
        }, this);
    },
    // Расходы за месяц
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
            //console.log(appData.expensesMonth);
        }
    },
    // Бюджет за месяц
    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    // Цель будет достигнута
    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },

    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {
            return "У вас высокий уровень дохода";
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return "У вас средний уровень дохода";
        } else if (this.budgetDay < 600 && this.budgetDay >= 0) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else {
            return "Что то пошло не так";
        }
    },
    getTargetStatus: function () {
        if (this.getTargetMonth() < 0) {
            console.log("Цель не  будет достигнута  ");
        } else {
            console.log(
                "Цель будет достигнута через " +
                Math.ceil(this.getTargetMonth()) +
                " месяцев"
            );
        }
    },

    getInfoDeposit: function () {
        if (this.deposit) {
            //Проверка введенных данных
            do {
                this.percentDeposit = prompt("Какой готовой процент?", 10);
            } while (isNaN(parseFloat(this.percentDeposit)));
            do {
                this.moneyDeposit = prompt("Какая сумма на депозите", 10000);
            } while (isNaN(parseFloat(this.moneyDeposit)));
        }
    },
    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    },
    reset: function () {
        let inputText = document.querySelectorAll(".data input[type=text]");
        let resultInput = document.querySelectorAll(".result input[type=text]");

        inputText.forEach(function (elem) {
            elem.value = "";
            elem.removeAttribute("disabled");
            periodSelect.value = "0";
            periodAmount.innerHTML = periodSelect.value;
        });
        resultInput.forEach(function (elem) {
            elem.value = "";
        });
        for (let i = 1; i < incomeItem.length; i++) {
            incomeItem[i].parentNode.remove(incomeItem[i]);
            incomePlus.style.display = "block";
        }
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.remove(expensesItems[i]);
            expensesPlus.style.display = "block";
        }

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

        cancel.style.display = "none";
        start.style.display = "block";
        incomePlus.removeAttribute("disabled");
        expensesPlus.removeAttribute("disabled");
        checkBox.checked = false;
    },
};

// Контекст вызова функции к appData
const startVar = appData.start.bind(appData);

// Вешаю событие клик на кнопки

start.addEventListener("click", appData.start.bind(appData));
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
salaryAmount.addEventListener("keyup", this.check);
cancel.addEventListener("click", appData.reset.bind(appData));
// Меняю значение в зависимости от положения range
periodSelect.addEventListener("change", function () {
    periodAmount.innerHTML = periodSelect.value;
});

// Кнопка не работает пока инпут пустой
start.disabled = true;
salaryAmount.addEventListener("input", function () {
    start.disabled = salaryAmount.value === "";
});
start.disabled = true;
salaryAmount.addEventListener("input", function () {
    start.disabled = salaryAmount.value === "";
});
