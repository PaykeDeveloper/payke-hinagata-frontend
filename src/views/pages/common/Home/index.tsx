import React, { FC } from 'react';
import { Trans } from 'react-i18next';
import ContentHeader from 'src/views/components/molecules/ContentHeader';
import ContentWrapper from 'src/views/components/molecules/ContentWrapper';

// FIXME: SAMPLE CODE
const Home: FC = () => (
  <ContentWrapper>
    <ContentHeader>
      <Trans>Home</Trans>
    </ContentHeader>
  </ContentWrapper>
);

export default Home;
