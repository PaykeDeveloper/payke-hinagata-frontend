import { backendOriginUrl } from 'src/base/constants';

export const getLoginApiUrl = () => `${backendOriginUrl}login/`;

export const getLogoutApiUrl = () => `${backendOriginUrl}logout/`;

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
  commentId: string;
}
export const getBookCommentsApiUrl = ({ bookId }: BookApiUrl) =>
  `${getBooksApiUrl()}${bookId}/comments/`;
export const getBookCommentApiUrl = ({
  bookId,
  commentId,
}: BookCommentApiUrl) => `${getBookCommentsApiUrl({ bookId })}${commentId}/`;

export interface UserApiUrl {
  userId: string;
}
export const getUsersApiUrl = () => `${getRootApiUrl()}users/`;
export const getUserApiUrl = ({ userId }: UserApiUrl) =>
  `${getUsersApiUrl()}${userId}/`;

export interface DivisionApiUrl {
  divisionId: string;
}
export const getDivisionsApiUrl = () => `${getRootApiUrl()}divisions/`;
export const getDivisionApiUrl = ({ divisionId }: DivisionApiUrl) =>
  `${getDivisionsApiUrl()}${divisionId}/`;

export interface DivisionProjectApiUrl extends DivisionApiUrl {
  divisionId: string;
  projectId: string;
}
export const getDivisionProjectsApiUrl = ({ divisionId }: DivisionApiUrl) =>
  `${getDivisionsApiUrl()}${divisionId}/projects/`;
export const getDivisionProjectApiUrl = ({
  divisionId,
  projectId,
}: DivisionProjectApiUrl) =>
  `${getDivisionProjectsApiUrl({ divisionId })}${projectId}/`;
