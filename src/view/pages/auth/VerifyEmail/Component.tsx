import React, { FC, useEffect } from 'react';

const Component: FC<{
  onSubmit: () => void;
}> = (props) => {
  const { onSubmit, children } = props;
  useEffect(() => {
    onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default Component;
