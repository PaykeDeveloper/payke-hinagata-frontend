import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import applyConverters from 'axios-case-converter';
import { getLanguage } from 'src/base/i18n';

const requestFunc = (config: AxiosRequestConfig) => {
  const language = getLanguage();
  if (language) {
    config.headers.common['Accept-Language'] = language;
  }
  return config;
};

const index: AxiosInstance = applyConverters(axios.create());
index.defaults.withCredentials = true;
index.interceptors.request.use(requestFunc);
export default index;

export const { CancelToken } = axios;
