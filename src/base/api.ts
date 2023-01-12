import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import applyConverters from 'axios-case-converter';
import { getLanguage } from 'src/base/i18n';

const requestFunc = (config: AxiosRequestConfig) => {
  let { headers } = config;
  if (!headers) {
    headers = new AxiosHeaders();
    config.headers = headers;
  }

  const language = getLanguage();
  if (language) {
    if (headers instanceof AxiosHeaders) {
      headers.set('Accept-Language', language);
    } else {
      headers['Accept-Language'] = language;
    }
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
