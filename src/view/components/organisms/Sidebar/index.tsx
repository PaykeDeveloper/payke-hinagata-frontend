import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import SwipeDrawer from '@material-ui/core/SwipeableDrawer';
import { createSelector } from 'reselect';
import { StoreState, useStoreSelector } from 'src/store';
import { permissionNamesSelector } from 'src/store/state/domain/common/user/selectors';
import SideMenu, { MenuList } from 'src/view/components/molecules/SideMenu';
import { CollapseMenu } from '../../molecules/SideMenu/MenuLink';

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  },
}));

interface Props {
  upMd: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;

  pathname: string;
  menuLists: MenuList[];
}

const selector = createSelector(
  permissionNamesSelector,
  (_: StoreState, params: { menuLists: MenuList[] }) => params.menuLists,
  (permissionNames, menuLists) =>
    menuLists.map((item) => {
      const newItem = { ...item };
      newItem.menus = item.menus.flatMap((item) => {
        if (
          item.requiredPermissions &&
          !item.requiredPermissions?.every((e) => permissionNames?.includes(e))
        ) {
          return [];
        } else {
          const collapseMenu = item as CollapseMenu;
          if (collapseMenu.menus) {
            collapseMenu.menus = collapseMenu.menus.flatMap((cMenu) => {
              if (
                cMenu.requiredPermissions &&
                !cMenu.requiredPermissions?.every((e) =>
                  permissionNames?.includes(e)
                )
              ) {
                return [];
              } else {
                return [cMenu];
              }
            });
            return [item];
          } else {
            return [item];
          }
        }
      });
      return newItem;
    })
);

const Sidebar: FC<Props> = (props) => {
  const { upMd, open, setOpen, pathname, menuLists } = props;
  const classes = useStyles();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredMenuLists = useStoreSelector((s) =>
    selector(s, {
      menuLists,
    })
  );

  return upMd ? (
    <Drawer
      classes={{ paper: classes.drawerPaper }}
      variant="persistent"
      open={open}
    >
      <SideMenu pathname={pathname} menuLists={filteredMenuLists} />
    </Drawer>
  ) : (
    <SwipeDrawer
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      classes={{ paper: classes.drawerPaper }}
    >
      <SideMenu
        pathname={pathname}
        menuLists={menuLists}
        onClickMenu={handleClose}
      />
    </SwipeDrawer>
  );
};

export default Sidebar;
