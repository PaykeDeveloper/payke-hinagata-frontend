// FIXME: SAMPLE CODE

import { ProjectInput } from 'src/store/state/domain/sample/projects/types';
import { StoreError } from 'src/store/types';

export enum ImportStatus {
  Waiting = 0,
  Preparing = 1,
  Success = 2,
  Failed = -1,
}

export type ProjectImporter = {
  id: string;
  project: ProjectInput;
};

export type ImportResult = {
  status: ImportStatus;
  error: StoreError | undefined;
};

export type ProjectImporterInput = Partial<ProjectInput>;
