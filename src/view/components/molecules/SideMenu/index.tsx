import { FC, Fragment, ReactElement } from 'react';
import { Divider, List, styled } from '@mui/material';
import MenuLink, { Menu } from './MenuLink';

const StyledDiv = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const StyledList = styled(List)(({ theme }) => ({
  '& .MuiListSubheader-root': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
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
  return (
    <>
      <StyledDiv />
      {menuLists.map(({ subheader, menus }, listIndex) => (
        <Fragment key={listIndex}>
          <Divider />
          <StyledList subheader={subheader}>
            {menus.map((menu, index) => (
              <MenuLink
                key={index}
                menu={menu}
                path={path}
                onClickMenu={onClickMenu}
                permissionNames={permissionNames}
              />
            ))}
          </StyledList>
        </Fragment>
      ))}
    </>
  );
};

export default SideMenu;
