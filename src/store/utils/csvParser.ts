import { parse, unparse, ParseResult } from 'papaparse';

export const readCsv = <T>(input: File | string) =>
  new Promise<T[]>((resolve, reject) => {
    parse(input, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (rows: ParseResult<T>) => {
        resolve(rows.data);
      },
    });
  });

export const toCsv = (rows: { [key: string]: unknown }[]) => unparse(rows);

export const exportToCsv = (
  filename: string,
  rows: { [key: string]: unknown }[]
): void => {
  if (!rows || !rows.length) {
    return;
  }
  const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
