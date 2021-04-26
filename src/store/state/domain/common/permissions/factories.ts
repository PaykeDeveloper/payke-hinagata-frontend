import {
  AllPermission,
  ModelPermission,
  OwnPermission,
  Permission,
} from '../../common/permissions/types';
import { PermissionType } from './types';

export const PermissionFactory = {
  ViewOwn: <M extends ModelPermission<string, OwnPermission>>(
    resource: string
  ) => [(resource + '_' + PermissionType.ViewOwn) as M],
  ViewAll: <M extends ModelPermission<string, AllPermission>>(
    resource: string
  ) => [(resource + '_' + PermissionType.ViewAll) as M],
  ViewOwnAll: <M extends ModelPermission<string, Permission>>(
    resource: string
  ) =>
    [
      ...PermissionFactory.ViewOwn(resource),
      ...PermissionFactory.ViewAll(resource),
    ] as M[],
  CreateOwn: <M extends ModelPermission<string, OwnPermission>>(
    resource: string
  ) => [(resource + '_' + PermissionType.CreateOwn) as M],
  CreateAll: <M extends ModelPermission<string, AllPermission>>(
    resource: string
  ) => [(resource + '_' + PermissionType.CreateAll) as M],
  CreateOwnAll: <M extends ModelPermission<string, Permission>>(
    resource: string
  ) =>
    [
      ...PermissionFactory.CreateOwn(resource),
      ...PermissionFactory.CreateAll(resource),
    ] as M[],
  UpdateOwn: <M extends ModelPermission<string, OwnPermission>>(
    resource: string
  ) => [(resource + '_' + PermissionType.UpdateOwn) as M],
  UpdateAll: <M extends ModelPermission<string, AllPermission>>(
    resource: string
  ) => [(resource + '_' + PermissionType.UpdateAll) as M],
  UpdateOwnAll: <M extends ModelPermission<string, Permission>>(
    resource: string
  ) =>
    [
      ...PermissionFactory.UpdateOwn(resource),
      ...PermissionFactory.UpdateAll(resource),
    ] as M[],
  DeleteOwn: <M extends ModelPermission<string, OwnPermission>>(
    resource: string
  ) => [(resource + '_' + PermissionType.DeleteOwn) as M],
  DeleteAll: <M extends ModelPermission<string, AllPermission>>(
    resource: string
  ) => [(resource + '_' + PermissionType.DeleteAll) as M],
  DeleteOwnAll: <M extends ModelPermission<string, Permission>>(
    resource: string
  ) =>
    [
      ...PermissionFactory.DeleteOwn(resource),
      ...PermissionFactory.DeleteAll(resource),
    ] as M[],
};
