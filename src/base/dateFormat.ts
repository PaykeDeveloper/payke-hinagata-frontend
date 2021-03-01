import { format, parseISO } from 'date-fns';
import { enUS, ja } from 'date-fns/locale';
import i18next from 'i18next';

const locales: { [key: string]: Locale } = { enUS, ja };

type Value = Date | string | null | undefined;

const formatWithLocale = (date: Value, formatStr: string) => {
  if (!date) {
    return date;
  }

  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, formatStr, { locale: locales[i18next.language] });
};

export const formatTimestamp = (value: Value) => formatWithLocale(value, 'Ppp');

export const formatDate = (value: Value) => formatWithLocale(value, 'P');

export const formatDateTime = (value: Value) => formatWithLocale(value, 'Pp');
