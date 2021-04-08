import { backendOriginUrl } from 'src/base/constants';

export const getLoginApiUrl = () => `${backendOriginUrl}login/`;

export const getLogoutApiUrl = () => `${backendOriginUrl}logout/`;

export const getForgotPasswordApiUrl = () =>
  `${backendOriginUrl}forgot-password/`;

export const getResetPasswordApiUrl = () =>
  `${backendOriginUrl}reset-password/`;

export const getRootApiUrl = () => `${backendOriginUrl}api/v1/`;

export const getStatusApiUrl = () => `${getRootApiUrl()}status/`;

// FIXME: SAMPLE CODE

export interface BookApiUrl {
  bookId: string;
}
export const getBooksApiUrl = () => `${getRootApiUrl()}books/`;
export const getBookApiUrl = ({ bookId }: BookApiUrl) =>
  `${getBooksApiUrl()}${bookId}/`;

export interface BookCommentApiUrl extends BookApiUrl {
  commentSlug: string;
}
export const getBookCommentsApiUrl = ({ bookId }: BookApiUrl) =>
  `${getBooksApiUrl()}${bookId}/comments/`;
export const getBookCommentApiUrl = ({
  bookId,
  commentSlug,
}: BookCommentApiUrl) => `${getBookCommentsApiUrl({ bookId })}${commentSlug}/`;
