import React, { FC, Fragment, ReactElement } from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import makeStyles from '@mui/styles/makeStyles';
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
  value: number;
}

export interface SelectableMenu extends CollapseMenu {
  name: string;
  label: string;
  selects: SelectableMenuSelect[];
}

export interface Props {
  pathname: string;
  topMenuLists: MenuList[];
  middleMenuLists: MenuList<SelectableMenu>[];
  bottomMenuLists: MenuList[];
  menuDivisionId: number | null;
  permissionNames: string[] | undefined;

  onChangeDivisionId: (value: number) => void;
  onClickMenu?: (event: unknown) => void;
}

const Component: FC<Props> = (props) => {
  const {
    pathname,
    topMenuLists,
    middleMenuLists,
    bottomMenuLists,
    permissionNames,
    menuDivisionId,
    onChangeDivisionId,
    onClickMenu,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

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
                path={pathname}
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
                      native: true,
                      value: menuDivisionId ?? '',
                      onChange: (data) => {
                        onChangeDivisionId(data.target.value as number);
                      },
                    }}
                    helperText=""
                  >
                    {!menuDivisionId && <option />}
                    {menu.selects.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </SelectField>
                </ListItem>
                <List disablePadding>
                  {menu.menus?.map((m, i) => (
                    <MenuLink
                      key={i}
                      menu={m}
                      path={pathname}
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
                path={pathname}
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
