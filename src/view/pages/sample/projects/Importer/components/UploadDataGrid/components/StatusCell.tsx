import React, { FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStoreSelector } from 'src/store';
import { uploadProjectMetaSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import { UploadStatus } from 'src/store/types';
import { BlockIcon, CheckIcon } from 'src/view/base/material-ui/Icon';

const StatusCell: FC<{ id: string }> = ({ id }) => {
  const meta = useStoreSelector((s) => uploadProjectMetaSelector(s, { id }));
  switch (meta?.status) {
    case UploadStatus.Waiting:
    case UploadStatus.Uploading: {
      return <CircularProgress />;
    }
    case UploadStatus.Done: {
      return <CheckIcon color="primary" />;
    }
    case UploadStatus.Failed: {
      return <BlockIcon color="error" />;
    }
    default: {
      return <></>;
    }
  }
};

export default StatusCell;
