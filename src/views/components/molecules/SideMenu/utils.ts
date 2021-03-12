import { matchPath } from 'react-router-dom';

export const getExactMatch = <T = unknown>(
  paths: string[],
  pathname: string
) => {
  for (const path of paths) {
    const result = matchPath<T>(pathname, { path, exact: true });
    if (result) {
      return result;
    }
  }
  return undefined;
};
