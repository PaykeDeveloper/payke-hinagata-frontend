import React, { FC } from 'react';

import MuiLink, { LinkProps } from '@mui/material/Link';
import { Link } from 'react-router-dom';

export type RouterLinkProps = LinkProps<Link>;

const RouterLink: FC<RouterLinkProps> = (props) => (
  <MuiLink component={Link} {...props} />
);

export default RouterLink;
