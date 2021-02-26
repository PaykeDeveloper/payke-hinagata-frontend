import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import { ColDef, DataGrid, DataGridProps } from '@material-ui/data-grid';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { formatDate, formatTimestampString } from 'src/base/dateFormat';

type BaseDataGridProps = Omit<DataGridProps, 'localeText'>;

const useStyles = makeStyles((theme) => ({
  grid: {
    minHeight: theme.spacing(50),
  },
}));

export const dateColDef: Omit<ColDef, 'field'> = {
  width: 120,
  valueFormatter: ({ value }) => formatDate(value as string | null),
};

export const timestampColDef: Omit<ColDef, 'field'> = {
  width: 180,
  valueFormatter: ({ value }) => formatTimestampString(value as string | null),
};

const BaseDataGrid: FC<BaseDataGridProps> = (props) => {
  const { className, ...otherProps } = props;
  const { t } = useTranslation();
  const localeText = {
    // https://github.com/mui-org/material-ui-x/blob/HEAD/packages/grid/_modules_/grid/constants/localeTextConstants.ts
    rootGridLabel: t('grid'),
    noRowsLabel: t('No rows'),
    errorOverlayDefaultLabel: t('An error occurred.'),
  };
  const classes = useStyles();
  return (
    <DataGrid
      {...otherProps}
      localeText={localeText}
      className={clsx(classes.grid, className)}
    />
  );
};

export default BaseDataGrid;
