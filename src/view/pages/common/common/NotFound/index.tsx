import { FC } from 'react';
import { ErrorStatus, NotFoundError } from 'src/store/types';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';

const NotFound: FC = () => {
  const error: NotFoundError = {
    status: ErrorStatus.NotFound,
    data: {},
  };
  return (
    <ContentWrapper>
      <ContentHeader>
        <></>
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper error={error}>
          <></>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default NotFound;
