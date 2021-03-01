export const otherPath = '*';
export const rootPath = '/';
export const loginPath = `${rootPath}login/`;
export const booksPath = `${rootPath}books/`;
export const booksNewPath = `${rootPath}books/new`;

export interface BookPath {
  bookId: string;
}

const bookParams = { bookId: ':bookId' };
export const getBookEditPath = ({ bookId }: BookPath) =>
  `${booksPath}${bookId}/edit`;
export const bookEditPath = getBookEditPath(bookParams);
