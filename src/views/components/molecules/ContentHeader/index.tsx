import React, { FC } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { RouterLinkProps } from 'src/views/components/atoms/RouterLink';
import RouterBreadcrumbs from 'src/views/components/molecules/RouterBreadcrumbs';

interface Props {
  links?: RouterLinkProps[];
}

const ContentHeader: FC<Props> = (props) => {
  const { children, links } = props;
  return (
    <>
      <Box mt={3}>
        <RouterBreadcrumbs links={links} />
      </Box>
      <Box>
        <Typography variant="h4">{children || <>&nbsp;</>}</Typography>
      </Box>
    </>
  );
};

export default ContentHeader;
