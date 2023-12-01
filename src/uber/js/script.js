window.addEventListener('DOMContentLoaded', () => {

    function formatPhoneNumber(phoneNumber) {
        try {
            const parsedNumber = libphonenumber.parsePhoneNumber(iti.getNumber());
            const formattedNumber = parsedNumber.formatInternational();
            return formattedNumber;
        } catch (error) {
            return phoneNumber.replace(/[^0-9+() -]/, '');
        }
    }
    
    function modalOpen(element, action) {
        let positionY = parseInt(window.getComputedStyle(element).top);
        if(positionY >= 0) {
            element.style.top = '0px';
            clearInterval(openInId);
            openInId = null;
            if(action != undefined) {
                action();
            }
            return undefined;
        }
        positionY += 10;
        element.style.top = `${positionY}px`;
    }
    
    function modalClose(element, action) {
        let positionY = parseInt(window.getComputedStyle(element).top);
        if(positionY <= -500) {	
            element.style.top = '-500px';
            clearInterval(closeInId);
            closeInId = null;
            if(action != undefined) {
                action();
            }
            return undefined;
        }
        positionY -= 10;	
        element.style.top = `${positionY}px`;
    }
    
    function modalOpenClose(element, action) {
        let positionY = parseInt(window.getComputedStyle(element).top);
        if(positionY < 0) {
            if(!openInId) {
                if(action != undefined) {
                    openInId = setInterval(modalOpen, 10, element, action);
                } else {
                    openInId = setInterval(modalOpen, 10, element);
                }
            }
        } else {
            if(!closeInId) {
                if(action != undefined) {
                    closeInId = setInterval(modalClose, 10, element, action);
                } else {
                    closeInId = setInterval(modalClose, 10, element);
                }
            }
        }
    }

    function modalSwitchDone(element) {
        modalOpenClose(element.querySelector('.phone__window'));
        modalOpenClose(element.querySelector('.phone__window_done'));
        doneOrderCallShow = true;
    }

    function modalSwitchToAnother(modalWindow) {
        if(modalWindow.className == 'phone__window phone__window_done') {
            const anoterWindow = modalWindow.parentNode.querySelector('.phone__window_order');
            modalWindow.style.top = `-500px`;
            anoterWindow.style.top = `0px`;
        } else {
            const anoterWindow = modalWindow.parentNode.querySelector('phone__window phone__window_done');
            modalWindow.style.top = '-500px';
            anoterWindow.style.top = '0px';
        }
    }
    
    function inputValidation(input) {
        if(input.name === 'name') {
            const formatName = /^[\s]*[^\!\@\#\$\%\^\&\*\=\+\~\`\{\}\[\]\\\|\'\"\;\:\/\?\.\>\,\<]*$/;
            const minNameLength = 2;
            const maxNameLength = 255;
            
            if(input.value.length >= minNameLength) {
                if(input.value.length <= maxNameLength) {
                    if(formatName.test(input.value)) {
                        deleteError(input);
                        return true;
                    } else {
                        showErrors(input, 'Спеціальні символи, які можна використати:\n ( ) - _');
                        return false;
                    }
                } else {
                    showErrors(input, 'Максимальна довжина імені: 255');
                    return false;
                }
            } else {
                showErrors(input, 'Мінімальна довжина імені: 2');
                return false;
            }
        }
    
        if(input.name === 'phone') {
            try {
                if(libphonenumber.parsePhoneNumber(input.value).isValid()) {
                    deleteError(input);
                    return true;
                } else {
                    showErrors(input, 'Перевірте, чи правильно написали номер телефону');
                    return false;
                }
            } catch (error) {
                showErrors(input, 'Перевірте, чи правильно написали номер телефону');
                return false;
                }
            }

        return false;
    }

    function showErrors(input, error) {
        if(!!input.parentNode.querySelector('.phone__form-error') == false) {
            const errorElement = document.createElement('label');
            errorElement.htmlFor = input.id;
            errorElement.className = 'phone__form-error';
            errorElement.innerText = error;
            input.parentNode.append(errorElement);
        } else {
            if(input.parentNode.querySelector('.phone__form-error').innerText == error) {

            } else {
                deleteError(input);
                const errorElement = document.createElement('label');
                errorElement.htmlFor = input.id;
                errorElement.className = 'phone__form-error';
                errorElement.innerText = error;
                input.parentNode.append(errorElement);
            }
        }
    }
    
    function deleteError(input) {
        if(!!input.parentNode.querySelector('.phone__form-error')) {
            input.parentNode.querySelector('.phone__form-error').remove();
        }
    }


    const menu = document.querySelector('.menu'),
          menuItem = document.querySelectorAll('.menu_item'),
          hamburger = document.querySelector('.menu_btn'),
          orderCallBtn = document.querySelector('.order_call'),
          phoneManager = document.querySelector('.phone'),
          phoneWindowOrder = document.querySelector('.phone__window_order'),
          phoneWindowDone = document.querySelector('.phone__window_done'),
          phoneWindowCloseBtn = document.querySelectorAll('.phone__window-close'),
          phoneInput = document.querySelector('#phone-input'),
          nameInput = document.querySelector('#name-input');

    let iti = window.intlTelInput(phoneInput, {
    initialCountry: 'auto',
    excludeCountries: ['ru', 'kp', 'ir', 'sy'],
    utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.13/build/js/utils.js',
}),
    users = [],
    closeInId,
    openInId,
    doneOrderCallShow = false;
    
    
    phoneInput.addEventListener('input', function (e) {
        let phoneNumber = phoneInput.value;
        if(phoneNumber.length === 1 && !iti.getSelectedCountryData().iso2) {
            if(phoneNumber !== '+') {
                phoneNumber = `+${phoneInput.value}`;
            }
        }
        let formattedNumber = formatPhoneNumber(phoneNumber);
        phoneInput.value = formattedNumber;
        inputValidation(e.target);
    });
    
    nameInput.addEventListener('input', (e)=> {
        inputValidation(e.target);
    });

    orderCallBtn.addEventListener('click', () => {
        if(!!document.querySelector('.order_call_active')) {
            const nameValidationResult = inputValidation(nameInput),
                  phoneValidationResult = inputValidation(phoneInput);
        
            if(nameValidationResult && phoneValidationResult) {
                const userData = {
                    userFirstName: nameInput.value,
                    userPhone: libphonenumber.parsePhoneNumber(phoneInput.value).number
                }
                users.push(userData);
                console.dir(users);
                modalSwitchDone(phoneManager);
                document.querySelector('.phone__form').reset();
                orderCallBtn.classList.remove('order_call_active');
            }
    
        } else {
            orderCallBtn.classList.toggle('order_call_active');
            modalOpenClose(phoneManager);
        }
    });

    phoneWindowCloseBtn.forEach((item)=>{
        item.addEventListener('click', (e)=> {
            if(doneOrderCallShow) {
                doneOrderCallShow = false;
                modalOpenClose(phoneManager, ()=>{
                    modalSwitchToAnother(phoneWindowDone);
                });
                
            } else {
                modalOpenClose(phoneManager);
            }
            modalOpenClose(phoneManager);
            orderCallBtn.classList.remove('order_call_active');
        });
    });

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
});