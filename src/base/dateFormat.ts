import { enUS, ja } from 'date-fns/locale';
import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import i18next from 'i18next';

const locales: { [key: string]: Locale } = { enUS, ja };

type Value = Date | string | number | null | undefined;

const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const formatUtcToZoned = (date: Value, formatStr: string) => {
  if (!date) {
    return '';
  }

  const d = utcToZonedTime(date, getTimeZone());
  return format(d, formatStr, {
    locale: locales[i18next.language],
    timeZone: getTimeZone(),
  });
};

export const formatDate = (value: Value) => formatUtcToZoned(value, 'P');
export const formatMonth = (value: Value) => formatUtcToZoned(value, 'yyyy-MM');
export const formatUtcToZonedDateTime = (value: Value) =>
  formatUtcToZoned(value, 'Pp');
export const formatUtcToZonedTimestamp = (value: Value) =>
  formatUtcToZoned(value, 'Ppp');

export const formatZonedToUtc = (date: Value) => {
  if (!date) {
    return date;
  }

  return zonedTimeToUtc(date, getTimeZone()).toISOString();
};
