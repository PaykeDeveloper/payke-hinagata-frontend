// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreSelector } from 'src/store';
import {
  uploadProjectMetasSelector,
  uploadProjectRowsSelector,
} from 'src/store/state/ui/upload/sample/projects/selectors';
import { UploadStatus } from 'src/store/types';
import { uploadProcessingStatuses } from 'src/store/utils';
import UploadProgress from 'src/view/components/atoms/UploadProgress';

const selector = createSelector(
  [uploadProjectRowsSelector, uploadProjectMetasSelector],
  (rows, metas) => {
    const progress = rows.filter(
      (row) => metas[row.id]?.status === UploadStatus.Done
    ).length;
    const remaining = rows.filter((row) => {
      const status = metas[row.id]?.status;
      return status !== undefined && uploadProcessingStatuses.includes(status);
    }).length;
    return {
      progress,
      remaining,
    };
  }
);

const Progress: FC = () => {
  const { progress, remaining } = useStoreSelector(selector);
  if (!remaining) {
    return <></>;
  }
  const total = progress + remaining;
  return <UploadProgress progress={progress} total={total} />;
};

export default Progress;
