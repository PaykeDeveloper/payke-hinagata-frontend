// FIXME: SAMPLE CODE

import React, { FC, useCallback } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreDispatch, useStoreSelector } from 'src/store';
import { uploadProjectRowsSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import { uploadProjectsActions } from 'src/store/state/ui/upload/sample/projects/slice';
import { UploadProjectInput } from 'src/store/state/ui/upload/sample/projects/types';
import { UploadMethods } from 'src/store/types';
import Component from './Component';

const selector = createSelector([uploadProjectRowsSelector], (rows) => ({
  rows,
}));

const UploadDataGrid: FC<{ methods: UploadMethods<UploadProjectInput> }> = (
  props
) => {
  const { methods } = props;
  const state = useStoreSelector(selector);
  const dispatch = useStoreDispatch();

  const onRestart = useCallback(
    async (id: string) =>
      dispatch(uploadProjectsActions.uploadInitialRow(id, methods)),
    [dispatch, methods]
  );

  const onRemove = useCallback(
    async (id: string) => dispatch(uploadProjectsActions.removeRow({ id })),
    [dispatch]
  );

  return <Component {...state} onRestart={onRestart} onRemove={onRemove} />;
};

export default UploadDataGrid;
