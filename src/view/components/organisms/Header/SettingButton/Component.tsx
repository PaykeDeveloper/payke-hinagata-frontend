import { FC, MouseEvent, useState } from 'react';
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material';
import { Trans } from 'react-i18next';
import {
  SettingsIcon,
  MoreVertIcon,
  PasswordIcon,
  PowerSettingsNewIcon,
} from 'src/view/base/material-ui/Icon';
import MenuItemLink from 'src/view/components/atoms/MenuItemLink';
import { changePasswordPath, myUserEditPath } from 'src/view/routes/paths';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: theme.spacing(5),
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
          <StyledListItemIcon>
            <PowerSettingsNewIcon />
          </StyledListItemIcon>
          <Typography>
            <Trans>Logout</Trans>
          </Typography>
        </MenuItem>
        <MenuItemLink to={myUserEditPath}>
          <StyledListItemIcon>
            <SettingsIcon />
          </StyledListItemIcon>
          <Typography>
            <Trans>Setting</Trans>
          </Typography>
        </MenuItemLink>
        <MenuItemLink to={changePasswordPath}>
          <StyledListItemIcon>
            <PasswordIcon />
          </StyledListItemIcon>
          <Typography>
            <Trans>Change password</Trans>
          </Typography>
        </MenuItemLink>
      </Menu>
    </>
  );
};

export default Component;
