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

export interface UserApiUrl {
  userId: string;
}
export const getUsersApiUrl = () => `${getRootApiUrl()}users/`;
export const getUserApiUrl = ({ userId }: UserApiUrl) =>
  `${getUsersApiUrl()}${userId}/`;
export const getMyUserApiUrl = () => `${getRootApiUrl()}user/`;

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

export interface DivisionMemberApiUrl extends DivisionApiUrl {
  divisionId: string;
  memberId: string;
}
export const getDivisionMembersApiUrl = ({ divisionId }: DivisionApiUrl) =>
  `${getDivisionsApiUrl()}${divisionId}/members/`;
export const getDivisionMemberApiUrl = ({
  divisionId,
  memberId,
}: DivisionMemberApiUrl) =>
  `${getDivisionMembersApiUrl({ divisionId })}${memberId}/`;
