// FIXME: SAMPLE CODE

import React, { FC } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { Trans } from 'react-i18next';
import { formatDate } from 'src/base/dateFormat';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { StoreError, StoreStatus } from 'src/store/types';
import DefinitionList from 'src/view/base/material-ui/DefinitionList';
import { EditIcon, NavigateBeforeIcon } from 'src/view/base/material-ui/Icon';
import Loader from 'src/view/components/atoms/Loader';
import Buttons from 'src/view/components/molecules/Buttons';
import ContentBody from 'src/view/components/molecules/ContentBody';
import ContentHeader from 'src/view/components/molecules/ContentHeader';
import ContentWrapper from 'src/view/components/molecules/ContentWrapper';
import ErrorWrapper from 'src/view/components/molecules/ErrorWrapper';
import { divisionsPath, rootPath } from 'src/view/routes/paths';

export type PermissionList = {
  divisionUpdate: boolean;
  usersView: boolean;
};

const Component: FC<{
  division: Division | undefined;
  divisionStatus: StoreStatus;
  errors: (StoreError | undefined)[];
  permission: PermissionList;

  onBack: () => void;
  onClickEditDivision: () => void;
}> = (props) => {
  const {
    division,
    divisionStatus,
    errors,
    permission,
    onBack,
    onClickEditDivision,
  } = props;

  return (
    <ContentWrapper>
      <ContentHeader
        links={[
          { children: <Trans>Home</Trans>, to: rootPath },
          { children: <Trans>Divisions</Trans>, to: divisionsPath },
        ]}
      >
        {division?.name}
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
                <Button
                  disabled={!permission.divisionUpdate}
                  onClick={onClickEditDivision}
                  startIcon={<EditIcon />}
                  variant="outlined"
                  color="primary"
                >
                  <Trans>Edit</Trans>
                </Button>,
              ]}
            />
            <Loader status={divisionStatus}>
              <Card>
                <CardContent>
                  <DefinitionList
                    list={[
                      {
                        key: <Trans>Division</Trans>,
                        value: <Typography>{division?.name}</Typography>,
                      },
                      {
                        key: <Trans>Created date</Trans>,
                        value: (
                          <Typography>
                            {formatDate(division?.createdAt)}
                          </Typography>
                        ),
                      },
                      {
                        key: <Trans>Updated date</Trans>,
                        value: (
                          <Typography>
                            {formatDate(division?.updatedAt)}
                          </Typography>
                        ),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </Loader>
          </Box>
        </ErrorWrapper>
      </ContentBody>
    </ContentWrapper>
  );
};

export default Component;
