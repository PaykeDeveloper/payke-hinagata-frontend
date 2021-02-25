import React, { FC, MouseEvent, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { Trans } from 'react-i18next';
import {
  MoreVertIcon,
  PowerSettingsNewIcon,
} from 'src/views/base/material-ui/Icon';

interface Props {
  onLogout: () => void;
}

const Component: FC<Props> = (props) => {
  const { onLogout } = props;
  const [anchorEl, setAnchorEl] = useState<Element | undefined>();
  const handleMenu = (event: MouseEvent) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(undefined);
  const handleLogout = () => {
    handleClose();
    onLogout();
  };
  return (
    <>
      <IconButton color="inherit" onClick={handleMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <Typography>
            <Trans>Logout</Trans>
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Component;
