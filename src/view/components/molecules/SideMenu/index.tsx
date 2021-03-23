import React, { FC, Fragment, ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import MenuLink, { Menu } from './MenuLink';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));

export type MenuList = {
  subheader?: ReactElement;
  menus: Menu[];
};

interface Props {
  pathname: string;
  onClickMenu?: (event: unknown) => void;
  menuLists: MenuList[];
}

const getPaths = (menu: Menu): string[] => {
  if ('menus' in menu) {
    return menu.menus.map((m) => getPaths(m)).flat();
  }
  return menu.paths;
};

const SideMenu: FC<Props> = (props) => {
  const { pathname, menuLists, onClickMenu } = props;
  const paths = menuLists
    .map((menuList) => menuList.menus.map((m) => getPaths(m)).flat())
    .flat()
    .reverse();
  const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar} />
      {menuLists.map(({ subheader, menus }, listIndex) => (
        <Fragment key={listIndex}>
          <Divider />
          <List subheader={subheader}>
            {menus.map((menu, index) => (
              <MenuLink
                key={index}
                menu={menu}
                pathname={pathname}
                paths={paths}
                onClickMenu={onClickMenu}
              />
            ))}
          </List>
        </Fragment>
      ))}
    </>
  );
};

export default SideMenu;
