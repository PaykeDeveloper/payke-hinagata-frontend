import React, { FC, useMemo } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { RouterLinkProps } from 'src/views/components/atoms/RouterLink';
import RouterBreadcrumbs from 'src/views/components/molecules/RouterBreadcrumbs';

interface Props {
  links?: RouterLinkProps[];
}

const ContentHeader: FC<Props> = (props) => {
  const { children, links } = props;
  const filteredLinks = useMemo(
    () => links?.filter((link) => !!link.children),
    [links]
  );
  return (
    <>
      <Box mt={3}>
        <RouterBreadcrumbs links={filteredLinks} />
      </Box>
      <Box>
        <Typography variant="h4">{children || <>&nbsp;</>}</Typography>
      </Box>
    </>
  );
};

export default ContentHeader;
