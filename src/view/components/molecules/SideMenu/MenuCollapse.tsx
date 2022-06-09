import React, { FC, useState } from 'react';

import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ExpandLessIcon, ExpandMoreIcon } from 'src/view/base/material-ui/Icon';
import MenuLink, { CollapseMenu, exactMatchPath } from './MenuLink';

interface Props {
  menu: CollapseMenu;
  path: string;
  permissionNames: string[] | undefined;
  onClickMenu?: (event: unknown) => void;
}

const MenuCollapse: FC<Props> = (props) => {
  const { menu, path, permissionNames, onClickMenu } = props;
  const selected = exactMatchPath(menu, path);
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
              path={path}
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
