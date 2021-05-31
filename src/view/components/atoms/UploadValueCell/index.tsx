import React from 'react';
import { Typography } from '@material-ui/core';
import { TFunction, useTranslation } from 'react-i18next';
import { formatDate, formatUtcToZonedDateTime } from 'src/base/dateFormat';
import { StoreError } from 'src/store/types';
import { isUnprocessableEntityError } from 'src/store/utils';
import OptionalTooltip from 'src/view/components/atoms/OptionalTooltip';

export type UploadValueCellType = 'string' | 'boolean' | 'date' | 'datetime';

const formatValue = (
  t: TFunction,
  value: unknown,
  type?: UploadValueCellType
) => {
  if (value === undefined || value === null) {
    return '';
  } else if (type === 'boolean') {
    return value ? t('true') : t('false');
  } else if (type === 'date') {
    return formatDate(value as string);
  } else if (type === 'datetime') {
    return formatUtcToZonedDateTime(value as string);
  } else {
    return `${value}`;
  }
};

const UploadValueCell = <T extends unknown>({
  data,
  name,
  type,
  error,
}: {
  data: T;
  name: keyof T;
  type?: UploadValueCellType;
  error?: StoreError | null;
}) => {
  const { t } = useTranslation();

  const value = data[name];
  let message: string | undefined;
  if (error) {
    if (isUnprocessableEntityError(error)) {
      const errors = error?.data?.errors;
      const messages = errors && errors[name as string];
      message = messages?.join(' ');
    }
  }

  return (
    <OptionalTooltip title={message}>
      <Typography variant="body2" color={message ? 'error' : undefined} noWrap>
        {formatValue(t, value, type)}
      </Typography>
    </OptionalTooltip>
  );
};

export default UploadValueCell;
