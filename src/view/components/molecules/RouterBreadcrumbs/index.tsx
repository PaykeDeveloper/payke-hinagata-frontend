import { FC } from 'react';
import {
  Breadcrumbs,
  BreadcrumbsProps,
  Typography,
  TypographyProps,
} from '@mui/material';
import RouterLink, {
  RouterLinkProps,
} from 'src/view/components/atoms/RouterLink';

export interface RouterBreadcrumbLinkProps extends Omit<RouterLinkProps, 'to'> {
  to?: RouterLinkProps['to'];
}

export interface RouterBreadcrumbsProps {
  links?: RouterBreadcrumbLinkProps[];
  breadcrumbsProps?: BreadcrumbsProps;
  typographyProps?: TypographyProps;
}

const RouterBreadcrumbs: FC<RouterBreadcrumbsProps> = (props) => {
  const { children, links, breadcrumbsProps, typographyProps } = props;
  return (
    <Breadcrumbs {...breadcrumbsProps}>
      {links?.map(({ to, ...linkProps }, index) =>
        to ? (
          <RouterLink key={index} to={to} {...linkProps} />
        ) : (
          <Typography key={index} component="div">
            {linkProps.children}
          </Typography>
        )
      )}
      <Typography color="textPrimary" {...typographyProps}>
        {children}
      </Typography>
    </Breadcrumbs>
  );
};

export default RouterBreadcrumbs;
