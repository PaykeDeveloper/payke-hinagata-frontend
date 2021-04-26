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

export interface InvitationPath {
  invitationId: string;
}
const invitationParams = { invitationId: ':invitationId' };
export const getInvitationEditPath = ({ invitationId }: InvitationPath) =>
  `${invitationsPath}${invitationId}/edit/`;
export const invitationsPath = `${rootPath}invitations/`;
export const invitationNewPath = `${rootPath}invitations/new/`;
export const invitationEditPath = getInvitationEditPath(invitationParams);

// FIXME: SAMPLE CODE

export interface BookPath {
  bookId: string;
}
const bookParams = { bookId: ':bookId' };
export const getBookPath = ({ bookId }: BookPath) => `${booksPath}${bookId}/`;
export const getBookEditPath = (params: BookPath) =>
  `${getBookPath(params)}edit/`;
export const booksPath = `${rootPath}books/`;
export const bookNewPath = `${rootPath}books/new/`;
export const bookPath = getBookPath(bookParams);
export const bookEditPath = getBookEditPath(bookParams);

export interface BookCommentPath extends BookPath {
  commentSlug: string;
}
const bookCommentParams = { ...bookParams, commentSlug: ':commentSlug' };
const getBookCommentsPath = (params: BookPath) =>
  `${getBookPath(params)}comments/`;
export const getBookCommentNewPath = (params: BookPath) =>
  `${getBookCommentsPath(params)}new/`;
const getBookCommentPath = ({ commentSlug, ...otherPrams }: BookCommentPath) =>
  `${getBookCommentsPath(otherPrams)}${commentSlug}/`;
export const getBookCommentEditPath = (params: BookCommentPath) =>
  `${getBookCommentPath(params)}edit/`;
export const bookCommentNewPath = getBookCommentNewPath(bookParams);
export const bookCommentEditPath = getBookCommentEditPath(bookCommentParams);

export interface UserPath {
  userId: string;
}
const userParams = { userId: ':userId' };
export const getUserPath = ({ userId }: UserPath) => `${usersPath}${userId}/`;
export const getUserEditPath = (params: UserPath) =>
  `${getUserPath(params)}edit/`;
export const usersPath = `${rootPath}users/`;
export const userNewPath = `${rootPath}users/new/`;
export const userPath = getUserPath(userParams);
export const userEditPath = getUserEditPath(userParams);

export interface DivisionPath {
  divisionId: string;
}
const divisionParams = { divisionId: ':divisionId' };
export const getDivisionPath = ({ divisionId }: DivisionPath) =>
  `${divisionsPath}${divisionId}/`;
export const getDivisionEditPath = (params: DivisionPath) =>
  `${getDivisionPath(params)}edit/`;
export const divisionsPath = `${rootPath}divisions/`;
export const divisionNewPath = `${rootPath}divisions/new/`;
export const divisionPath = getDivisionPath(divisionParams);
export const divisionEditPath = getDivisionEditPath(divisionParams);

export interface ProjectPath extends DivisionPath {
  projectId: string;
}
const projectParams = { ...divisionParams, projectId: ':projectId' };
export const getProjectsPath = (params: DivisionPath) =>
  `${getDivisionPath(params)}projects/`;
export const getProjectNewPath = (params: DivisionPath) =>
  `${getProjectsPath(params)}new/`;
const getProjectPath = ({ projectId, ...otherPrams }: ProjectPath) =>
  `${getProjectsPath(otherPrams)}${projectId}/`;
export const getProjectEditPath = (params: ProjectPath) =>
  `${getProjectPath(params)}edit/`;
export const projectsPath = getProjectsPath(divisionParams);
export const projectNewPath = getProjectNewPath(divisionParams);
export const projectEditPath = getProjectEditPath(projectParams);

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
