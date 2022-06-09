import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';
import RouterBreadcrumbs, {
  RouterBreadcrumbLinkProps,
} from 'src/view/components/molecules/RouterBreadcrumbs';

interface Props {
  links?: RouterBreadcrumbLinkProps[];
}

const ContentHeader: FC<Props> = (props) => {
  const { children, links } = props;
  return (
    <>
      <Box mt={2} minHeight={24}>
        <RouterBreadcrumbs links={links} />
      </Box>
      <Box mt={1}>
        <Typography variant="h5">{children || <>&nbsp;</>}</Typography>
      </Box>
    </>
  );
};

export default ContentHeader;
