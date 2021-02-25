import React, { FC } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import menus from 'src/views/routes/menus';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
}));

interface Props {
  onClickMenu?: (event: unknown) => void;
}

const SideMenu: FC<Props> = (props) => {
  const { onClickMenu } = props;
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menus.map(({ to, primaryText, icon, paths }) => (
          <ListItem
            button
            component={Link}
            to={to}
            onClick={onClickMenu}
            selected={pathname === to || paths?.includes(pathname)}
          >
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText primary={primaryText} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SideMenu;
