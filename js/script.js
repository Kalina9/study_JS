// Обработчик ожидает загрузгу только DOM дерева - DOMContentLoaded
window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Таймер
    function countTimer(deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        //    Условие , которое добавляет 0
        let addZero = function (num) {
            if (num <= 9) {
                return "0" + num;
            } else {
                return num
            }
        };

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        function updateClock() {
            let timer = getTimeRemaining();
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);
            // Если  событие прошло,  таймер  становится 00:00:00
            if (timer.timeRemaining <= 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
                clearInterval(idInterval)
            }
        }
        let idInterval = setInterval(updateClock, 1000)

        updateClock()


    }
    //countTimer();
    countTimer(`7 september 2020`)
});