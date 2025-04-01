import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import translationEN from '../locales/en/translation.json';
import translationVI from '../locales/vi/translation.json';
import translationRU from '../locales/ru/translation.json';
import translationFR from '../locales/fr/translation.json';
import translationDE from '../locales/de/translation.json';
import translationPT from '../locales/pt/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  vi: {
    translation: translationVI
  },
  ru: {
    translation: translationRU
  },
  fr: {
    translation: translationFR
  },
  de: {
    translation: translationDE
  },
  pt: {
    translation: translationPT
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;