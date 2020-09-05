'use strict'

function getInfoDay() {
    let date = new Date(),
        hour = date.getHours();

    let sayHey = function () {

        // Приветствие в зависимости от времени

        if (hour >= 5 && hour < 12) {
            console.log("Доброе утро")
        } else {
            if (hour >= 12 && hour < 18) {
                console.log("Добрый день")
            } else {
                if (hour >= 18 && hour <= 22) {
                    console.log("Добрый вечер")
                } else {
                    if (hour >= 23 && hour < 5) {
                        console.log("Доброй ночи ")
                    }
                }
            }
        }
    };
    sayHey()
    let timeNow = function () {
        console.log("Сегодня: " + date.toLocaleString('ru', {
            weekday: 'long'
        }));
        console.log('Текущее время: ' + date.toLocaleTimeString('en'))
    }
    timeNow()

    function getInfoNewYear() {
        let newYearDay = new Date("January 1, 2021")
        //Количество миллисекунд в одном дне
        let millisecondInDay = 24 * 60 * 60 * 1000;
        //Высчитываю количество дней
        let daysLeft = Math.round((newYearDay.getTime() - date.getTime()) / millisecondInDay);
        let dayName = "";
        let ds = "" + daysLeft
        //Получаю последнею цифру
        let lastNumber = parseInt(ds.substr(ds.length - 1))
        //Склонение слова 'день'
        if (daysLeft > 4 && daysLeft < 21) {
            dayName = " дней"
        } else
        if (lastNumber == 1) {
            dayName = " день"
        } else
        if (lastNumber == 2 || lastNumber == 3 || lastNumber == 4) {
            dayName = " дня"
        } else {
            dayName = " дней"
        }
        // 
        if (daysLeft < 0) {
            console.log("С новым годом!")
        } else {

            console.log("До нового года осталось: " + daysLeft + dayName)

        }
    }
    getInfoNewYear()

}
getInfoDay()