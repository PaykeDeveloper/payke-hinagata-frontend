// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { Trans } from 'react-i18next';
import { BookImportCsv } from 'src/store/state/domain/sample/bookImportCsvs/types';
import { StoreError, StoreStatus } from 'src/store/types';
import DefinitionList from 'src/view/base/material-ui/DefinitionList';
import { NavigateBeforeIcon } from 'src/view/base/material-ui/Icon';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import { bookImportCsvsPath, rootPath } from 'src/view/routes/paths';

const Component: FC<{
  bookImportCsv: BookImportCsv | undefined;
  bookImportCsvStatus: StoreStatus;
  errors: (StoreError | undefined)[];

  onBack: () => void;
}> = (props) => {
  const {
    bookImportCsv,
    errors,
    onBack,
  } = props;
  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: <Trans>Home</Trans>, to: rootPath },
          { children: <Trans>BookImportCsvs</Trans>, to: bookImportCsvsPath },
        ]}
      >
        <Trans>BookImportCsvDetail</Trans>
      </ContentHeader>
      <ContentBody>
        <ErrorWrapper errors={errors}>
          <Box>
            <Buttons
              leftButtons={[
                <Button
                  onClick={onBack}
                  startIcon={<NavigateBeforeIcon />}
                  variant="outlined"
                >
                  <Trans>Back</Trans>
                </Button>,
              ]}
            />
            <Card>
              <CardContent>
                <DefinitionList
                  list={[
                    {
                      key: <Trans>FileName</Trans>,
                      value: (
                        <Typography>
                          {bookImportCsv?.fileNameOriginal}
                        </Typography>
                      ),
                    },
                    {
                      key: <Trans>Status</Trans>,
                      value: (
                        <Typography>{bookImportCsv?.importStatus}</Typography>
                      ),
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </Box>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
