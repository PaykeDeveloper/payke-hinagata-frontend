import React, {
  ChangeEvent,
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';
import { ListItem, makeStyles, MenuItem } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { useTranslation } from 'react-i18next';
import SelectField from 'src/view/base/material-ui/SelectField';
import MenuLink, {
  CollapseMenu,
  Menu,
} from 'src/view/components/molecules/SideMenu/MenuLink';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  selectListItem: {
    paddingTop: 0,
  },
  selectForm: {
    width: '100%',
  },
}));

export type MenuList<T extends Menu = Menu> = {
  subheader?: ReactElement;
  menus: T[];
};

interface SelectableMenuSelect {
  text: string;
  value: string;
}

export interface SelectableMenu extends CollapseMenu {
  name: string;
  label: string;
  selects: SelectableMenuSelect[];
  permissionNames: string[] | undefined;
}

export interface Props {
  pathname: string;
  topMenuLists: MenuList[];
  middleMenuLists: MenuList<SelectableMenu>[];
  bottomMenuLists: MenuList[];
  initialValue?: string;
  permissionNames: string[] | undefined;

  onClickMenu?: (event: unknown) => void;
  onChange?: (data: ChangeEvent<HTMLInputElement>) => void;
}

const getPaths = (menu: Menu): string[] => {
  if ('menus' in menu) {
    return menu.menus.map((m) => getPaths(m)).flat();
  }
  return menu.paths;
};

const Component: FC<Props> = (props) => {
  const {
    pathname,
    topMenuLists,
    middleMenuLists,
    bottomMenuLists,
    permissionNames,
    initialValue,
    onClickMenu,
    onChange,
  } = props;
  const paths = useMemo(
    () =>
      [...topMenuLists, ...middleMenuLists, ...bottomMenuLists]
        .map((menuList) => menuList.menus.map((m) => getPaths(m)).flat())
        .flat()
        .reverse(),
    [topMenuLists, middleMenuLists, bottomMenuLists]
  );
  const classes = useStyles();
  const { t } = useTranslation();

  const selectOnChange = useCallback(
    (data) => {
      onChange && onChange(data);
    },
    [onChange]
  );

  return (
    <>
      <div className={classes.toolbar} />
      {topMenuLists.map(({ subheader, menus }, listIndex) => (
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
                permissionNames={permissionNames}
              />
            ))}
          </List>
        </Fragment>
      ))}
      {middleMenuLists.map(({ subheader, menus }, listIndex) => (
        <Fragment key={listIndex}>
          <Divider />
          <List subheader={subheader}>
            {menus.map((menu, index) => (
              <Fragment key={index}>
                <ListItem className={classes.selectListItem}>
                  <SelectField
                    label={t(menu.label)}
                    formControlProps={{ className: classes.selectForm }}
                    selectProps={{
                      onChange: selectOnChange,
                      defaultValue: initialValue,
                    }}
                    helperText=""
                  >
                    {menu.selects.map((option, i) => (
                      <MenuItem key={i} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </SelectField>
                </ListItem>
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
              </Fragment>
            ))}
          </List>
        </Fragment>
      ))}
      {bottomMenuLists.map(({ subheader, menus }, listIndex) => (
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
                permissionNames={permissionNames}
              />
            ))}
          </List>
        </Fragment>
      ))}
    </>
  );
};

export default Component;
