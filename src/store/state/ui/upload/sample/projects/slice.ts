// FIXME: SAMPLE CODE

import { UploadMethod } from 'src/store/types';
import { createUploadSlice } from 'src/store/utils';
import { UploadProjectInput } from './types';

const uploadProjectsSlice = createUploadSlice<UploadProjectInput>({
  domainName: 'project',
  domainSelector: (state) => state.ui.upload.sample.projects,
  selectMethod: (row) => {
    if (!row.slug) {
      return UploadMethod.Add;
    } else if (row.deleteFlag) {
      return UploadMethod.Remove;
    } else {
      return UploadMethod.Merge;
    }
  },
});

export const uploadProjectsActions = uploadProjectsSlice.actions;
export const uploadProjectsReducer = uploadProjectsSlice.reducer;
