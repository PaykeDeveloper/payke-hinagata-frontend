import React, { useCallback, ReactElement, ChangeEvent } from 'react';
import { makeStyles, MenuItem } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useTranslation } from 'react-i18next';
import SelectField from 'src/view/base/material-ui/SelectField';
import MenuLink, { Menu } from './MenuLink';

const useStyles = makeStyles((theme) => ({
  selectForm: {
    width: '100%',
  },
}));

interface Props<T extends object> {
  menu: SelectableMenu;
  pathname: string;
  paths: string[];
  permissionNames: string[] | undefined;
  requiredPermissions?: string[];
  selectName: string;
  selectLabel: string;
  initialValues?: T | undefined;
  onChange?: (data: ChangeEvent<T>) => void;
  onClickMenu?: (event: unknown) => void;
}

export interface SelectableMenu {
  text: ReactElement;
  name: string;
  label: string;
  selects: SelectableMenuSelect[];
  menus: Menu[];
  icon?: ReactElement;
  permissionNames: string[] | undefined;
  requiredPermissions?: string[];
}

export interface SelectableMenuSelect {
  text: string;
  value: string;
}

const SelectableMenuLink = <T extends object>(props: Props<T>) => {
  const {
    menu,
    pathname,
    paths,
    initialValues,
    permissionNames,
    onClickMenu,
    onChange,
  } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const options = menu.selects.map((item) => ({
    value: item.value,
    display: item.text,
  }));

  const changeCb = useCallback(
    (data) => {
      onChange && onChange(data);
    },
    [onChange]
  );

  if (
    menu.requiredPermissions &&
    !menu.requiredPermissions.some((e) => permissionNames?.includes(e))
  ) {
    return <></>;
  }

  return (
    <>
      <ListItem>
        <SelectField
          label={t(menu.label)}
          formControlProps={{ className: classes.selectForm }}
          selectProps={{
            onChange: (event, child) => {
              changeCb(event);
            },
            defaultValue: initialValues,
          }}
          helperText=""
        >
          {options.map((option, i) => (
            <MenuItem key={i} value={`${option.value}`}>
              {option.display}
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
    </>
  );
};

export default SelectableMenuLink;
