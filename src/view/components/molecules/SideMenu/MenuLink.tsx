import React, { FC, ReactElement } from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import makeStyles from '@mui/styles/makeStyles';
import { Link } from 'react-router-dom';
import MenuCollapse from './MenuCollapse';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export type Menu = ItemMenu | CollapseMenu;

export interface ItemMenu {
  text: ReactElement;
  icon?: ReactElement;
  to: string;
  paths: string[];
  permissions?: string[];
}

export interface CollapseMenu {
  text: ReactElement;
  menus: Menu[];
  icon?: ReactElement;
  permissions?: string[];
}

export const exactMatchPath = (menu: Menu, path: string): boolean => {
  console.log(menu, path);
  if ('menus' in menu) {
    return menu.menus.some((m) => exactMatchPath(m, path));
  }
  return menu.paths.includes(path);
};

interface Props {
  menu: Menu;
  pathname: string;
  nested?: boolean;
  permissionNames: string[] | undefined;
  requiredPermissions?: string[];
  onClickMenu?: (event: unknown) => void;
}

const MenuLink: FC<Props> = (props) => {
  const { menu, pathname, nested, permissionNames, onClickMenu } = props;
  const classes = useStyles();

  if (
    menu.permissions &&
    !menu.permissions.some((e) => permissionNames?.includes(e))
  ) {
    return <></>;
  }

  if ('menus' in menu) {
    return (
      <MenuCollapse
        menu={menu}
        pathname={pathname}
        onClickMenu={onClickMenu}
        permissionNames={permissionNames}
      />
    );
  }
  return (
    <ListItemButton
      component={Link}
      to={menu.to}
      selected={exactMatchPath(menu, pathname)}
      className={nested ? classes.nested : undefined}
      onClick={onClickMenu}
    >
      {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}
      <ListItemText inset={false} primary={menu.text} />
    </ListItemButton>
  );
};

export default MenuLink;
