import { parse, unparse, ParseResult, ParseConfig } from 'papaparse';

const parseCsv = <T>(
  input: File | string,
  config?: Omit<ParseConfig, 'complete' | 'error'>
): Promise<ParseResult<T>> => {
  return new Promise<ParseResult<T>>((resolve, reject) => {
    parse<T>(input, {
      ...config,
      complete: (rows) => {
        resolve(rows);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export const readCsv = async <T>(input: File | string) => {
  const results = await parseCsv<T>(input, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  return results.data;
};

export const toCsv = (rows: Object[]) => unparse(rows);

export const exportToCsv = (filename: string, rows: Object[]): void => {
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
