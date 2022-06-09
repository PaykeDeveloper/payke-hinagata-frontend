import { FC } from 'react';
import { Box, BoxProps } from '@mui/material';

interface Props {
  boxProps?: BoxProps;
}

const ContentBody: FC<Props> = (props) => {
  const { children, boxProps } = props;
  return <Box {...boxProps}>{children}</Box>;
};

ContentBody.defaultProps = {
  boxProps: { mt: 4, mb: 4 },
};

export default ContentBody;
