import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SyncLocales from './components/common/SyncLocales';
import SyncRoles from './components/common/SyncRoles';

type Props = RouteComponentProps;

const SyncDomains: FC<Props> = () => {
  return (
    <>
      <SyncRoles />
      <SyncLocales />
    </>
  );
};
export default SyncDomains;
