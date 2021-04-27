import {
  ModelPermission,
  AllPermission,
  OwnPermission,
} from '../../common/permissions/types';

export interface Member {
  id: number;
  userId: string;
  createdAt: string | null;
  updatedAt: string | null;
  permissionNames: string[];
  roleNames: string[];
}

export type MemberInput = Partial<Member>;

export interface MemberDetail {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  permissionNames: string[];
}

type ModelType = 'member';
export type MemberPermission = ModelPermission<
  ModelType,
  AllPermission | OwnPermission
>;
export type MemberOwnPermission = ModelPermission<ModelType, OwnPermission>;
export type MemberAllPermission = ModelPermission<ModelType, AllPermission>;
