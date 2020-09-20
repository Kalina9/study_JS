const sendForm = (id, color) => {
    const errorMessage = "Что-то пошло не так...",
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
        mess.value = mess.value.replace(/^[?!,.а-яА-ЯёЁ0-9\s]+$/, "");
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
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Статус нетворк нот 200')
                }
                userName.forEach((item) => (item.value = ""));
                userEmail.forEach((item) => (item.value = ""));
                userPhone.forEach((item) => (item.value = ""));
                userMessage.forEach((item) => (item.value = ""));
                statusMessage.textContent = successMessage;
                setTimeout(() => {
                    statusMessage.textContent = "";
                }, 2000);
            })
            .catch(() => {
                statusMessage.textContent = errorMessage;
                // console.error(error);
            });
    });

    const postData = (body) => {
        return fetch("./server.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
    };
};

export default sendForm;