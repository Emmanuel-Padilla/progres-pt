import en from "../utils/translate/en.js";
import es from "../utils/translate/es.js";

const DEFAULT_LANGUAGE = 'en';

export const setLanguage = (currentLanguage: string) => {    
    let languageToSet:any = null;
    
    if (currentLanguage) {
        if (currentLanguage === "en") languageToSet = "es"
        if (currentLanguage === "es") languageToSet = "en"
    }

    if (!languageToSet) languageToSet = DEFAULT_LANGUAGE

    translate(languageToSet);
    translateMenu(languageToSet);
}


export const translate = (language: string) => {
    try {
        // get all the elements with the data attribute 'data-translate'
        const phrases = document.querySelectorAll('[data-translate]') as any;
        let dictionary: any = null;
            
        // set as dictionary the json object, depending on the language pass as parameter
        if (language === "es") dictionary = en; 
        if (language === "en") dictionary = es;
                
        if (dictionary === null) throw new Error("No language accepted");

        // set the new value of language in the localstorage
        // this for save the language selected for the last time
        const content = {
            es: {
              button: "English",
            },
            en: {
              button: "Español",
            },
          };
        console.log("Asi lo estamos regresando",content[language].button);
        
        window.localStorage.setItem("languageDefault", language);
    
        for (const elementHtml of phrases) {
            let phraseCleaned = elementHtml.getAttribute('data-translate') as any
    
            // if in the dictionary (the json) contains the key of the phrase change it in the html
            if (dictionary.hasOwnProperty(phraseCleaned)) {
                elementHtml.innerText = dictionary[phraseCleaned]
            }

            if (dictionary.hasOwnProperty(phraseCleaned) && elementHtml.ariaPlaceholder) {
                elementHtml.placeholder = dictionary[phraseCleaned]
                elementHtml.value =  ''; // this is a fix, but not the best solution
            }

        }

        // remove the color blue in the label of the language before, and set the color in the new language selected
        const activelanguage = document.getElementsByClassName("active-language");

        for(var i = 0; i < activelanguage.length; i++) {
            activelanguage[i].classList.remove("active-language");
        }
        
        // add active language
        const languageLabel = document.getElementsByClassName(`language-${language}`);

        for(var i = 0; i < languageLabel.length; i++) {
            languageLabel[i].classList.add("active-language");
        }
        
    } catch (error) {
        console.log(error);
    }

}

export const  translateMenu = (language: string ) => {
    const dictionary:any = language === 'en' ? en : es;
    const menuLinks = document.querySelectorAll('.menu__link');
    
    menuLinks.forEach(link => {
        const translateKey = link.getAttribute('data-translate-key');
        if (translateKey && dictionary[translateKey]) {
            const spanElement = link.querySelector('span');
            if (spanElement && spanElement.lastChild) {
                spanElement.lastChild.nodeValue = dictionary[translateKey];
            }
        }
    });
}