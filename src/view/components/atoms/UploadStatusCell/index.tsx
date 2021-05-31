import React, { FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UploadStatus } from 'src/store/types';
import { BlockIcon, CheckIcon } from 'src/view/base/material-ui/Icon';

const UploadStatusCell: FC<{ status: UploadStatus }> = ({ status }) => {
  switch (status) {
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

export default UploadStatusCell;
