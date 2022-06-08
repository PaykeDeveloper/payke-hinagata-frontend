import React, { FC, useState } from 'react';

import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLessIcon, ExpandMoreIcon } from 'src/view/base/material-ui/Icon';
import MenuLink, { CollapseMenu, exactMatchPath } from './MenuLink';

interface Props {
  menu: CollapseMenu;
  pathname: string;
  permissionNames: string[] | undefined;
  onClickMenu?: (event: unknown) => void;
}

const MenuCollapse: FC<Props> = (props) => {
  const { menu, pathname, permissionNames, onClickMenu } = props;
  const selected = exactMatchPath(menu, pathname);
  const [open, setOpen] = useState(selected);
  const handleClick = () => setOpen((prevOpen: boolean) => !prevOpen);
  return (
    <>
      <ListItemButton selected={selected} onClick={handleClick}>
        {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}
        <ListItemText primary={menu.text} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {menu.menus?.map((m, i) => (
            <MenuLink
              key={i}
              menu={m}
              pathname={pathname}
              nested
              permissionNames={permissionNames}
              onClickMenu={onClickMenu}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default MenuCollapse;
