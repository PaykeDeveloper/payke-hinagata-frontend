import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SyncRoles from './components/common/SyncRoles';

type Props = RouteComponentProps;

const SyncDomains: FC<Props> = () => {
  return (
    <>
      <SyncRoles />
    </>
  );
};
export default SyncDomains;
