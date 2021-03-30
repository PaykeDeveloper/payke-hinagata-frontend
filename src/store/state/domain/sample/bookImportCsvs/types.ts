// FIXME: SAMPLE CODE

export interface BookImportCsv {
  id: number;
  fileNameOriginal: string;
  importStatus: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface BookImportCsvInput {
  csv_file?: unknown;
}