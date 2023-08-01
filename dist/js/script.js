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
