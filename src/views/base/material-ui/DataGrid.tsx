import React, { FC, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { ColDef, DataGrid, DataGridProps } from '@material-ui/data-grid';
import clsx from 'clsx';
import qs from 'qs';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { formatDate, formatTimestamp } from 'src/base/dateFormat';

type BaseDataGridProps = Omit<DataGridProps, 'localeText'>;

const useStyles = makeStyles((theme) => ({
  grid: {
    minHeight: theme.spacing(60),
  },
}));

export const dateColDef: Omit<ColDef, 'field'> = {
  width: 120,
  valueFormatter: ({ value }) =>
    typeof value === 'string' || value instanceof Date
      ? formatDate(value)
      : value,
};

export const timestampColDef: Omit<ColDef, 'field'> = {
  width: 180,
  valueFormatter: ({ value }) =>
    typeof value === 'string' || value instanceof Date
      ? formatTimestamp(value)
      : value,
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

BaseDataGrid.defaultProps = {
  autoPageSize: true,
};

export default BaseDataGrid;

const parsePage = (page: unknown) => {
  if (page !== undefined && typeof page === 'string') {
    return parseInt(page);
  }
  return undefined;
};

function mergeSearch<Params>(
  search: string,
  params: Params,
  key: keyof Params
) {
  const p = qs.parse(search, { ignoreQueryPrefix: true });
  p[key as string] = params[key] as any;
  return qs.stringify(p);
}

export const RouterDataGrid: FC<BaseDataGridProps> = (props) => {
  const {
    onPageChange,
    onSortModelChange,
    onFilterModelChange,
    page,
    sortModel,
    filterModel,
    ...otherProps
  } = props;
  const {
    push,
    location: { search },
  } = useHistory();

  const handlePageChange: DataGridProps['onPageChange'] = useCallback(
    (params) => {
      onPageChange && onPageChange(params);
      push({ search: mergeSearch(search, params, 'page') });
    },
    [onPageChange, push, search]
  );
  const handleSortModelChange: DataGridProps['onSortModelChange'] = useCallback(
    (params) => {
      onSortModelChange && onSortModelChange(params);
      push({ search: mergeSearch(search, params, 'sortModel') });
    },
    [onSortModelChange, push, search]
  );
  const handleFilterModelChange: DataGridProps['onFilterModelChange'] = useCallback(
    (params) => {
      onFilterModelChange && onFilterModelChange(params);
      push({ search: mergeSearch(search, params, 'filterModel') });
    },
    [onFilterModelChange, push, search]
  );

  const params = qs.parse(search, { ignoreQueryPrefix: true });
  const thisPage = page !== undefined ? page : parsePage(params['page']);
  const thisSortModel =
    sortModel || (params['sortModel'] as DataGridProps['sortModel']);
  const thisFilterModel =
    filterModel || (params['filterModel'] as DataGridProps['filterModel']);

  return (
    <BaseDataGrid
      {...otherProps}
      onPageChange={handlePageChange}
      onSortModelChange={handleSortModelChange}
      onFilterModelChange={handleFilterModelChange}
      page={thisPage}
      sortModel={thisSortModel}
      filterModel={thisFilterModel}
    />
  );
};
