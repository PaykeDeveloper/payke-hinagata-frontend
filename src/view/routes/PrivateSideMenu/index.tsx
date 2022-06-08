import React, { ComponentType, FC } from 'react';
import { Route } from 'react-router-dom';
import { privatePaths, privateRoutes } from '../PrivateRoutes';
import { MenuType } from '../PrivateRoutes/routes';
import CommonSideMenu from './components/CommonSideMenu';
import DivisionSideMenu from './components/DivisionSideMenu';
import { PrivateSideMenuProps } from './types';

const getComponent = (
  menuType: MenuType
): ComponentType<PrivateSideMenuProps> => {
  switch (menuType) {
    case MenuType.Division: {
      return DivisionSideMenu;
    }
    case MenuType.Common: {
      return CommonSideMenu;
    }
  }
};

const PrivateSideMenu: FC<{
  onClickMenu?: (event: unknown) => void;
}> = ({ onClickMenu }) => {
  return (
    <Route
      path={privatePaths}
      render={(routeProps) => {
        const {
          match: { params, path },
        } = routeProps;
        const route = privateRoutes.find((route) => route.path === path);
        const Component = getComponent(route?.menuType ?? MenuType.Common);
        return (
          <Component path={path} params={params} onClickMenu={onClickMenu} />
        );
      }}
    />
  );
};

export default PrivateSideMenu;
