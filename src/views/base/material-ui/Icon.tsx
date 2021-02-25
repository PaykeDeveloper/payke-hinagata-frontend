import React, { FC } from 'react';
import MuiIcon, { IconProps } from '@material-ui/core/Icon';

const Icon: FC<IconProps> = (props) => <MuiIcon {...props} />;

export default Icon;

const createIcon = (icon: string): FC<IconProps> => (props) => (
  <Icon {...props}>{icon}</Icon>
);

export const MenuIcon = createIcon('menu');
export const MoreVertIcon = createIcon('more_vert');
export const SaveIcon = createIcon('save');
export const PowerSettingsNewIcon = createIcon('power_settings_new');

// FIXME: サンプルコードです。
export const HomeIcon = createIcon('home');
export const MenuBookIcon = createIcon('menu_book');
