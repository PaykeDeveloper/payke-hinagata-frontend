import { backendOriginUrl } from 'src/base/constants';

export const getLoginApiUrl = () => `${backendOriginUrl}login/`;

export const getLogoutApiUrl = () => `${backendOriginUrl}logout/`;

export const getRootApiUrl = () => `${backendOriginUrl}api/v1/`;

export const getStatusApiUrl = () => `${getRootApiUrl()}status/`;

export interface BookUrl {
  bookId: string;
}
export const getBooksApiUrl = () => `${getRootApiUrl()}books/`;
export const getBookApiUrl = ({ bookId }: BookUrl) =>
  `${getBooksApiUrl()}${bookId}/`;

export interface BookCommentUrl extends BookUrl {
  commentId: string;
}
export const getBookCommentsApiUrl = ({ bookId }: BookUrl) =>
  `${getBooksApiUrl()}${bookId}/comments/`;
export const getBookCommentApiUrl = ({ bookId, commentId }: BookCommentUrl) =>
  `${getBookCommentsApiUrl({ bookId })}${commentId}/`;
