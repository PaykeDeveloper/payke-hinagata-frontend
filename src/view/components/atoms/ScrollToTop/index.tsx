import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ScrollToTop: FC = () => {
  const history = useHistory();

  useEffect(
    () =>
      history.listen((location, action) => {
        if (action !== 'POP') {
          window.scrollTo(0, 0);
        }
      }),
    [history],
  );

  return <></>;
};

export default ScrollToTop;
