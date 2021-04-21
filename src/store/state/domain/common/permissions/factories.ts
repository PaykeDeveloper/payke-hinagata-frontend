import { PermissionType } from './types';

export const PermissionFactory = {
  ViewOwn: (resource: string) => [resource + '_' + PermissionType.ViewOwn],
  ViewAll: (resource: string) => [resource + '_' + PermissionType.ViewAll],
  ViewOwnAll: (resource: string) => [
    ...PermissionFactory.ViewOwn(resource),
    ...PermissionFactory.ViewAll(resource),
  ],
  CreateOwn: (resource: string) => [resource + '_' + PermissionType.CreateOwn],
  CreateAll: (resource: string) => [resource + '_' + PermissionType.CreateAll],
  CreateOwnAll: (resource: string) => [
    ...PermissionFactory.CreateOwn(resource),
    ...PermissionFactory.CreateAll(resource),
  ],
  UpdateOwn: (resource: string) => [resource + '_' + PermissionType.UpdateOwn],
  UpdateAll: (resource: string) => [resource + '_' + PermissionType.UpdateAll],
  UpdateOwnAll: (resource: string) => [
    ...PermissionFactory.UpdateOwn(resource),
    ...PermissionFactory.UpdateAll(resource),
  ],
  DeleteOwn: (resource: string) => [resource + '_' + PermissionType.DeleteOwn],
  DeleteAll: (resource: string) => [resource + '_' + PermissionType.DeleteAll],
  DeleteOwnAll: (resource: string) => [
    ...PermissionFactory.DeleteOwn(resource),
    ...PermissionFactory.DeleteAll(resource),
  ],
};
