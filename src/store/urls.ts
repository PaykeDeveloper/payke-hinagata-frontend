import { backendOriginUrl } from 'src/base/constants';

export const getLoginApiUrl = () => `${backendOriginUrl}/login`;

export const getLogoutApiUrl = () => `${backendOriginUrl}/logout`;

export const getRegisterApiUrl = () => `${backendOriginUrl}/register`;

export const getForgotPasswordApiUrl = () =>
  `${backendOriginUrl}/forgot-password`;

export const getResetPasswordApiUrl = () =>
  `${backendOriginUrl}/reset-password`;

export interface VerifyEmailApiUrl {
  id: string;
  token: string;
}
export const getVerifyEmailApiUrl = ({ id, token }: VerifyEmailApiUrl) =>
  `${backendOriginUrl}/email/verify/${id}/${token}`;

export const getChangePasswordApiUrl = () =>
  `${backendOriginUrl}/user/password`;

export const getRootApiUrl = () => `${backendOriginUrl}/api/v1`;

export const getStatusApiUrl = () => `${getRootApiUrl()}/status`;

export interface InvitationApiUrl {
  invitationId: string;
}
export const getInvitationsApiUrl = () => `${getRootApiUrl()}/invitations`;
export const getInvitationApiUrl = ({ invitationId }: InvitationApiUrl) =>
  `${getInvitationsApiUrl()}/${invitationId}`;

export const getRolesApiUrl = () => `${getRootApiUrl()}/roles`;

export const getLocalesApiUrl = () => `${getRootApiUrl()}/locales`;

export interface UserApiUrl {
  userId: string;
}
export const getUsersApiUrl = () => `${getRootApiUrl()}/users`;
export const getUserApiUrl = ({ userId }: UserApiUrl) =>
  `${getUsersApiUrl()}/${userId}`;
export const getMyUserApiUrl = () => `${getRootApiUrl()}/user`;

// FIXME: SAMPLE CODE

export interface DivisionApiUrl {
  divisionId: string;
}
export const getDivisionsApiUrl = () => `${getRootApiUrl()}/divisions`;
export const getDivisionApiUrl = ({ divisionId }: DivisionApiUrl) =>
  `${getDivisionsApiUrl()}/${divisionId}`;

export interface ProjectApiUrl extends DivisionApiUrl {
  projectSlug: string;
}
export const getProjectsApiUrl = ({ divisionId }: DivisionApiUrl) =>
  `${getDivisionsApiUrl()}/${divisionId}/projects`;
export const getProjectApiUrl = ({ divisionId, projectSlug }: ProjectApiUrl) =>
  `${getProjectsApiUrl({ divisionId })}/${projectSlug}`;
export const getProjectsDownloadApiUrl = ({ divisionId }: DivisionApiUrl) =>
  `${getProjectsApiUrl({ divisionId })}/download`;

export interface MemberApiUrl extends DivisionApiUrl {
  memberId: string;
}
export const getMembersApiUrl = ({ divisionId }: DivisionApiUrl) =>
  `${getDivisionsApiUrl()}/${divisionId}/members`;
export const getMemberApiUrl = ({ divisionId, memberId }: MemberApiUrl) =>
  `${getMembersApiUrl({ divisionId })}/${memberId}`;
