import { backendOriginUrl } from 'src/base/constants';

export const getLoginApiUrl = () => `${backendOriginUrl}login/`;

export const getLogoutApiUrl = () => `${backendOriginUrl}logout/`;

export const getRootApiUrl = () => `${backendOriginUrl}api/v1/`;

export const getStatusApiUrl = () => `${getRootApiUrl()}status/`;

export const getBooksApiUrl = () => `${getRootApiUrl()}books/`;

export interface BookPath {
  bookId: string;
}
export const getBookApiUrl = ({ bookId }: BookPath) =>
  `${getBooksApiUrl()}/${bookId}/`;
