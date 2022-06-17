import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import tranEn from './locales/en/en.json';
import tranKo from './locales/ko/ko.json';

export const languages = ['en', 'ko'] as const;

export type Languages = typeof languages[number]; // 'en' | 'ko'

const resources = {
  en: { translation: tranEn },
  ko: { translation: tranKo },
};
// navigator.language : chrome, firefox지원, ie미지원 // navigator:.userLanguage : ie만 지원
const userLanguage = window.navigator.language;
i18n.use(initReactI18next).init({
  // passes i18n down to react-i18next
  resources,
  lng: localStorage.getItem('language') || userLanguage || 'ko',
  fallbackLng: 'ko',
  // keySeparator: false,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
