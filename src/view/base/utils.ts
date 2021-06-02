import { serializeCsv } from 'src/base/csvParser';

const downloadFromURL = (url: string, filename?: string) => {
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename || '');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToCsv = (rows: Object[], filename: string) => {
  if (!rows || !rows.length) {
    return;
  }
  const blob = new Blob([serializeCsv(rows)], {
    type: 'text/csv;charset=utf-8;',
  });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const url = URL.createObjectURL(blob);
    downloadFromURL(url, filename);
  }
};
