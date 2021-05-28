// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { RouteComponentProps } from 'react-router-dom';
import { useStoreSelector } from 'src/store';
import { divisionSelector } from 'src/store/state/domain/division/divisions/selectors';
import { DivisionPath } from 'src/view/routes/paths';
import Component from './Component';

const selector = createSelector([divisionSelector], (division) => ({
  division,
}));

const Importer: FC<RouteComponentProps<DivisionPath>> = (props) => {
  const {
    match: { params: pathParams },
  } = props;

  const state = useStoreSelector(selector);

  return <Component {...state} divisionPath={pathParams} />;
};

export default Importer;
