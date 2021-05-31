// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreSelector } from 'src/store';
import {
  uploadProjectMetasSelector,
  uploadProjectRowsSelector,
} from 'src/store/state/ui/upload/sample/projects/selectors';
import { UploadStatus } from 'src/store/types';
import { uploadProcessingStatuses } from 'src/store/utils';

const selector = createSelector(
  [uploadProjectRowsSelector, uploadProjectMetasSelector],
  (rows, metas) => {
    const done = rows.filter(
      (row) => metas[row.id]?.status === UploadStatus.Done
    ).length;
    const progress = rows.filter((row) => {
      const status = metas[row.id]?.status;
      return status !== undefined && uploadProcessingStatuses.includes(status);
    }).length;
    return {
      done,
      progress,
    };
  }
);

const ImportProgress: FC = () => {
  const { done, progress } = useStoreSelector(selector);
  if (!progress) {
    return <></>;
  }
  const value = (done / (done + progress)) * 100;
  return <LinearProgress variant="determinate" value={value} />;
};

export default ImportProgress;
