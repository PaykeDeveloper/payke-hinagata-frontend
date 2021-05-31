// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useStoreSelector } from 'src/store';
import { uploadProjectRowsSelector } from 'src/store/state/ui/upload/sample/projects/selectors';
import Component from './Component';

const selector = createSelector([uploadProjectRowsSelector], (rows) => ({
  rows,
}));

const UploadDataGrid: FC = () => {
  const state = useStoreSelector(selector);

  return <Component {...state} />;
};

export default UploadDataGrid;
