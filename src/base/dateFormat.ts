import { format, parseISO } from 'date-fns';
import { enUS, ja } from 'date-fns/locale';
import i18next from 'i18next';

const locales: { [key: string]: Locale } = { enUS, ja };

const getLocale = (): Locale | undefined => locales[i18next.language];

const formatWithLocale = (date: Date, formatStr: string) =>
  format(date, formatStr, { locale: getLocale() });

export const formatTimestampString = (
  timestamp: string | null | undefined,
  formatStr = 'Ppp'
) => timestamp && formatWithLocale(parseISO(timestamp), formatStr);

export const formatDateString = (
  date: string | null | undefined,
  formatStr = 'P'
) => date && formatWithLocale(parseISO(date), formatStr);

export const formatDate = (date: string | null | undefined, formatStr = 'P') =>
  date && formatWithLocale(parseISO(date), formatStr);

export const formatDateTime = (
  date: string | null | undefined,
  formatStr = 'Pp'
) => date && formatWithLocale(parseISO(date), formatStr);
