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
  countTimer(`20 september 2020`);

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
      } else if (!target) {
        popup.style.display = "none";
      } else if ((target = target.classList.contains("popup"))) {
        popup.style.display = "none";
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

  // Слайдер
  const slider = () => {
    const slide = document.querySelectorAll(".portfolio-item"),
      btn = document.querySelectorAll(".portfolio-btn"),
      slider = document.querySelector(".portfolio-content");
    //Номер слайда
    let currentSlide = 0,
      interval;
    let dots;
    // добавляю класс dot в html
    let wrapDots = document.querySelector(".portfolio-dots");
    for (let i = 0; i < slide.length; i++) {
      dots = document.createElement("li");
      dots.classList.add("dot");
      wrapDots.append(dots);
      document.querySelectorAll(".dot")[0].classList.add("dot-active");
    }
    let dot = document.querySelectorAll(".dot");

    //   С помощью prevSlide и nextSlide происходит переключение
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener("click", (event) => {
      event.preventDefault();
      let target = event.target;
      // Если клацаем мимо кнопок то return
      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }
      // Если кликаем по кнопкам то переходим внутрь
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dot, currentSlide, "dot-active");
      // Направо - добавили 1 к текущему слайду
      if (target.matches("#arrow-right")) {
        currentSlide++;
        // Налево - минус 1 от текущего слайда
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
        // Указываем индекс той точки на которую  кликнули
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      // Переключаем слайды  по кругу если слайд последний возвращаемся к первому
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      // Переключаем слайды  по кругу если слайд первый возвращаемся к последнему
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      // присваивам актив слайдам которые необходимо показать
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
    });
    // При наведении мышки включаем стоп
    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    // Когда мышку убираем включается слайдер
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });

    startSlide(2000);
  };
  slider();
  const changeImg = () => {
    const command = document.querySelector(".command"),
      commandSrc = document.querySelectorAll(".command__photo");
    // Сохраняю ссылки на фотки
    commandSrc.forEach((item) => {
      item.dataset.oldImg = item.getAttribute("src");
    });
    // если наводим мышку картинка меняется
    command.addEventListener("mouseover", (event) => {
      let target = event.target;
      if (!target.matches(".command__photo")) {
        return;
      } else {
        target.src = target.dataset.img;
      }
    });
    // если уводим мышку картинка меняется на исходную
    command.addEventListener("mouseout", (event) => {
      let target = event.target;
      if (!target.matches(".command__photo")) {
        return;
      } else {
        target.src = target.dataset.oldImg;
      }
    });
  };
  changeImg();
  // Смена картинок через деструктуризацию
  // const command = document.getElementById('command');

  //     const toggleImg = () => {
  //       const target = event.target;

  //       if (!target.matches('img')) return;

  //       [target.dataset.img, target.src] = [target.src, target.dataset.img];
  //     };

  //     command.addEventListener('mouseover', toggleImg);
  //     command.addEventListener('mouseout', toggleImg);
  // в инпут вводятся только цифры
  const inputNumbers = () => {
    let calcSCD = document.querySelectorAll("input.calc-item");
    calcSCD.forEach((item) => {
      item.addEventListener("input", () => {
        item.value = item.value.replace(/\D/, "");
      });
    });
  };
  inputNumbers();

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
      totalValue.textContent = total;

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
  };
  calc(100);

  // ///////////////////send-ajax-form

  const sendForm = (id, color) => {
    const errorMessage = "Что то пошла не так...",
      loadMessage = "Загрузка...",
      successMessage = "Спасибо! Мы скоро с Вами свяжемся";

    const form = document.getElementById(`${id}`);
    let userName = document.getElementsByName("user_name");
    let userEmail = document.getElementsByName("user_email");
    let userPhone = document.getElementsByName("user_phone");
    let userMessage = document.getElementsByName("user_message");

    const formPhone = form.querySelector(".form-phone");
    formPhone.addEventListener("input", () => {
      formPhone.value = formPhone.value.replace(/[^0-9+]/, "");
    });

    const formName = form.querySelector('input[name="user_name"]');
    formName.addEventListener("input", () => {
      formName.value = formName.value.replace(/[^ а-яё]/gi, "");
    });

    const mess = document.querySelector(".mess");
    mess.addEventListener("input", () => {
      mess.value = mess.value.replace(/[^ а-яё]/gi, "");
    });

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = `font-size: 2rem; color: ${color}`;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.appendChild(statusMessage);

      const formData = new FormData(form);
      let body = {};

      formData.forEach((val, key) => {
        body[key] = val;
        statusMessage.textContent = loadMessage;
      });

      postData(body)
        .then(() => {
          statusMessage.textContent = successMessage;
          setTimeout(() => {
            statusMessage.textContent = "";
          }, 2000);
        })
        .catch((error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    });

    const postData = (body) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener("readystatechange", () => {
          if (request.readyState !== 4) {
            return;
          }
          if (request.status === 200) {
            userName.forEach((item) => (item.value = ""));
            userEmail.forEach((item) => (item.value = ""));
            userPhone.forEach((item) => (item.value = ""));
            userMessage.forEach((item) => (item.value = ""));
            resolve();
          } else {
            reject(request.status);
          }
        });

        request.open("POST", "./server.php");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(body));
      });
    };
  };
  sendForm("form1");
  sendForm("form2");
  sendForm("form3", "white");
});
