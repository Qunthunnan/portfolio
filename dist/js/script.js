$(document).ready(function() {
// promo menu
    const menu = document.querySelector('.promo__menu-wrapper'),
    menuBlock = document.querySelector('.promo__menu-block'),
    menuItem = document.querySelectorAll('.promo__menu-item'),
    socials = document.querySelector('.socials'),
    hamburger = document.querySelector('.promo__menu-btn');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('promo__menu-btn_active');
        menu.classList.toggle('promo__menu-wrapper_active');
        menuBlock.classList.toggle('promo__menu-block_active');
        socials.classList.toggle('socials_menu-active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('promo__menu-btn_active');
            menu.classList.toggle('promo__menu-wrapper_active');
            menuBlock.classList.toggle('promo__menu-block_active');
            socials.classList.toggle('socials_menu-active');
        })
    })

});