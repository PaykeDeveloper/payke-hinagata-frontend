import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { isDevelopment, isDebugTranslation } from 'src/base/constants';

// FIXME: SAMPLE CODE
import ja from './locales/ja.json';

export enum Language {
  Japanese = 'ja',
}

const resources = {
  [Language.Japanese]: {
    translation: ja,
  },
};

const i18n = i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: isDevelopment && isDebugTranslation,
    fallbackLng: 'ja',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export const getLanguage = (): string | undefined =>
  i18next.language || window.localStorage.i18nextLng;

export default i18n;
