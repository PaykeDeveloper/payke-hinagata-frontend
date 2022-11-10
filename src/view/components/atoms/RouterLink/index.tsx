import { FC } from 'react';
import { LinkProps, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

export type RouterLinkProps = LinkProps<Link>;

const RouterLink: FC<RouterLinkProps> = (props) => (
  <MuiLink component={Link} {...props} />
);

export default RouterLink;
