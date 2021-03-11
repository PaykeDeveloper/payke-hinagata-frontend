import React, { FC } from 'react';

import Breadcrumbs, { BreadcrumbsProps } from '@material-ui/core/Breadcrumbs';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import RouterLink, {
  RouterLinkProps,
} from 'src/views/components/common/RouterLink';

export interface RouterBreadcrumbsProps {
  links?: RouterLinkProps[];
  breadcrumbsProps?: BreadcrumbsProps;
  typographyProps?: TypographyProps;
}

const RouterBreadcrumbs: FC<RouterBreadcrumbsProps> = (props) => {
  const { children, links, breadcrumbsProps, typographyProps } = props;
  return (
    <Breadcrumbs {...breadcrumbsProps}>
      {links?.map((link, index) => (
        <RouterLink key={index} {...link} />
      ))}
      <Typography color="textPrimary" {...typographyProps}>
        {children}
      </Typography>
    </Breadcrumbs>
  );
};

export default RouterBreadcrumbs;
