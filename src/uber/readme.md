# <span id = "ua">Uber</span>
## Зміст
- <a href = "#ua">Українська версія документації</a>
    - <a href = "#descrUa">Опис проєкту</a>
    - <a href = "#mainFooUa">Основні функції</a>
    - <a href = "#eventListenersUa">Прослуховування та обробка подій</a>
- <a href = "#en">English version of the documentation</a>
    - <a href = "#descrEn">Project description</a>
    - <a href = "#mainFooEn">Main functions</a>
    - <a href = "#eventListenersEn">Event Listeners and Event Handling</a>
## <span id = "descrUa">Опис проєкту</span>
Проєкт реалізує приклад сторінки лендінгу компанії, яка представляє послуги компанії Uber. На цій сторінці реалізоване меню замовлення дзвінка.
Код проєкту майже повністю зроблений на нативному JS. Єдиний функціонал, який використовує Jquery - це функція <a href = "#scrollUa">`scroll(item)`</a>, яка забезпечує плавний перехід до секцій сторінки з меню у header. 

Сторонні бібліотеки, які були використані у проєкті:
- <a target="_blank" href = "https://jquery.com/">Jquery</a>
- <a target="_blank" href = "https://github.com/catamphetamine/libphonenumber-js">libphonenumber-js</a>
- <a target="_blank" href = "https://intl-tel-input.com/">intl-tel-input</a>

## <span id = "mainFooUa">Основні функції</span>
### Функція `formatPhoneNumber`
```javascript
    function formatPhoneNumber(phoneNumber)
```
Ця функція відповідає за форматування номера телефону в міжнародному форматі за допомогою бібліотеки `libphonenumber-js`. У випадку помилки вона повертає вихідний номер без змін.
### `Функції` `modalOpen`, `modalClose`, `modalOpenClose`
```javascript
    function modalOpen(element, action)
    function modalClose(element, action)
    function modalOpenClose(element, action)
```
Ці функції реалізують анімаційне відкривання та закривання модальних вікон. Вони використовуються для анімаційного з'явлення та зникнення блоків на сторінці.
### Функції `modalSwitchDone` та `modalSwitchToAnother`
```javascript
    function modalSwitchDone(element)
    function modalSwitchToAnother(modalWindow)
```
Ці функції відповідають за перемикання між різними модальними вікнами. Наприклад, вони використовуються для перемикання між вікном замовлення та вікном, яке відображає успішне завершення дзвінка.
### Функція `inputValidation`
```javascript
    function inputValidation(input)
```
Ця функція проводить валідацію введених даних в поля форми, таких як ім'я та номер телефону. Використовує регулярні вирази та бібліотеку libphonenumber для перевірки коректності введених даних.
### Функції `showErrors` та `deleteError`
``` javascript
function showErrors(input, error)
function deleteError(input)
```
Ці функції відповідають за відображення та видалення повідомлень про помилки під полями введення форми.

### <span id = "scrollUa">Функція `scroll`</span>
``` javascript
scroll(item)
```
Реалізує плавний перехід на секцію сторінку при кліці на посилання.
## <span id = "eventListenersUa">Прослуховування та обробка подій</span>
### Редагування номера телефона
``` javascript
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
```
Прослуховується введення номера телефону в input для того, щоби форматувати його під регіональний формат користувача, перевіряється коректність номера.
### Перевірка поля імені
```javascript
    nameInput.addEventListener('input', (e)=> {
        inputValidation(e.target);
    });
```
Прослуховування інпуту імені та перевірка на заборонені символи в імені.
### Клік на кнопку "Замовити дзвінок"
```javascript
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
```
Прослуховується клік на кнопку "Замовити дзвінок". Через те, що елемент кнопки слугує як і для відкриття меню, так і для замовлення дзвінка, то перевіряється стан кнопки. Якщо меню не було відкрито - відкривається вікно, якщо меню відкрите, то дані користувача проходять валідацію, та у випадку успіху - дані записуються і можуть бути відправлені на сервер.
### Закриття меню замовлення дзвінка
``` javascript
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
```
Прослуховується клік на кнопку закриття вікна. Якщо це звичайне меню замовлення дзвінка, то воно просто закривається, якщо це меню після успішного замовлення дзвінка, то воно закривається, та після приховано міняється стан вікна на початковий.
### Відкриття\закриття мобільного меню
```javascript
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('menu_btn_active');
        menu.classList.toggle('menu_active');
    });
```
У мобільній версії хедер перетворюється на меню, яке можна відкрити, клікнув на кнопку у вигляді гамбургера. Цей обробник прослуховує цю кнопку, та перемикає класи активності для кнопки та меню, відкриваючи, або закриваючи меню.
### Перехід за посиланням з мобільного меню
```javascript  
    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('menu_btn_active');
            menu.classList.toggle('menu_active');
        })
    })
```
Прослуховуються посилання у мобільній версії меню. Якщо відбувається перехід за посиланням, перемикаються класи активності для кнопки та меню.
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
У функції `scroll(item)` до переданого в аргументі елементу прикріплюється прослуховувач кліку, який анімує перехід до розділу, плавним скроллом до позиції цього розділу.


# <span id = "en">Uber</span>
## <span id="descrEn">Project Description</span>
The project implements an example landing page for a company representing Uber's services. The page features an order call menu implemented in native JS. The only functionality that uses jQuery is the <a href="#scrollEn">scroll(item)</a> function, which provides smooth scrolling to page sections from the menu in the header.

Third-party libraries used in the project:
- <a target="_blank" href = "https://jquery.com/">Jquery</a>
- <a target="_blank" href = "https://github.com/catamphetamine/libphonenumber-js">libphonenumber-js</a>
- <a target="_blank" href = "https://intl-tel-input.com/">intl-tel-input</a>

## <span id="mainFooEn">Main Functions</span>
### Function `formatPhoneNumber`
```javascript
    function formatPhoneNumber(phoneNumber)
```
This function is responsible for formatting the phone number in international format using the `libphonenumber-js` library. In case of an error, it returns the original number unchanged.
### Functions `modalOpen`, `modalClose`, `modalOpenClose`
```javascript
    function modalOpen(element, action)
    function modalClose(element, action)
    function modalOpenClose(element, action)
```
These functions implement the animated opening and closing of modal windows. They are used for the animated appearance and disappearance of blocks on the page.
### Functions `modalSwitchDone` and `modalSwitchToAnother`
```javascript
    function modalSwitchDone(element)
    function modalSwitchToAnother(modalWindow)
```
These functions are responsible for switching between different modal windows. For example, they are used to switch between the order window and the window displaying the successful completion of the call.
### Function `inputValidation`
```javascript
    function inputValidation(input)
```
This function validates the entered data in form fields, such as name and phone number. It uses regular expressions and the libphonenumber library to check the correctness of the entered data.
### Functions `showErrors` and `deleteError`
``` javascript
function showErrors(input, error)
function deleteError(input)
```
These functions are responsible for displaying and removing error messages under the input fields of the form.

### <span id="scrollEn">Function `scroll`</span>
``` javascript
scroll(item)
```
Implements smooth scrolling to a section of the page when clicking on a link.
## <span id="eventListenersEn">Event Listeners and Event Handling</span>
### Editing the phone number
``` javascript
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
```
Listens for input of the phone number in the input to format it according to the user's regional format and checks the correctness of the number.
### Checking the name field
```javascript
    nameInput.addEventListener('input', (e)=> {
        inputValidation(e.target);
    });
```
Listens for input in the name input and checks for forbidden characters in the name.
### Click on the "Order a Call" button
```javascript
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
```
Listens for a click on the "Order a Call" button. Since the button element serves both to open the menu and to order a call, it checks the button's state. If the menu has not been opened, it opens the window. If the menu is open, user data undergo validation, and in case of success, the data is recorded and can be sent to the server.
### Closing the order call menu
``` javascript
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
```
Listens for a click on the window close button. If it is a regular order call menu, it simply closes. If it is the menu after a successful call order, it closes, and after hiding, the window state is changed to the initial one.
### Opening/Closing the mobile menu
```javascript
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('menu_btn_active');
        menu.classList.toggle('menu_active');
    });
```
In the mobile version, the header transforms into a menu that can be opened by clicking on the hamburger button. This handler listens to this button and toggles activity classes for the button and menu, opening or closing the menu.
### Transition with a link from the mobile menu
```javascript  
    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('menu_btn_active');
            menu.classList.toggle('menu_active');
        })
    })
```
Listens for links in the mobile version of the menu. If a link is clicked, it toggles activity classes for the button and menu.
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
In the `scroll(item)` function, a click listener is attached to the element passed as an argument. It animates the transition to a section by smoothly scrolling to the position of that section.