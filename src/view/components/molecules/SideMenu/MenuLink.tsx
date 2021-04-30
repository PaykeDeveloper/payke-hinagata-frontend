import React, { FC, ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import MenuCollapse from './MenuCollapse';
import { SelectableMenu } from './SelectableMenuLink';
import { getExactMatch } from './utils';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export type Menu = ItemMenu | CollapseMenu | SelectableMenu;

export interface ItemMenu {
  text: ReactElement;
  icon?: ReactElement;
  to: string;
  paths: string[];
  requiredPermissions?: string[];
}

export interface CollapseMenu {
  text: ReactElement;
  menus: Menu[];
  icon?: ReactElement;
  requiredPermissions?: string[];
}

export const exactMatchPath = (menu: Menu, path: string): boolean => {
  if ('menus' in menu) {
    return menu.menus.some((m) => exactMatchPath(m, path));
  }
  return menu.paths.includes(path);
};

interface Props {
  menu: Menu;
  pathname: string;
  paths: string[];
  nested?: boolean;
  permissionNames: string[] | undefined;
  requiredPermissions?: string[];
  onClickMenu?: (event: unknown) => void;
}

const MenuLink: FC<Props> = (props) => {
  const { menu, pathname, paths, nested, permissionNames, onClickMenu } = props;
  const classes = useStyles();
  const path = getExactMatch(paths, pathname)?.path;

  if (
    menu.requiredPermissions &&
    !menu.requiredPermissions.some((e) => permissionNames?.includes(e))
  ) {
    return <></>;
  }

  if ('menus' in menu) {
    return (
      <MenuCollapse
        menu={menu}
        pathname={pathname}
        paths={paths}
        onClickMenu={onClickMenu}
        permissionNames={permissionNames}
      />
    );
  }
  return (
    <ListItem
      button
      component={Link}
      to={menu.to}
      selected={!!path && exactMatchPath(menu, path)}
      className={nested ? classes.nested : undefined}
      onClick={onClickMenu}
    >
      {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}
      <ListItemText inset={false} primary={menu.text} />
    </ListItem>
  );
};

export default MenuLink;
