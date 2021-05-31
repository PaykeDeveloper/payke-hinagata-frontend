import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { StoreError } from 'src/store/types';
import { getErrorMessage } from 'src/store/utils';

const UploadErrorCell: FC<{ error: StoreError }> = ({ error }) => {
  const message = getErrorMessage(error);
  return (
    <Typography variant="body2" color="error" noWrap>
      {message}
    </Typography>
  );
};

export default UploadErrorCell;
