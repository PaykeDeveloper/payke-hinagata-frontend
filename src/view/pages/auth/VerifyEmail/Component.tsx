import { FC, useEffect, useRef } from 'react';

const Component: FC<{
  onSubmit: () => void;
}> = (props) => {
  const ref = useRef(false);
  const { onSubmit } = props;
  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      onSubmit();
    }
  }, [onSubmit]);

  return <></>;
};

export default Component;
