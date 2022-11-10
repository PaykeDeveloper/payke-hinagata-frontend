import { FC } from 'react';
import { Box, BoxProps } from '@mui/material';
import { WithChildren } from 'src/view/base/types';

interface Props extends WithChildren {
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
