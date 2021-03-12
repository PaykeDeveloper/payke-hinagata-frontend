import React, { FC } from 'react';
import { Trans } from 'react-i18next';
import ContentHeader from 'src/views/components/common/ContentHeader';
import ContentWrapper from 'src/views/components/common/ContentWrapper';

// FIXME: SAMPLE CODE
const Home: FC = () => (
  <ContentWrapper>
    <ContentHeader>
      <Trans>Home</Trans>
    </ContentHeader>
  </ContentWrapper>
);

export default Home;
