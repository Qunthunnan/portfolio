window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.menu_btn');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('menu_btn_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('menu_btn_active');
            menu.classList.toggle('menu_active');
        })
    })

    // scroll 

    function scroll(item) {
        $(item).click(function(){
            const _href = $(item).attr("href");
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
        });
    }

    scroll($("a[href=#main]"));
    scroll($("a[href=#reasons]"));
    scroll($("a[href=#terms]"));
    scroll($("a[href=#footer]"));
})