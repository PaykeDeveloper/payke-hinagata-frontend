import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { TFunction, useTranslation } from 'react-i18next';
import { formatDate, formatUtcToZonedDateTime } from 'src/base/dateFormat';
import { useStoreSelector } from 'src/store';
import { uploadProjectMetaSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { UploadRow } from 'src/store/types';
import { isUnprocessableEntityError } from 'src/store/utils';
import OptionalTooltip from 'src/view/components/atoms/OptionalTooltip';

type ValueCellType = 'string' | 'boolean' | 'date' | 'datetime';

const formatValue = (t: TFunction, value: unknown, type?: ValueCellType) => {
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

const ValueCell: FC<{
  row: UploadRow<UploadProjectInput>;
  name: keyof UploadProjectInput;
  type?: ValueCellType;
}> = ({ row, name, type }) => {
  const { t } = useTranslation();
  const meta = useStoreSelector((s) =>
    uploadProjectMetaSelector(s, { id: row.id })
  );

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
      <Typography variant="body2" color={message ? 'error' : undefined} noWrap>
        {formatValue(t, value, type)}
      </Typography>
    </OptionalTooltip>
  );
};

export default ValueCell;
