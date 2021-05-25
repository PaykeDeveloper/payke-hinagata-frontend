export const otherPath = '*';
export const rootPath = '/';
export const loginPath = `${rootPath}login/`;
export const registerPath = `${rootPath}register/`;
export const forgotPasswordPath = `${rootPath}forgot-password/`;
export const resetPasswordPath = `${rootPath}reset-password/`;

export interface VerifyEmailPath {
  id: string;
  token: string;
}
export const getVerifyEmailPath = ({ id, token }: VerifyEmailPath) =>
  `${rootPath}email/verify/${id}/${token}`;
export const verifyEmailPath = getVerifyEmailPath({
  id: ':id',
  token: ':token',
});

export const changePasswordPath = `${rootPath}user/password/`;
export const myUserEditPath = `${rootPath}user/edit/`;

export interface InvitationPath {
  invitationId: string;
}
const invitationParams = { invitationId: ':invitationId' };
export const getInvitationEditPath = ({ invitationId }: InvitationPath) =>
  `${invitationsPath}${invitationId}/edit/`;
export const invitationsPath = `${rootPath}invitations/`;
export const invitationNewPath = `${rootPath}invitations/new/`;
export const invitationEditPath = getInvitationEditPath(invitationParams);

export interface UserPath {
  userId: string;
}
const userParams = { userId: ':userId' };
export const getUserPath = ({ userId }: UserPath) => `${usersPath}${userId}/`;
export const getUserEditPath = (params: UserPath) =>
  `${getUserPath(params)}edit/`;
export const usersPath = `${rootPath}users/`;
export const userPath = getUserPath(userParams);
export const userEditPath = getUserEditPath(userParams);

// FIXME: SAMPLE CODE

export interface DivisionPath {
  divisionId: string;
}
const divisionParams = { divisionId: ':divisionId' };
const getDivisionPath = ({ divisionId }: DivisionPath) =>
  `${divisionsPath}${divisionId}/`;
export const getDivisionEditPath = (params: DivisionPath) =>
  `${getDivisionPath(params)}edit/`;
export const divisionsPath = `${rootPath}divisions/`;
export const divisionNewPath = `${rootPath}divisions/new/`;
export const divisionEditPath = getDivisionEditPath(divisionParams);

export interface ProjectPath extends DivisionPath {
  projectSlug: string;
}
const projectParams = { ...divisionParams, projectSlug: ':projectSlug' };
export const getProjectsPath = (params: DivisionPath) =>
  `${getDivisionPath(params)}projects/`;
export const getProjectNewPath = (params: DivisionPath) =>
  `${getProjectsPath(params)}new/`;
const getProjectPath = ({ projectSlug, ...otherPrams }: ProjectPath) =>
  `${getProjectsPath(otherPrams)}${projectSlug}/`;
export const getProjectEditPath = (params: ProjectPath) =>
  `${getProjectPath(params)}edit/`;
export const projectsPath = getProjectsPath(divisionParams);
export const projectNewPath = getProjectNewPath(divisionParams);
export const projectEditPath = getProjectEditPath(projectParams);

export const getProjectImportPath = (params: DivisionPath) =>
  `${getProjectsPath(params)}import/`;
export const projectImportPath = getProjectImportPath(divisionParams);

export interface MemberPath extends DivisionPath {
  memberId: string;
}
const memberParams = { ...divisionParams, memberId: ':memberId' };
export const getMembersPath = (params: DivisionPath) =>
  `${getDivisionPath(params)}members/`;
export const getMemberNewPath = (params: DivisionPath) =>
  `${getMembersPath(params)}new/`;
export const getMemberPath = ({ memberId, ...otherPrams }: MemberPath) =>
  `${getMembersPath(otherPrams)}${memberId}/`;
export const getMemberEditPath = (params: MemberPath) =>
  `${getMemberPath(params)}edit/`;
export const membersPath = getMembersPath(divisionParams);
export const memberNewPath = getMemberNewPath(divisionParams);
export const memberEditPath = getMemberEditPath(memberParams);
