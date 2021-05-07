import { ModelPermission } from '../../common/permissions/types';
import { PermissionType } from './types';
export interface PermissionFactory<Model extends string> {
  model: Model;

  view(): string;
  create(): string;
  update(): string;
  delete(): string;

  canView: (permissionNames: string[] | undefined) => boolean;
  canCreate: (permissionNames: string[] | undefined) => boolean;
  canUpdate: (permissionNames: string[] | undefined) => boolean;
  canDelete: (permissionNames: string[] | undefined) => boolean;
}

export class AllPermissionFactory<Model extends string>
  implements PermissionFactory<Model> {
  readonly model: Model;

  readonly viewAll: ModelPermission<Model, PermissionType.ViewAll>;
  readonly createAll: ModelPermission<Model, PermissionType.CreateAll>;
  readonly updateAll: ModelPermission<Model, PermissionType.UpdateAll>;
  readonly deleteAll: ModelPermission<Model, PermissionType.DeleteAll>;

  constructor(model: Model) {
    this.model = model;
    this.viewAll = this.toPermissionType(PermissionType.ViewAll);
    this.createAll = this.toPermissionType(PermissionType.CreateAll);
    this.updateAll = this.toPermissionType(PermissionType.UpdateAll);
    this.deleteAll = this.toPermissionType(PermissionType.DeleteAll);
  }

  protected toPermissionType<Type extends PermissionType>(
    type: Type
  ): ModelPermission<Model, Type> {
    return `${this.model}_${type}` as const;
  }
  canViewAll(permissionNames?: string[] | undefined) {
    return !!permissionNames?.includes(this.viewAll);
  }
  canCreateAll(permissionNames?: string[] | undefined) {
    return !!permissionNames?.includes(this.createAll);
  }
  canUpdateAll(permissionNames?: string[] | undefined) {
    return !!permissionNames?.includes(this.updateAll);
  }
  canDeleteAll(permissionNames?: string[] | undefined) {
    return !!permissionNames?.includes(this.deleteAll);
  }
  canView(permissionNames?: string[] | undefined) {
    return this.canViewAll(permissionNames);
  }
  canCreate(permissionNames?: string[] | undefined) {
    return this.canCreateAll(permissionNames);
  }
  canUpdate(permissionNames?: string[] | undefined) {
    return this.canUpdateAll(permissionNames);
  }
  canDelete(permissionNames?: string[] | undefined) {
    return this.canDeleteAll(permissionNames);
  }

  view(): string {
    return this.viewAll;
  }
  create(): string {
    return this.createAll;
  }
  update(): string {
    return this.updateAll;
  }
  delete(): string {
    return this.deleteAll;
  }

  generatePermission(type: PermissionType): string {
    switch (type) {
      case PermissionType.ViewAll:
        return this.viewAll;
      case PermissionType.CreateAll:
        return this.createAll;
      case PermissionType.UpdateAll:
        return this.updateAll;
      case PermissionType.DeleteAll:
        return this.deleteAll;
    }
    return '';
  }
}

export class OwnPermissionFactory<Model extends string>
  extends AllPermissionFactory<Model>
  implements PermissionFactory<Model> {
  readonly viewOwn: ModelPermission<Model, PermissionType.ViewOwn>;
  readonly createOwn: ModelPermission<Model, PermissionType.CreateOwn>;
  readonly updateOwn: ModelPermission<Model, PermissionType.UpdateOwn>;
  readonly deleteOwn: ModelPermission<Model, PermissionType.DeleteOwn>;

  constructor(model: Model) {
    super(model);
    this.viewOwn = this.toPermissionType(PermissionType.ViewOwn);
    this.createOwn = this.toPermissionType(PermissionType.CreateOwn);
    this.updateOwn = this.toPermissionType(PermissionType.UpdateOwn);
    this.deleteOwn = this.toPermissionType(PermissionType.DeleteOwn);
  }

  canViewOwn(permissionNames?: string[] | undefined) {
    return !!permissionNames?.includes(this.viewOwn);
  }
  canCreateOwn(permissionNames?: string[] | undefined) {
    return !!permissionNames?.includes(this.createOwn);
  }
  canUpdateOwn(permissionNames?: string[] | undefined) {
    return !!permissionNames?.includes(this.updateOwn);
  }
  canDeleteOwn(permissionNames?: string[] | undefined) {
    return !!permissionNames?.includes(this.deleteOwn);
  }
  canView(permissionNames?: string[] | undefined) {
    return this.canViewOwn(permissionNames) || this.canViewAll(permissionNames);
  }
  canCreate(permissionNames?: string[] | undefined) {
    return (
      this.canCreateOwn(permissionNames) || this.canCreateAll(permissionNames)
    );
  }
  canUpdate(permissionNames?: string[] | undefined) {
    return (
      this.canUpdateOwn(permissionNames) || this.canUpdateAll(permissionNames)
    );
  }
  canDelete(permissionNames?: string[] | undefined) {
    return (
      this.canDeleteOwn(permissionNames) || this.canDeleteAll(permissionNames)
    );
  }

  view(): string {
    return this.viewOwn;
  }
  create(): string {
    return this.createOwn;
  }
  update(): string {
    return this.updateOwn;
  }
  delete(): string {
    return this.deleteOwn;
  }
}
