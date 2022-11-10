import { styled } from '@mui/material';
import { LinkTo } from 'src/view/base/react-router/types';
import LinkButton, {
  LinkButtonProps,
} from 'src/view/components/atoms/LinkButton';

type LinkAction<Row> = Omit<LinkButtonProps, 'to'> &
  (
    | {
        to: LinkTo | undefined;
      }
    | {
        getTo: (row: Row) => LinkTo | undefined;
      }
  );

export type LinkActions<Row> = LinkAction<Row>[];

const GridLinkButton = styled(LinkButton, {
  shouldForwardProp: (propName) => propName !== 'getTo',
})({});

const GridActions = <Row extends object>({
  row,
  actions,
}: {
  row: Row;
  actions: LinkActions<Row>;
}) => (
  <>
    {actions.map((action, index) => {
      const to = 'to' in action ? action.to : action.getTo(row);
      return to ? (
        <GridLinkButton key={index} size="small" {...action} to={to} />
      ) : undefined;
    })}
  </>
);

export default GridActions;
