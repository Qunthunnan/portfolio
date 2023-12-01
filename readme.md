# Portfolio
## <span id = "ua">Опис проєкту</span>
Цей проєкт по суті є моїм власним резюме та демонструє мої інші проєкти, з якими я працював. У моєму портфоліо є також мої контактні дані та канал зв'язку через форму відправки повідомлень. 

<a href = "#en">English version of the documentation</a>

Сторонні бібліотеки, які використовує цей проєкт:
- <a target="_blank" href = "https://jquery.com/">Jquery</a>
- <a target="_blank" href = "https://jqueryvalidation.org/">jQuery Validation Plugin</a>

Посилання на документації інших проєктів, які представлені у цьому портфоліо:
- <a target="_blank" href = "https://github.com/Qunthunnan/Prengi">Prengi</a>
- <a target="_blank" href = "https://github.com/Qunthunnan/Wordpress">Wordpress</a>
- <a target="_blank" href = "https://github.com/Qunthunnan/pulse-project">Pulse</a>
- <a target="_blank" href = "https://github.com/Qunthunnan/Uber">Uber</a>

## Основні компоненти
### Відкриття меню з посиланнями
```javascript
hamburger.addEventListener('click', () => {
    hamburger.classList.add('promo__menu-btn_active');
    $('.promo__menu-overlay').fadeIn('300');
    menuBlock.classList.add('promo__menu-block_active');
    socials.classList.add('socials_menu-active');
});
```
Прослуховується кнопка для відкриття меню з посиланнями. При кліці перемикаються класи активності та відкривається меню з посиланнями на розділи, приховується блок з посиланнями на соціальні мережі.

### Перехід по посиланнях з меню
```javascript
menuItem.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('promo__menu-btn_active');
        $('.promo__menu-overlay').fadeOut('300');
        menuBlock.classList.remove('promo__menu-block_active');
        socials.classList.remove('socials_menu-active');
    })
});
```
Прослуховується кожен елемент посилання у меню. При кліці на посилання, перемикаються класи активності, закриваючи меню, відкриваючи блок з посиланнями на соціальні мережі.

### Зміна кольору у блоці з посиланнями на соціальні мережі
```javascript
$(window).scroll(function() {
    if ($(this).scrollTop() > window.innerHeight/2) {
        socials.classList.remove('socials_white');
        socials.classList.add('socials_black');
    } else {
        socials.classList.remove('socials_black');
        socials.classList.add('socials_white');
    }
});
```
Відстежується скроллінг на сторінці. У випадку, якщо позиція перегляду сторінки, виходить за половину висоти екрана, то перемикається клас у блоку з посиланнями. Прив'язка до висоти екрана тут коректна, бо перша секція з темним бекграундом завжди дорівнює висоті екрана користувача, а блок з посиланнями знаходиться посередині за висотою екрана.

### Регулювання ширини заповненості шкали відсотка прокаченості у "скілі"
```javascript
percentage.forEach((item, i) => {
    progressBar[i].style.width = item.innerHTML;
});
```
У кожного прогрессбару у секції скілів текстом вказан відсоток прокаченості. Цим кодом, я беру значення цього відсотка та записую у ширину "наповнення" прогресбаром. Ця секція може бути прихована у публічній версії портфоліо.

### Плавний перехід по внутрішнім посиланням
```javascript
function scroll(item) {
    $(item).click(function(){
        const _href = $(item).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
}
```
Функція додає до елементу посилання прослуховувач подій, який при кліці виконає анімований перехід до позиції елементу, на який посилались.

### Валідація форми
```javascript
function validateForm (form){
    let validation =
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            policy: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Введіть, будь ласка, своє ім'я",
                minlength: "Мінімальна довжина імені: {0} символа"
            },
            email: {
                required: "Введіть, будь ласка, свою електронну скриньку",
                email: "Перевірте, чи павильно ви написали пошту, повинен бути символ @"
            },
            policy: {
                required: "Необхідна ваша згода, щоби залишити повідомлення."
            }
            }
    });
    return validation.form();
}
```
Функція приймає форму та валідує її. Повертає результат валідації.
### Відправка даних на сервер
```javascript
$(".contacts__form").submit(function (e) {
    e.preventDefault();
    if(validateForm(this) == true) {
        $('.contacts__mail-sending').fadeIn();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function () {
        $(this).find("input").val("");
        $("form").trigger("reset");

        $('.contacts__mail-sending').fadeOut();
        $('.contacts__mail-sended').fadeIn();
    })
    }

    return false;
});
```
Прослуховування відправки повідомлення. Якщо дані користувача проходять валідацію, то його дані відправляються на сервер, з'являється повідомлення про успішну відправку.


# <span id = "en">Portfolio</span>
## Project Description
This project essentially serves as my personal resume, showcasing various projects I have worked on. My portfolio includes my contact information and a communication channel through a message submission form.

<a href = "#ua">Українська версія документації</a>

Third-party libraries used in this project:
- <a target="_blank" href = "https://jquery.com/">Jquery</a>
- <a target="_blank" href = "https://jqueryvalidation.org/">jQuery Validation Plugin</a>

Links to documentation of other projects featured in this portfolio:
- <a target="_blank" href = "https://github.com/Qunthunnan/Prengi">Prengi</a>
- <a target="_blank" href = "https://github.com/Qunthunnan/Wordpress">Wordpress</a>
- <a target="_blank" href = "https://github.com/Qunthunnan/pulse-project">Pulse</a>
- <a target="_blank" href = "https://github.com/Qunthunnan/Uber">Uber</a>

## Main Components
### Opening the menu with links
```javascript
hamburger.addEventListener('click', () => {
    hamburger.classList.add('promo__menu-btn_active');
    $('.promo__menu-overlay').fadeIn('300');
    menuBlock.classList.add('promo__menu-block_active');
    socials.classList.add('socials_menu-active');
});
```
Listens for the button to open the menu with links. Upon clicking, toggles active classes and opens the menu with links to sections, hiding the block with links to social networks.

### Navigation through menu links
```javascript
menuItem.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('promo__menu-btn_active');
        $('.promo__menu-overlay').fadeOut('300');
        menuBlock.classList.remove('promo__menu-block_active');
        socials.classList.remove('socials_menu-active');
    })
});
```
Listens to each menu link element. Upon clicking a link, toggles active classes, closing the menu and opening the block with links to social networks.

### Changing the color in the block with links to social networks
```javascript
$(window).scroll(function() {
    if ($(this).scrollTop() > window.innerHeight/2) {
        socials.classList.remove('socials_white');
        socials.classList.add('socials_black');
    } else {
        socials.classList.remove('socials_black');
        socials.classList.add('socials_white');
    }
});
```
Tracks scrolling on the page. If the scroll position exceeds half the height of the screen, toggles the class in the block with links. The height of the screen is correctly used here because the first section with a dark background always equals the user's screen height, and the block with links is positioned in the middle by height.

### Adjusting the width of the skill percentage progress bar
```javascript
percentage.forEach((item, i) => {
    progressBar[i].style.width = item.innerHTML;
});
```
Each progress bar in the skills section has a percentage of proficiency specified in text. With this code, I take the value of this percentage and write it into the width of the progress bar "filling." This section may be hidden in the public version of the portfolio.
### Smooth transition through internal links
```javascript
function scroll(item) {
    $(item).click(function(){
        const _href = $(item).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
}
```
The function adds an event listener to the link element that, when clicked, performs an animated transition to the position of the element it refers to.

### Form validation
```javascript
function validateForm (form){
    let validation =
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            policy: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Введіть, будь ласка, своє ім'я",
                minlength: "Мінімальна довжина імені: {0} символа"
            },
            email: {
                required: "Введіть, будь ласка, свою електронну скриньку",
                email: "Перевірте, чи павильно ви написали пошту, повинен бути символ @"
            },
            policy: {
                required: "Необхідна ваша згода, щоби залишити повідомлення."
            }
            }
    });
    return validation.form();
}
```
The function takes a form and validates it, returning the validation result.
### Sending data to the server
```javascript
$(".contacts__form").submit(function (e) {
    e.preventDefault();
    if(validateForm(this) == true) {
        $('.contacts__mail-sending').fadeIn();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function () {
        $(this).find("input").val("");
        $("form").trigger("reset");

        $('.contacts__mail-sending').fadeOut();
        $('.contacts__mail-sended').fadeIn();
    })
    }

    return false;
});
```
Listens for message submission. If user data passes validation, the data is sent to the server, and a success message appears.
