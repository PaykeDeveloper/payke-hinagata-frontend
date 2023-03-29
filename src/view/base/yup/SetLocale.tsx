import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleObject, setLocale } from 'yup';
import { suggestive as ja } from 'yup-locale-ja';
import { Language } from 'src/base/i18n';

const locales: { [key: string]: LocaleObject } = {
  [Language.Japanese]: ja,
};

const SetLocale: FC = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const locale = locales[language];
  useEffect(() => {
    if (locale) {
      setLocale(locale);
    }
  }, [locale]);
  return <></>;
};

export default SetLocale;
