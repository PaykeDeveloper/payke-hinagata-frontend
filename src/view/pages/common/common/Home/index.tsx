import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { Trans } from 'react-i18next';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';

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
