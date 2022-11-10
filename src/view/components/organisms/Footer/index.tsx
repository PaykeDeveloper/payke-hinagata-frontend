import { FC } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { siteName } from 'src/base/constants';
import { drawerWidth } from 'src/view/components/organisms/Sidebar';

const StyledBox = styled(Box, {
  shouldForwardProp: (propName) => propName !== 'shift',
})<{ shift: boolean | undefined }>(({ theme, shift }) => {
  const base = {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  };
  return shift
    ? {
        ...base,
        marginLeft: drawerWidth,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    : base;
});

interface Props {
  upMd?: boolean;
  open?: boolean;
}

const Footer: FC<Props> = (props) => {
  const { upMd, open } = props;
  return (
    <StyledBox height="100%" textAlign="center" shift={upMd && open}>
      <Typography variant="caption">© {siteName}</Typography>
    </StyledBox>
  );
};

export default Footer;
