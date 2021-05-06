import React, { ChangeEvent, Fragment, ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import MenuLink, {
  Menu,
} from 'src/view/components/molecules/SideMenu/MenuLink';
import SelectableMenuLink from 'src/view/components/molecules/SideMenu/SelectableMenuLink';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));

export type MenuList = {
  subheader?: ReactElement;
  menus: Menu[];
  requiredPermissions?: string[];
};

export interface Props<T> {
  pathname: string;
  menuLists: MenuList[];
  initialValues?: T | undefined;
  permissionNames: string[] | undefined;

  onClickMenu?: (event: unknown) => void;
  onChange?: (data: ChangeEvent<T>) => void;
}

const getPaths = (menu: Menu): string[] => {
  if ('menus' in menu) {
    return menu.menus.map((m) => getPaths(m)).flat();
  }
  return menu.paths;
};

const SideMenu = <T extends object>(props: Props<T>) => {
  const {
    pathname,
    menuLists,
    permissionNames,
    initialValues,
    onClickMenu,
    onChange,
  } = props;
  const paths = menuLists
    .map((menuList) => menuList.menus.map((m) => getPaths(m)).flat())
    .flat()
    .reverse();
  const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar} />
      {menuLists.map(({ subheader, menus, requiredPermissions }, listIndex) =>
        requiredPermissions &&
        !requiredPermissions.some((e) => permissionNames?.includes(e)) ? (
          <></>
        ) : (
          <Fragment key={listIndex}>
            <Divider />
            <List subheader={subheader}>
              {menus.map((menu, index) =>
                'selects' in menu ? (
                  <SelectableMenuLink
                    menu={menu}
                    pathname={pathname}
                    paths={paths}
                    onClickMenu={onClickMenu}
                    selectName={menu.name}
                    selectLabel={menu.label}
                    initialValues={initialValues}
                    onChange={onChange}
                    permissionNames={permissionNames}
                  />
                ) : (
                  <MenuLink
                    key={index}
                    menu={menu}
                    pathname={pathname}
                    paths={paths}
                    onClickMenu={onClickMenu}
                    permissionNames={permissionNames}
                  />
                )
              )}
            </List>
          </Fragment>
        )
      )}
    </>
  );
};

export default SideMenu;
