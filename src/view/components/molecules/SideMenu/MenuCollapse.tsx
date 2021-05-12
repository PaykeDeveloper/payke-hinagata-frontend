import React, { FC, useState } from 'react';

import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ExpandLessIcon, ExpandMoreIcon } from 'src/view/base/material-ui/Icon';
import MenuLink, { CollapseMenu, exactMatchPath } from './MenuLink';
import { getExactMatch } from './utils';

interface Props {
  menu: CollapseMenu;
  pathname: string;
  paths: string[];
  permissionNames: string[] | undefined;
  onClickMenu?: (event: unknown) => void;
}

const MenuCollapse: FC<Props> = (props) => {
  const { menu, pathname, paths, permissionNames, onClickMenu } = props;
  const path = getExactMatch(paths, pathname)?.path;
  const selected = !!path && exactMatchPath(menu, path);
  const [open, setOpen] = useState(selected);
  const handleClick = () => setOpen((prevOpen: boolean) => !prevOpen);
  return (
    <>
      <ListItem button selected={selected} onClick={handleClick}>
        {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}
        <ListItemText primary={menu.text} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>
          {menu.menus?.map((m, i) => (
            <MenuLink
              key={i}
              menu={m}
              pathname={pathname}
              paths={paths}
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
