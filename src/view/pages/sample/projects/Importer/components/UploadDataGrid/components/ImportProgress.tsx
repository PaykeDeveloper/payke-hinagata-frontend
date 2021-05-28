// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreSelector } from 'src/store';
import { uploadProjectMetasSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import { UploadStatus } from 'src/store/types';

const selector = createSelector([uploadProjectMetasSelector], (metas) => {
  const done = metas.filter((meta) => meta.status === UploadStatus.Done).length;
  const progress = metas.filter((meta) =>
    [UploadStatus.Waiting, UploadStatus.Uploading].includes(meta.status)
  ).length;
  return {
    done,
    progress,
  };
});

const ImportProgress: FC = () => {
  const { done, progress } = useStoreSelector(selector);
  if (!progress) {
    return <></>;
  }
  const value = (done / (done + progress)) * 100;
  return <LinearProgress variant="determinate" value={value} />;
};

export default ImportProgress;
