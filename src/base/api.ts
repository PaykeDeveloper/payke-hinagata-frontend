import axios, { AxiosError, AxiosHeaders } from 'axios';
import applyConverters from 'axios-case-converter';
import { getLanguage } from 'src/base/i18n';

const api = applyConverters(axios.create(),{
  caseOptions: { stripRegexp: /[^A-Z0-9[.\]]+/gi },
});
api.defaults.withCredentials = true;
api.interceptors.request.use((config) => {
  let { headers } = config;
  if (!headers) {
    headers = new AxiosHeaders();
    config.headers = headers;
  }

  const language = getLanguage();
  if (language) {
    headers.set('Accept-Language', language);
  }
  return config;
});
export default api;

export const isAxiosError = <T = unknown>(
  error: unknown
): error is AxiosError<T> => !!error && (error as AxiosError<T>).isAxiosError;

export const { CancelToken } = axios;
