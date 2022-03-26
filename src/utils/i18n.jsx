//Funciones para internacionalizar su extensión. Es posible utilizar estas API para obtener cadenas de texto traducidas a partir de archivos de configuración regional incluidos en la extensión, conocer el idioma actual del navegador y recuperar el valor de su cabecera Accept-Language.
import i18next from 'i18next'
import {initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'

// Se debe configurar una vez para iniciar todos los aspectos de i18n
i18next
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // detecta el idioma de forma autómatica en detection: order: {}
  .use(HttpApi) // un peque backend para almadenar la info backend: 
  .init({
    fallbackLng: "es",
    detection: {
        order: ['htmlTag', 'cookie', 'localStorage', 'path', 'subdomain'], // orden donde se mira el idioma a usar
        caches: ['cookie']
    },
    backend: {
        loadPath: '/locales/{{lng}}/translation.json' // los archivos se encuentran en /public/locales/..
    }
  });

export default i18next