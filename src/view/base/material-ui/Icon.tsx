import React, { FC } from 'react';
import MuiIcon, { IconProps } from '@material-ui/core/Icon';

const Icon: FC<IconProps> = (props) => <MuiIcon {...props} />;

export default Icon;

const createIcon =
  (icon: string): FC<IconProps> =>
  (props) =>
    <Icon {...props}>{icon}</Icon>;

export const MenuIcon = createIcon('menu');
export const MoreVertIcon = createIcon('more_vert');
export const SaveIcon = createIcon('save');
export const PowerSettingsNewIcon = createIcon('power_settings_new');
export const ExpandLessIcon = createIcon('expand_less');
export const ExpandMoreIcon = createIcon('expand_more');
export const NavigateBeforeIcon = createIcon('navigate_before');
export const AddIcon = createIcon('add');
export const DeleteIcon = createIcon('delete');
export const CloseIcon = createIcon('close');
export const EditIcon = createIcon('edit');
export const ErrorOutlineIcon = createIcon('error_outline');
export const SendIcon = createIcon('send');
export const PersonAddIcon = createIcon('person_add');
export const PasswordIcon = createIcon('password');
export const BlockIcon = createIcon('block');
export const CheckIcon = createIcon('check');
export const AttachFileIcon = createIcon('attach_file');
export const TaskIcon = createIcon('task');
export const FileDownloadIcon = createIcon('file_download');
export const FileUploadIcon = createIcon('file_upload');
export const SettingsIcon = createIcon('settings');

// FIXME: SAMPLE CODE
export const HomeIcon = createIcon('home');
export const GroupsIcon = createIcon('groups');
export const PeopleIcon = createIcon('people');
export const FolderIcon = createIcon('folder');
export const DomainIcon = createIcon('domain');
