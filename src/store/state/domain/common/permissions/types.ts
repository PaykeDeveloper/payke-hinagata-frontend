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

// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace PermissionType {
  export function isOwn(permission: string) {
    return permission.includes('Own');
  }
}
