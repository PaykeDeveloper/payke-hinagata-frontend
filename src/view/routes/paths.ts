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
