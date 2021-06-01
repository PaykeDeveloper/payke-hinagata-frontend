import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { GridCellValue } from '@material-ui/data-grid';
import { StoreError } from 'src/store/types';
import { isUnprocessableEntityError } from 'src/store/utils';
import OptionalTooltip from 'src/view/components/atoms/OptionalTooltip';

const UploadValueCell: FC<{
  formattedValue: GridCellValue;
  name: string;
  error?: StoreError | null;
}> = ({ formattedValue, name, error }) => {
  let message: string | undefined;
  if (error) {
    if (isUnprocessableEntityError(error)) {
      const errors = error?.data?.errors;
      const messages = errors && errors[name];
      message = messages?.join(' ');
    }
  }

  return (
    <OptionalTooltip title={message}>
      <Typography variant="body2" color={message ? 'error' : undefined} noWrap>
        {formattedValue}
      </Typography>
    </OptionalTooltip>
  );
};

export default UploadValueCell;
