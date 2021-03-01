import React, { useCallback } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Loader from 'src/views/components/Loader';

type Props<T> = Omit<ButtonProps, 'onClick'> & {
  onClick: () => Promise<T>;
};

export default function LoaderButton<T>(props: Props<T>) {
  const { onClick, disabled, ...otherProps } = props;

  const [loading, setLoading] = React.useState(false);

  const handleClick = useCallback(async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  }, [onClick, setLoading]);

  return (
    <Loader loading={loading} size={20}>
      <Button
        onClick={handleClick}
        disabled={disabled || loading}
        {...otherProps}
      />
    </Loader>
  );
}
