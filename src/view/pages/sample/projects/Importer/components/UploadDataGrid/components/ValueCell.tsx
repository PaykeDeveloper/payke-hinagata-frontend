import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { useStoreSelector } from 'src/store';
import { uploadProjectMetaSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { UploadRow, UploadStatus } from 'src/store/types';
import { isUnprocessableEntityError } from 'src/store/utils';
import OptionalTooltip from 'src/view/components/atoms/OptionalTooltip';

const ErrorCell: FC<{
  row: UploadRow<UploadProjectInput>;
  name: keyof UploadProjectInput;
}> = ({ row, name }) => {
  const meta = useStoreSelector((s) =>
    uploadProjectMetaSelector(s, { id: row.id })
  );
  const hasError = meta?.status === UploadStatus.Failed;
  const value = row.data[name];

  let message: string | undefined;
  const error = meta?.error;
  if (error) {
    if (isUnprocessableEntityError(error)) {
      const errors = error?.data?.errors;
      const messages = errors && errors[name];
      message = messages?.join(' ');
    }
  }

  return (
    <OptionalTooltip title={message}>
      <Typography variant="body2" color={hasError ? 'error' : undefined} noWrap>
        {`${value}`}
      </Typography>
    </OptionalTooltip>
  );
};

export default ErrorCell;
