import { FC, useCallback, useMemo } from 'react';
import { styled } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridFilterItem,
  GridLinkOperator,
  GridSortItem,
} from '@mui/x-data-grid';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isDate from 'lodash/isDate';
import isEqual from 'lodash/isEqual';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import toInteger from 'lodash/toInteger';
import qs from 'qs';
import { ErrorBoundary } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import {
  formatDate,
  formatMonth,
  formatUtcToZonedDateTime,
  formatUtcToZonedTimestamp,
} from 'src/base/dateFormat';
import { notUndefined } from 'src/base/utils';
import { ErrorStatus } from 'src/store/types';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';

type BaseDataGridProps = Omit<DataGridProps, 'localeText'>;

export const ACTION_WIDTH = 70;

export const actionsColDef: GridColDef = {
  field: 'actions',
  headerName: ' ',
  type: 'actions',
};

export const booleanColDef: Omit<GridColDef, 'field'> = {
  minWidth: 100,
  type: 'boolean',
  valueFormatter: ({ value }) => {
    if (value === undefined || value === null || value === '') {
      return '';
    }
    return value ? 'True' : 'False';
  },
};

export const monthColDef: Omit<GridColDef, 'field'> = {
  minWidth: 100,
  type: 'date',
  valueFormatter: ({ value }) =>
    isString(value) || isDate(value) ? formatMonth(value) : value,
};

const tryFormat = (
  format: (value: string | Date) => string,
  value: string | Date,
) => {
  try {
    return format(value);
  } catch (e) {}
  return value;
};

export const dateColDef: Omit<GridColDef, 'field'> = {
  minWidth: 120,
  type: 'date',
  valueFormatter: ({ value }) =>
    isString(value) || isDate(value) ? tryFormat(formatDate, value) : value,
};

export const dateTimeColDef: Omit<GridColDef, 'field'> = {
  minWidth: 160,
  type: 'dateTime',
  valueFormatter: ({ value }) =>
    isString(value) || isDate(value)
      ? tryFormat(formatUtcToZonedDateTime, value)
      : value,
};

export const timestampColDef: Omit<GridColDef, 'field'> = {
  minWidth: 180,
  type: 'dateTime',
  valueFormatter: ({ value }) =>
    isString(value) || isDate(value)
      ? tryFormat(formatUtcToZonedTimestamp, value)
      : value,
};

export const numberColDef: Omit<GridColDef, 'field'> = {
  minWidth: 100,
  type: 'number',
  valueFormatter: ({ value }) =>
    isNumber(value) ? Number(value).toLocaleString() : value,
};

const StyledDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-iconButtonContainer': {
    visibility: 'visible',
    width: 'auto',
  },
});

const BaseDataGrid: FC<BaseDataGridProps> = (props) => {
  return <StyledDataGrid {...props} />;
};

BaseDataGrid.defaultProps = {
  autoHeight: true,
  disableSelectionOnClick: true,
};

export default BaseDataGrid;

const parsePage = (page: unknown): number => {
  if (isString(page) || isNumber(page)) {
    return toInteger(page);
  }
  return 0;
};

const defaultPageSize = 10;
const parsePageSize = (pageSize: unknown): number => {
  if (isString(pageSize) || isNumber(pageSize)) {
    return toInteger(pageSize);
  }
  return defaultPageSize;
};

const fieldKey = 'field';
const sortKey = 'sort';
const checkSort = (value: unknown): value is GridSortItem['sort'] =>
  ['asc', 'desc', null, undefined].includes(value as any);
const parseSortModel = (
  sortModel: unknown,
  fields: string[],
): DataGridProps['sortModel'] => {
  if (isArray(sortModel)) {
    return sortModel
      .map((value: unknown): GridSortItem | undefined => {
        if (isObject(value) && fieldKey in value && sortKey in value) {
          const field: unknown = get(value, fieldKey);
          const sort = get(value, sortKey);
          if (isString(field) && fields.includes(field) && checkSort(sort)) {
            return { field, sort };
          }
        }
        return undefined;
      })
      .filter(notUndefined);
  }
  return [];
};

const itemsKey = 'items';
const checkNumeric = (value: string) => /^-?\d+$/.test(value);
const convertValue = (value: string) => {
  if (checkNumeric(value)) {
    return toInteger(value);
  } else if (['true', 'false'].includes(value)) {
    return 'true' === value;
  }
  return value;
};
const parseFilterModel = (
  filterMode: unknown,
  fields: string[],
): DataGridProps['filterModel'] => {
  if (isObject(filterMode) && itemsKey in filterMode) {
    const items: unknown = get(filterMode, itemsKey);
    if (isArray(items)) {
      const filteredItems = items
        .map((item: unknown): GridFilterItem | undefined => {
          if (isObject(item)) {
            const id: unknown = get(item, 'id');
            const columnField: unknown = get(item, 'columnField');
            const value: unknown = get(item, 'value');
            const operatorValue: unknown = get(item, 'operatorValue');
            if (
              (id === undefined || isNumber(id) || isString(id)) &&
              isString(columnField) &&
              fields.includes(columnField) &&
              (operatorValue === undefined || isString(operatorValue))
            ) {
              return { id, columnField, value, operatorValue };
            }
          }
          return undefined;
        })
        .filter(notUndefined)
        .map((item) => {
          let { value, operatorValue } = item;
          if (operatorValue) {
            if (['is', 'not'].includes(operatorValue) && value !== undefined) {
              value = convertValue(value);
            } else if (operatorValue === 'isAnyOf') {
              if (value === undefined) {
                value = [];
              } else if (Array.isArray(value)) {
                value = value.map((v) => convertValue(v));
              }
            }
          }
          return { ...item, value };
        });

      const linkOperator = get(filterMode, 'linkOperator');
      if (
        linkOperator === undefined ||
        [GridLinkOperator.Or, GridLinkOperator.And].includes(linkOperator)
      ) {
        return { items: filteredItems, linkOperator };
      }
    }
  }
  return { items: [] };
};

type ParamsKey = 'page' | 'sortModel' | 'filterModel' | 'pageSize';

function createSearchIfNeeded<Params>(
  search: string,
  params: Params,
  key: ParamsKey,
) {
  const searchParams = qs.parse(search, { ignoreQueryPrefix: true });
  return !isEqual(searchParams[key], params)
    ? qs.stringify({ ...searchParams, [key]: params })
    : undefined;
}

type RouterDataGridProps = Omit<BaseDataGridProps, ParamsKey>;

export const RouterDataGrid: FC<RouterDataGridProps> = (props) => {
  const {
    columns,
    onPageChange,
    onSortModelChange,
    onFilterModelChange,
    onPageSizeChange,
    rowsPerPageOptions,
    ...otherProps
  } = props;
  const {
    replace,
    location: { search },
  } = useHistory();

  const handlePageChange: NonNullable<DataGridProps['onPageChange']> =
    useCallback(
      (model, detail) => {
        onPageChange?.(model, detail);
        const newSearch = createSearchIfNeeded(search, model, 'page');
        if (newSearch !== undefined) {
          replace({ search: newSearch });
        }
      },
      [onPageChange, replace, search],
    );
  const handlePageSizeChange: NonNullable<DataGridProps['onPageSizeChange']> =
    useCallback(
      (model, detail) => {
        onPageSizeChange?.(model, detail);
        const newSearch = createSearchIfNeeded(search, model, 'pageSize');
        if (newSearch !== undefined) {
          replace({ search: newSearch });
        }
      },
      [onPageSizeChange, replace, search],
    );
  const handleSortModelChange: NonNullable<DataGridProps['onSortModelChange']> =
    useCallback(
      (model, detail) => {
        onSortModelChange?.(model, detail);
        const newSearch = createSearchIfNeeded(search, model, 'sortModel');
        if (newSearch !== undefined) {
          replace({ search: newSearch });
        }
      },
      [onSortModelChange, replace, search],
    );
  const handleFilterModelChange: NonNullable<
    DataGridProps['onFilterModelChange']
  > = useCallback(
    (model, detail) => {
      onFilterModelChange?.(model, detail);
      const newSearch = createSearchIfNeeded(
        search,
        model.items.length ? model : undefined,
        'filterModel',
      );
      if (newSearch !== undefined) {
        replace({ search: newSearch });
      }
    },
    [onFilterModelChange, replace, search],
  );

  const fields = useMemo(
    () => columns.map((column) => column.field),
    [columns],
  );
  const params = qs.parse(search, { ignoreQueryPrefix: true });
  const page = parsePage(params['page']);
  const pageSize = parsePageSize(params['pageSize']);
  const sortModel = parseSortModel(params['sortModel'], fields);
  const filterModel = parseFilterModel(params['filterModel'], fields);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BaseDataGrid
        {...otherProps}
        columns={columns}
        onPageChange={handlePageChange}
        onSortModelChange={handleSortModelChange}
        onFilterModelChange={handleFilterModelChange}
        onPageSizeChange={handlePageSizeChange}
        page={page}
        pageSize={pageSize}
        sortModel={sortModel}
        filterModel={filterModel}
        rowsPerPageOptions={[
          defaultPageSize,
          ...(rowsPerPageOptions || [25, 50]),
        ]}
      />
    </ErrorBoundary>
  );
};

const ErrorFallback: FC = () => {
  const {
    replace,
    go,
    location: { pathname },
  } = useHistory();
  const onButtonClick = useCallback(() => {
    replace(pathname);
    go(0);
  }, [replace, go, pathname]);
  return (
    <ErrorWrapper
      error={{ status: ErrorStatus.Unknown, data: undefined }}
      onButtonClick={onButtonClick}
    >
      <></>
    </ErrorWrapper>
  );
};
