import { createSelector } from '@reduxjs/toolkit';
import { PermissionFactory } from '../../common/permissions/factories';
import { permissionNamesSelector } from '../../common/user/selectors';

export const deletePermissionCheckSelector = createSelector(
  permissionNamesSelector,
  (permissionNames) =>
    PermissionFactory.DeleteOwnAll('division').some((e) =>
      permissionNames?.includes(e)
    )
);
