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
export default toggleMenu;