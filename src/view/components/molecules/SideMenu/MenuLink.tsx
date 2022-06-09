import { FC, ReactElement } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuCollapse from './MenuCollapse';

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
  if ('menus' in menu) {
    return menu.menus.some((m) => exactMatchPath(m, path));
  }
  return menu.paths.includes(path);
};

interface Props {
  menu: Menu;
  path: string;
  nested?: boolean;
  permissionNames: string[] | undefined;
  requiredPermissions?: string[];
  onClickMenu?: (event: unknown) => void;
}

const MenuLink: FC<Props> = (props) => {
  const { menu, path, nested, permissionNames, onClickMenu } = props;

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
        path={path}
        onClickMenu={onClickMenu}
        permissionNames={permissionNames}
      />
    );
  }
  return (
    <ListItemButton
      component={Link}
      to={menu.to}
      selected={exactMatchPath(menu, path)}
      sx={(theme) => (nested ? { paddingLeft: theme.spacing(4) } : {})}
      onClick={onClickMenu}
    >
      {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}
      <ListItemText inset={false} primary={menu.text} />
    </ListItemButton>
  );
};

export default MenuLink;
