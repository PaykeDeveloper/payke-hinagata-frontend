export const otherPath = '*';
export const rootPath = '/';
export const loginPath = `${rootPath}login/`;

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
  commentId: string;
}
const bookCommentParams = { ...bookParams, commentId: ':commentId' };
const getBookCommentsPath = (params: BookPath) =>
  `${getBookPath(params)}comments/`;
export const getBookCommentNewPath = (params: BookPath) =>
  `${getBookCommentsPath(params)}new/`;
const getBookCommentPath = ({ commentId, ...otherPrams }: BookCommentPath) =>
  `${getBookCommentsPath(otherPrams)}${commentId}/`;
export const getBookCommentEditPath = (params: BookCommentPath) =>
  `${getBookCommentPath(params)}edit/`;
export const bookCommentNewPath = getBookCommentNewPath(bookParams);
export const bookCommentEditPath = getBookCommentEditPath(bookCommentParams);
