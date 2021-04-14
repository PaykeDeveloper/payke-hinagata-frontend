import { backendOriginUrl } from 'src/base/constants';

export const getLoginApiUrl = () => `${backendOriginUrl}login/`;

export const getLogoutApiUrl = () => `${backendOriginUrl}logout/`;

export const getRegisterApiUrl = () => `${backendOriginUrl}register/`;

export const getForgotPasswordApiUrl = () =>
  `${backendOriginUrl}forgot-password/`;

export const getResetPasswordApiUrl = () =>
  `${backendOriginUrl}reset-password/`;

export interface VerifyEmailApiUrl {
  id: string;
  token: string;
}
export const getVerifyEmailApiUrl = ({ id, token }: VerifyEmailApiUrl) =>
  `${backendOriginUrl}email/verify/${id}/${token}/`;

export const getRootApiUrl = () => `${backendOriginUrl}api/v1/`;

export const getStatusApiUrl = () => `${getRootApiUrl()}status/`;

export interface InvitationApiUrl {
  invitationId: string;
}
export const getInvitationsApiUrl = () => `${getRootApiUrl()}invitations/`;
export const getInvitationApiUrl = ({ invitationId }: InvitationApiUrl) =>
  `${getInvitationsApiUrl()}${invitationId}/`;

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
