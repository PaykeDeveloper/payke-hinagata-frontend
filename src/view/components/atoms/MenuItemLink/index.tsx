import { FC } from 'react';
import { MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { WithChildren } from 'src/view/base/types';

interface Props extends WithChildren {
  to: string;
}

const MenuItemLink: FC<Props> = (props) => {
  return <MenuItem component={Link} {...props} />;
};

export default MenuItemLink;
