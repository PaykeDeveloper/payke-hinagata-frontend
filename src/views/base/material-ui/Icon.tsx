import React, { FC } from 'react';
import MuiIcon, { IconProps } from '@material-ui/core/Icon';

const Icon: FC<IconProps> = (props) => <MuiIcon {...props} />;

export default Icon;

const createIcon = (icon: string): FC<IconProps> => (props) => (
  <Icon {...props}>{icon}</Icon>
);

export const CancelIcon = createIcon('cancel');
export const AccountCircleIcon = createIcon('account_circle');
export const MenuIcon = createIcon('menu');
export const ExpandLessIcon = createIcon('expand_less');
export const ExpandMoreIcon = createIcon('expand_more');
export const BusinessIcon = createIcon('business');
export const InfoIcon = createIcon('info');
export const RefreshIcon = createIcon('refresh');
export const ToggleOffIcon = createIcon('toggle_off');
export const ToggleOnIcon = createIcon('toggle_on');
export const EditIcon = createIcon('edit');
export const AddIcon = createIcon('add');
export const DeleteIcon = createIcon('delete');
export const KeyboardArrowLeftIcon = createIcon('keyboard_arrow_left');
export const SaveIcon = createIcon('save');
export const AutoRenewIcon = createIcon('autorenew');
export const BuildIcon = createIcon('build');
export const ExitToAppIcon = createIcon('exit_to_app');
export const SettingsIcon = createIcon('settings');
export const RemoveCircleIcon = createIcon('remove_circle');
export const CloseIcon = createIcon('close');
export const FileCopyIcon = createIcon('file_copy');
export const ArrowForwardIosIcon = createIcon('arrow_forward_ios');
export const LockIcon = createIcon('lock');
export const PowerSettingsNewIcon = createIcon('power_settings_new');
export const WebIcon = createIcon('web');
export const InputIcon = createIcon('input');
export const PersonAddIcon = createIcon('person_add');
export const SendIcon = createIcon('send');
export const ListIcon = createIcon('list');
export const DomainIcon = createIcon('domain');
export const HelpOutlineIcon = createIcon('help_outline');
export const KeyboardBackspaceIcon = createIcon('keyboard_backspace');
export const NavigateNextIcon = createIcon('navigate_next');
