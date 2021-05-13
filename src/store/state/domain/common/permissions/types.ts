export enum PermissionType {
  ViewOwn = 'viewOwn',
  ViewAll = 'viewAll',
  CreateOwn = 'createOwn',
  CreateAll = 'createAll',
  UpdateOwn = 'updateOwn',
  UpdateAll = 'updateAll',
  DeleteOwn = 'deleteOwn',
  DeleteAll = 'deleteAll',
}

export type ViewOwn = PermissionType.ViewOwn;
export type ViewAll = PermissionType.ViewAll;
export type CreateOwn = PermissionType.CreateOwn;
export type CreateAll = PermissionType.CreateAll;
export type UpdateOwn = PermissionType.UpdateOwn;
export type UpdateAll = PermissionType.UpdateAll;
export type DeleteOwn = PermissionType.DeleteOwn;
export type DeleteAll = PermissionType.DeleteAll;

export type AllPermission = ViewAll | CreateAll | UpdateAll | DeleteAll;
export type OwnPermission = ViewOwn | CreateOwn | UpdateOwn | DeleteOwn;

export type Permission = AllPermission | OwnPermission;

export type ModelPermission<
  M extends string,
  P extends Permission
> = `${M}_${P}`;
