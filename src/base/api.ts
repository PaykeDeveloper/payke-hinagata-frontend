import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import applyConverters from 'axios-case-converter';
import { getLanguage } from 'src/base/i18n';

const requestFunc = (config: AxiosRequestConfig) => {
  const language = getLanguage();
  if (language) {
    config.headers.common['Accept-Language'] = language;
  }
  return config;
};

const api: AxiosInstance = applyConverters(axios.create());
api.defaults.withCredentials = true;
api.interceptors.request.use(requestFunc);
export default api;

export const isAxiosError = <T = unknown>(
  error: unknown
): error is AxiosError<T> => !!error && (error as AxiosError<T>).isAxiosError;

export const { CancelToken } = axios;
