import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SyncLocales from './components/common/SyncLocales';
import SyncRoles from './components/common/SyncRoles';
import SyncUser from './components/common/SyncUser';

type Props = RouteComponentProps;

const SyncDomains: FC<Props> = () => {
  return (
    <>
      <SyncRoles />
      <SyncLocales />
      <SyncUser />
    </>
  );
};
export default SyncDomains;
