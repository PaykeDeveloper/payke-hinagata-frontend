import React, { FC, Fragment, ReactElement } from 'react';

import { Divider, List } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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
  path: string;
  onClickMenu?: (event: unknown) => void;
  permissionNames: string[] | undefined;
  menuLists: MenuList[];
}

const SideMenu: FC<Props> = (props) => {
  const { path, menuLists, permissionNames, onClickMenu } = props;
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
                path={path}
                onClickMenu={onClickMenu}
                permissionNames={permissionNames}
              />
            ))}
          </List>
        </Fragment>
      ))}
    </>
  );
};

export default SideMenu;
