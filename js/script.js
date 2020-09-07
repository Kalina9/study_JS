// Обработчик ожидает загрузгу только DOM дерева - DOMContentLoaded
window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Таймер
  function countTimer(deadline) {
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");
    //    Условие , которое добавляет 0
    let addZero = function (num) {
      if (num <= 9) {
        return "0" + num;
      } else {
        return num;
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
        seconds,
      };
    }

    function updateClock() {
      let timer = getTimeRemaining();
      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);
      // Если  событие прошло,  таймер  становится 00:00:00
      if (timer.timeRemaining <= 0) {
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
        clearInterval(idInterval);
      }
    }
    let idInterval = setInterval(updateClock, 1000);

    updateClock();
  }
  //countTimer();
  countTimer(`7 september 2020`);

  // Меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu");
    const handlerMenu = () => {
      //   toggle - убирает или добавляет класс
      menu.classList.toggle("active-menu");
    };
    //
    menu.addEventListener("click", (event) => {
      let target = event.target;
      if (target.classList.contains("close-btn")) {
        handlerMenu();
      } else if (target.tagName == "A") {
        handlerMenu();
      }
      console.log(target);
    });

    btnMenu.addEventListener("click", (event) => {
      let target = event.target.closest(".menu");
      if (!target) {
        return;
      } else {
        handlerMenu();
      }

      console.log(target);
    });
  };
  toggleMenu();
  // popup
  const togglePopUp = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn");

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.display = "block";
      });
    });

    popup.addEventListener("click", (event) => {
      let target = event.target;

      if (target.classList.contains("popup-close")) {
        popup.style.display = "none";
      } else {
        target = target.contains(".popup-content");
        if (!target) {
          popup.style.display = "none";
        }
      }

      console.log(target);
    });
  };
  togglePopUp();

  // Анимация
  let makeAnimate = () => {
    let popupContent = document.querySelector(".popup-content"),
      popupBtn = document.querySelectorAll(".popup-btn");

    let count = 0,
      interval;
    const animate = () => {
      if (window.innerWidth > 768) {
        interval = requestAnimationFrame(animate);
        count += 5;
        if (count < 175) {
          popupContent.style.top = count + "px";
        } else {
          cancelAnimationFrame(interval);
          count = 0;
        }
      } else {
        cancelAnimationFrame(interval);
      }
    };

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        animate();
      });
    });
    window.addEventListener("load", togglePopUp.animate);
    window.addEventListener("resize", togglePopUp.animate);
  };
  makeAnimate();

  // табы
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header"),
      tab = tabHeader.querySelectorAll(".service-header-tab"),
      tabContent = document.querySelectorAll(".service-tab");
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };
    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");

      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();
});
