import React, { FC } from 'react';

import MuiLink, { LinkProps } from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

export type RouterLinkProps = LinkProps & {
  to?: string;
};

const RouterLink: FC<RouterLinkProps> = (props) => {
  const { children, to } = props;

  if (to) {
    return (
      <MuiLink component={Link} to={to}>
        {children}
      </MuiLink>
    );
  }
  return <>{children}</>;
};

export default RouterLink;
