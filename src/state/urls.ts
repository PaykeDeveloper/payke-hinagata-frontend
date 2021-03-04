import { backendOriginUrl } from 'src/base/constants';

export const getLoginApiUrl = () => `${backendOriginUrl}login/`;

export const getLogoutApiUrl = () => `${backendOriginUrl}logout/`;

export const getRootApiUrl = () => `${backendOriginUrl}api/v1/`;

export const getStatusApiUrl = () => `${getRootApiUrl()}status/`;

export interface BookApiUrl {
  bookId: string;
}
export const getBooksApiUrl = () => `${getRootApiUrl()}books/`;
export const getBookApiUrl = ({ bookId }: BookApiUrl) =>
  `${getBooksApiUrl()}${bookId}/`;

export interface BookCommentApiUrl extends BookApiUrl {
  commentId: string;
}
export const getBookCommentsApiUrl = ({ bookId }: BookApiUrl) =>
  `${getBooksApiUrl()}${bookId}/comments/`;
export const getBookCommentApiUrl = ({
  bookId,
  commentId,
}: BookCommentApiUrl) => `${getBookCommentsApiUrl({ bookId })}${commentId}/`;
