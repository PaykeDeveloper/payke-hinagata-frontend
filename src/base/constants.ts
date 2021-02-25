enum WebpackMode {
  Production = 'production',
  Development = 'development',
}

const webpackMode = process.env.NODE_ENV as WebpackMode;
export const isDevelopment = webpackMode === WebpackMode.Development;
export const isProduction = webpackMode === WebpackMode.Production;

export const backendOriginUrl = `${
  process.env.REACT_APP_BACKEND_ORIGIN || window.location.origin
}/`;

export const siteName = 'Payke Hinagata';
