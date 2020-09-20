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
// Смена картинок через деструктуризацию
// const command = document.getElementById('command');

//     const toggleImg = () => {
//       const target = event.target;

//       if (!target.matches('img')) return;

//       [target.dataset.img, target.src] = [target.src, target.dataset.img];
//     };

//     command.addEventListener('mouseover', toggleImg);
//     command.addEventListener('mouseout', toggleImg);
export default changeImg;