import React, { FC } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import { UploadStatus } from 'src/store/types';
import {
  CheckIcon,
  RemoveCircleOutlineIcon,
  RestartAltIcon,
} from 'src/view/base/material-ui/Icon';

const UploadActionCell: FC<{
  status: UploadStatus;
  onRestart: () => void;
  onRemove: () => void;
}> = ({ status, onRestart, onRemove }) => {
  const { t } = useTranslation();
  switch (status) {
    case UploadStatus.Initial: {
      return (
        <Tooltip title={t<string>('Remove')}>
          <IconButton size="small" onClick={onRemove}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      );
    }
    case UploadStatus.Waiting:
    case UploadStatus.Uploading: {
      return <CircularProgress size={30} />;
    }
    case UploadStatus.Done: {
      return <CheckIcon color="primary" fontSize="small" />;
    }
    case UploadStatus.Failed: {
      return (
        <Tooltip title={t<string>('Retry')}>
          <IconButton size="small" onClick={onRestart}>
            <RestartAltIcon color="error" />
          </IconButton>
        </Tooltip>
      );
    }
  }
};

export default UploadActionCell;
