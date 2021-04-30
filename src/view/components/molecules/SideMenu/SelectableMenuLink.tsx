import React, { useCallback, ReactElement } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useTranslation } from 'react-i18next';
import { BaseForm } from 'src/view/base/formik/Form';
import { BaseSelectField } from 'src/view/base/formik/SelectField';
import Options from '../Options';
import MenuLink, { Menu } from './MenuLink';

interface Props<T extends object> {
  menu: SelectableMenu;
  pathname: string;
  paths: string[];
  permissionNames: string[] | undefined;
  requiredPermissions?: string[];
  selectName: string;
  selectLabel: string;
  initialValues?: T | undefined;
  onChange?: (data: T) => void;
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

  const onSubmit = useCallback(() => {}, []);

  if (
    menu.requiredPermissions &&
    !menu.requiredPermissions.some((e) => permissionNames?.includes(e))
  ) {
    return <></>;
  }

  return (
    <BaseForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={changeCb}
    >
      <ListItem>
        <BaseSelectField
          name={menu.name}
          label={t(menu.label)}
          nullable
          helperText=""
        >
          <Options objects={options} display="display" value="value"></Options>
        </BaseSelectField>
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
    </BaseForm>
  );
};

export default SelectableMenuLink;
