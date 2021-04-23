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

export interface DivisionProjectPath extends DivisionPath {
  projectId: string;
}
const divisionProjectParams = { ...divisionParams, projectId: ':projectId' };
export const getDivisionProjectsPath = (params: DivisionPath) =>
  `${getDivisionPath(params)}projects/`;
export const getDivisionProjectNewPath = (params: DivisionPath) =>
  `${getDivisionProjectsPath(params)}new/`;
const getDivisionProjectPath = ({
  projectId,
  ...otherPrams
}: DivisionProjectPath) =>
  `${getDivisionProjectsPath(otherPrams)}${projectId}/`;
export const getDivisionProjectEditPath = (params: DivisionProjectPath) =>
  `${getDivisionProjectPath(params)}edit/`;
export const divisionProjectsPath = getDivisionProjectsPath(divisionParams);
export const divisionProjectNewPath = getDivisionProjectNewPath(divisionParams);
export const divisionProjectEditPath = getDivisionProjectEditPath(
  divisionProjectParams
);

export interface DivisionMemberPath extends DivisionPath {
  memberId: string;
}
const divisionMemberParams = { ...divisionParams, memberId: ':memberId' };
export const getDivisionMembersPath = (params: DivisionPath) =>
  `${getDivisionPath(params)}members/`;
export const getDivisionMemberNewPath = (params: DivisionPath) =>
  `${getDivisionMembersPath(params)}new/`;
export const getDivisionMemberPath = ({
  memberId,
  ...otherPrams
}: DivisionMemberPath) => `${getDivisionMembersPath(otherPrams)}${memberId}/`;
export const getDivisionMemberEditPath = (params: DivisionMemberPath) =>
  `${getDivisionMemberPath(params)}edit/`;
export const divisionMembersPath = getDivisionMembersPath(divisionParams);
export const divisionMemberNewPath = getDivisionMemberNewPath(divisionParams);
export const divisionMemberEditPath = getDivisionMemberEditPath(
  divisionMemberParams
);
