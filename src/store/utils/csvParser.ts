import { parse, ParseResult } from 'papaparse';

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
