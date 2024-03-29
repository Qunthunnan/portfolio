import jQuery from "jquery";
import validate from 'jquery-validation';
import {setLocale, LangWidget} from './localeWidget';
const ditictionary = require('../ditictionary.json');
const lang = document.documentElement.getAttribute('lang');
window.$ = window.jQuery = jQuery;

//Localization setting
setLocale();

//Localization widget create
const localeWidget = new LangWidget({
    uk: 'Українська',
    en: 'English',
});

// promo menu

const menu = document.querySelector('.promo__menu-overlay'),
menuBlock = document.querySelector('.promo__menu-block'),
menuItem = document.querySelectorAll('.promo__menu-item'),
socials = document.querySelector('.socials'),
hamburger = document.querySelector('.promo__menu-btn');

hamburger.addEventListener('click', () => {
    hamburger.classList.add('promo__menu-btn_active');
    $('.promo__menu-overlay').fadeIn('300');
    menuBlock.classList.add('promo__menu-block_active');
    socials.classList.add('socials_menu-active');
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('promo__menu-btn_active');
        $('.promo__menu-overlay').fadeOut('300');
        menuBlock.classList.remove('promo__menu-block_active');
        socials.classList.remove('socials_menu-active');
    })
});

//social color

$(window).scroll(function() {
    if ($(this).scrollTop() > window.innerHeight/2) {
        socials.classList.remove('socials_white');
        socials.classList.add('socials_black');
    } else {
        socials.classList.remove('socials_black');
        socials.classList.add('socials_white');
    }
});

//skills percentage

const percentage = document.querySelectorAll('.skills__percentage'),
    progressBar = document.querySelectorAll('.skills__progress');

percentage.forEach((item, i) => {
    progressBar[i].style.width = item.innerHTML;
});
// scroll 
$(document).ready(function() {
    function scroll(item) {
        $(item).click(function(){
            const _href = $(item).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
        });
    }

    scroll($("a[href='#about-me']"));
    scroll($("a[href='#exp-edu']"));
    scroll($("a[href='#tools']"));
    scroll($("a[href='#portfolio']"));
    scroll($("a[href='#contacts']"));
});
//validator
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
            required: ditictionary['messagesName'][lang],
            minlength: ditictionary['messagesNameLength'][lang]
        },
        email: {
            required: ditictionary['messagesEmail'][lang],
            email: ditictionary['messagesEmailCorrect'][lang]
        },
        policy: {
            required: ditictionary['messagesPolicy'][lang]
        }
    }
});
return validation.form();
 }
//send mail
$(".contacts__form").submit(function (e) {
    e.preventDefault();
    if(validateForm(this) === true) {
        debugger;
        let userData = new FormData(e.target);
        userData.append('lang', lang);
        $('.contacts__mail-sending').fadeIn();
    $.ajax({
        type: "POST",
        url: "/smart.php",
        data: $.param(Object.fromEntries(userData.entries())),
    }).done(function () {
        $(this).find("input").val("");
        $("form").trigger("reset");

        $('.contacts__mail-sending').fadeOut();
        $('.contacts__mail-sended').fadeIn();
    })
    }

    return false;
});

