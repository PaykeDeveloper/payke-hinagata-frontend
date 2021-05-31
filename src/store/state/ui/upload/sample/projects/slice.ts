// FIXME: SAMPLE CODE

import { UploadMethod } from 'src/store/types';
import { createUploadSlice } from 'src/store/utils';
import { UploadProjectInput } from './types';

const uploadProjectsSlice = createUploadSlice<UploadProjectInput>({
  domainName: 'project',
  domainSelector: (state) => state.ui.upload.sample.projects,
  selectMethod: (value) => {
    if (!value.id) {
      return UploadMethod.Add;
    } else if (value.deleteFlag) {
      return UploadMethod.Remove;
    } else {
      return UploadMethod.Merge;
    }
  },
});

export const uploadProjectsActions = uploadProjectsSlice.actions;
export const uploadProjectsReducer = uploadProjectsSlice.reducer;
