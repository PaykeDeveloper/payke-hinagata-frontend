import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { Trans } from 'react-i18next';
import ContentBody from 'src/views/components/molecules/ContentBody';
import ContentHeader from 'src/views/components/molecules/ContentHeader';
import ContentWrapper from 'src/views/components/molecules/ContentWrapper';

// FIXME: SAMPLE CODE
const Home: FC = () => {
  return (
    <ContentWrapper>
      <ContentHeader>
        <Trans>Home</Trans>
      </ContentHeader>
      <ContentBody>
        <Typography>Home</Typography>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Home;
