export const otherPath = '*';
export const rootPath = '/';
export const loginPath = `/login`;
export const registerPath = `/register`;
export const forgotPasswordPath = `/forgot-password`;
export const resetPasswordPath = `/reset-password`;

export interface VerifyEmailPath {
  id: string;
  token: string;
}
export const getVerifyEmailPath = ({ id, token }: VerifyEmailPath) =>
  `/email/verify/${id}/${token}`;
export const verifyEmailPath = getVerifyEmailPath({
  id: ':id',
  token: ':token',
});

export const changePasswordPath = `/user/password`;
export const myUserEditPath = `/user/edit`;

export interface InvitationPath {
  invitationId: string;
}
const invitationParams = { invitationId: ':invitationId' };
export const getInvitationEditPath = ({ invitationId }: InvitationPath) =>
  `${invitationsPath}/${invitationId}/edit`;
export const invitationsPath = `/invitations`;
export const invitationNewPath = `/invitations/new`;
export const invitationEditPath = getInvitationEditPath(invitationParams);

export interface UserPath {
  userId: string;
}
const userParams = { userId: ':userId' };
export const getUserPath = ({ userId }: UserPath) => `${usersPath}/${userId}`;
export const getUserEditPath = (params: UserPath) =>
  `${getUserPath(params)}/edit`;
export const usersPath = `/users`;
export const userPath = getUserPath(userParams);
export const userEditPath = getUserEditPath(userParams);

// FIXME: SAMPLE CODE

export interface DivisionPath {
  divisionId: string;
}
const divisionParams = { divisionId: ':divisionId' };
const getDivisionPath = ({ divisionId }: DivisionPath) =>
  `${divisionsPath}/${divisionId}`;
export const getDivisionEditPath = (params: DivisionPath) =>
  `${getDivisionPath(params)}/edit`;
export const divisionsPath = `/divisions`;
export const divisionNewPath = `/divisions/new`;
export const divisionEditPath = getDivisionEditPath(divisionParams);

export interface ProjectPath extends DivisionPath {
  projectSlug: string;
}
export const projectParams = { ...divisionParams, projectSlug: ':projectSlug' };
export const getProjectsPath = (params: DivisionPath) =>
  `${getDivisionPath(params)}/projects`;
export const getProjectNewPath = (params: DivisionPath) =>
  `${getProjectsPath(params)}/new`;
const getProjectPath = ({ projectSlug, ...otherPrams }: ProjectPath) =>
  `${getProjectsPath(otherPrams)}/${projectSlug}`;
export const getProjectEditPath = (params: ProjectPath) =>
  `${getProjectPath(params)}/edit`;
export const projectsPath = getProjectsPath(divisionParams);
export const projectNewPath = getProjectNewPath(divisionParams);
export const projectEditPath = getProjectEditPath(projectParams);

export interface MemberPath extends DivisionPath {
  memberId: string;
}
export const memberParams = { ...divisionParams, memberId: ':memberId' };
export const getMembersPath = (params: DivisionPath) =>
  `${getDivisionPath(params)}/members`;
export const getMemberNewPath = (params: DivisionPath) =>
  `${getMembersPath(params)}/new`;
export const getMemberPath = ({ memberId, ...otherPrams }: MemberPath) =>
  `${getMembersPath(otherPrams)}/${memberId}`;
export const getMemberEditPath = (params: MemberPath) =>
  `${getMemberPath(params)}/edit`;
export const membersPath = getMembersPath(divisionParams);
export const memberNewPath = getMemberNewPath(divisionParams);
export const memberEditPath = getMemberEditPath(memberParams);
