import { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import SyncInvitations from './components/common/SyncInvitations';
import SyncLocales from './components/common/SyncLocales';
import SyncRoles from './components/common/SyncRoles';
import SyncUser from './components/common/SyncUser';
import SyncUsers from './components/common/SyncUsers';
import SyncDivisions from './components/division/SyncDivisions';
import SyncMembers from './components/division/SyncMembers';
import SyncProjects from './components/sample/SyncProjects';

type Props = RouteComponentProps;

const SyncDomains: FC<Props> = (props) => {
  const {
    match: { params },
  } = props;
  return (
    <>
      <SyncRoles />
      <SyncLocales />
      <SyncUser />
      <SyncUsers params={params} />
      <SyncInvitations params={params} />
      <SyncDivisions params={params} />
      <SyncMembers params={params} />
      <SyncProjects params={params} />
    </>
  );
};
export default SyncDomains;
