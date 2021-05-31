import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { useStoreSelector } from 'src/store';
import { uploadProjectMetaSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import { UploadStatus } from 'src/store/types';
import { getErrorMessage } from 'src/store/utils';

const ErrorCell: FC<{ id: string }> = ({ id }) => {
  const meta = useStoreSelector((s) => uploadProjectMetaSelector(s, { id }));
  if (!meta || meta.status !== UploadStatus.Failed || !meta.error) {
    return <></>;
  }

  // let message: string | undefined;
  // const { error } = meta;
  // if (error) {
  //   if (isUnprocessableEntityError(error) && error.data) {
  //     const { errors } = error.data;
  //     message =
  //       errors &&
  //       Object.values(errors).reduce(
  //         (previousValue, currentValue) => previousValue + currentValue,
  //         ''
  //       );
  //   }
  //   if (!message && isStoreError(error)) {
  //     message = getErrorMessage(error);
  //   }
  // }

  const message = getErrorMessage(meta.error);
  return (
    <Typography variant="body2" color="error" noWrap>
      {message}
    </Typography>
  );
};

export default ErrorCell;
