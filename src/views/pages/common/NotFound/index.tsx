import React, { FC } from 'react';
import { ErrorStatus, NotFoundError } from 'src/store/types';
import ContentBody from 'src/views/components/molecules/ContentBody';
import ContentHeader from 'src/views/components/molecules/ContentHeader';
import ContentWrapper from 'src/views/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/views/components/molecules/ErrorWrapper';

const NotFound: FC = () => {
  const error: NotFoundError = {
    status: ErrorStatus.NotFound,
    data: undefined,
  };
  return (
    <ContentWrapper>
      <ContentHeader />
      <ContentBody>
        <ErrorWrapper error={error} />
      </ContentBody>
    </ContentWrapper>
  );
};

export default NotFound;
