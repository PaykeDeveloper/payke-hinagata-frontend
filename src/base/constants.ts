enum WebpackMode {
  Production = 'production',
  Development = 'development',
}

const webpackMode = process.env.NODE_ENV as WebpackMode;

export const isDebugTranslation =
  process.env.REACT_APP_DEBUG_TRANSLATION === 'true';
export const isDevelopment = webpackMode === WebpackMode.Development;
export const isProduction = webpackMode === WebpackMode.Production;

export const backendOriginUrl = `${
  process.env.REACT_APP_BACKEND_ORIGIN || window.location.origin
}`;

// FIXME: SAMPLE CODE
export const siteName = 'Payke Hinagata';
