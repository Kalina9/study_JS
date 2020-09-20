const togglePopUp = require('./togglePopUp')
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
export default makeAnimate;