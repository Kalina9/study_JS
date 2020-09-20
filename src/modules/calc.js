const calc = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
        calcType = document.querySelector(".calc-type"),
        calsSquare = document.querySelector(".calc-square"),
        calcDay = document.querySelector(".calc-day"),
        calcCount = document.querySelector(".calc-count"),
        totalValue = document.getElementById("total");

    const countSum = () => {
        let total = 0;
        let countValue = 1;
        let dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calsSquare.value;

        // Стоимость взависимости от к-ва помещений
        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }
        // Стоимость взависимости от срочности
        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }
        // Считаем сумму
        if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }

        // Записываем итоговую сумму
        totalValue.textContent = Math.ceil(total);

        //let currentNumber = $('#dynamic-number').text();
    };

    calcBlock.addEventListener("change", (event) => {
        let target = event.target;

        if (
            target.matches(".calc-type") ||
            target.matches(".calc-square") ||
            target.matches(".calc-day") ||
            target.matches(".calc-count")
        ) {
            countSum();
        }
        // if(target === calcType || target === calsSquare
        //   || target=== calcDay || target === calcDay){
        //   console.log(1)
        // }
        // if(target.matches('select') || target.matches('input')){
        //   console.log(1)
        // }
    });
    const inputNumbers = () => {
        let calcSCD = document.querySelectorAll("input.calc-item");
        calcSCD.forEach((item) => {
            item.addEventListener("input", () => {
                item.value = item.value.replace(/\D/, "");
            });
        });
    };
    inputNumbers()
};
export default calc;