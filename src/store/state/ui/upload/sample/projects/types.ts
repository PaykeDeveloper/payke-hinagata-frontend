// FIXME: SAMPLE CODE

import { ProjectInput } from 'src/store/state/domain/sample/projects/types';

export interface UploadProjectInput extends ProjectInput {
  deleteFlag?: boolean;
}
