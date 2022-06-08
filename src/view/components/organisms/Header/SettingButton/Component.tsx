import React, { FC, MouseEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { Trans } from 'react-i18next';
import {
  SettingsIcon,
  MoreVertIcon,
  PasswordIcon,
  PowerSettingsNewIcon,
} from 'src/view/base/material-ui/Icon';
import MenuItemLink from 'src/view/components/atoms/MenuItemLink';
import { changePasswordPath, myUserEditPath } from 'src/view/routes/paths';

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    minWidth: theme.spacing(5),
  },
}));

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
  const classes = useStyles();
  return (
    <>
      <IconButton color="inherit" onClick={handleMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
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
          <ListItemIcon className={classes.listItemIcon}>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <Typography>
            <Trans>Logout</Trans>
          </Typography>
        </MenuItem>
        <MenuItemLink to={myUserEditPath}>
          <ListItemIcon className={classes.listItemIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <Typography>
            <Trans>Setting</Trans>
          </Typography>
        </MenuItemLink>
        <MenuItemLink to={changePasswordPath}>
          <ListItemIcon className={classes.listItemIcon}>
            <PasswordIcon />
          </ListItemIcon>
          <Typography>
            <Trans>Change password</Trans>
          </Typography>
        </MenuItemLink>
      </Menu>
    </>
  );
};

export default Component;
