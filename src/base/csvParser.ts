import { parse, ParseConfig, ParseResult, unparse } from 'papaparse';

const parseCsvWithConfig = <T>(
  input: File | string,
  config?: Omit<ParseConfig, 'complete' | 'error'>
) => {
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

export const parseCSV = async <T>(input: File | string) => {
  const results = await parseCsvWithConfig<T>(input, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });
  return results.data;
};

export const serializeCsv = (rows: Object[]) => unparse(rows);
