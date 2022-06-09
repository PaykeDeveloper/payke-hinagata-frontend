import i18next from 'i18next';
import { InvitationStatus } from 'src/store/state/domain/common/invitations/types';

export const getInvitationStatusLabel = (
  value: InvitationStatus | undefined,
  defaultMessage = ''
) => {
  switch (value) {
    case InvitationStatus.Approved:
      return i18next.t('Approved');
    case InvitationStatus.Denied:
      return i18next.t('Denied');
    case InvitationStatus.Pending:
      return i18next.t('Pending');
    default:
      return defaultMessage;
  }
};

export const getInvitationStatusOptions = () =>
  Object.values(InvitationStatus).map((value) => ({
    value,
    label: getInvitationStatusLabel(value),
  }));
