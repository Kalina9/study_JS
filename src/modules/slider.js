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
export default slider;