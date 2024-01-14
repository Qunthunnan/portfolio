"use strict"
const lang = localStorage.getItem('lang'),
    ditictionary = require('@/ditictionary.json');
if(!lang) {
    if(navigator.languages.some((item) => item === 'uk' || item === 'uk-UA' || item === 'ru' || item === 'ru-RU')) {
        lang = 'uk';
    } else {
        lang = 'en';
    }
    localStorage.setItem('lang', lang);
}

class LangWidget {
    constructor(languages) {
        if(Object.keys(languages)) {
            this.languages = languages;
        } else {
            try {
                throw new Error('languages is not object or not defined');
            } catch (error) {
                console.Error(error);
            }
        }
        this.element = document.createElement('div');
        this.element.classList.add('locale_widget');
        let ulListLocales = document.createElement('ul');
        ulListLocales.classList.add('locale_widget__languages');
        for(let i = 0; i < Object.keys(this.languages).length; i++) {
            let language = document.createElement('li');
            language.setAttribute('lang', Object.keys(this.languages)[i])
            language.classList.add('locale_widget__locale');
            ulListLocales.append(language);
        }
        this.element.append(ulListLocales);
        document.append(this.element);
    }
}

module.exports = {LangWidget, lang}