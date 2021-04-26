import {
  ModelPermission,
  AllPermission,
  OwnPermission,
} from '../../common/permissions/types';

export interface Division {
  id: number;
  name: string;
  createdAt: string | null;
  updatedAt: string | null;
  permissionNames: string[];
  requestMemberId: number | null;
}

export type DivisionInput = Partial<Division>;

type ModelType = 'division';
export type DivisionPermission = ModelPermission<
  ModelType,
  AllPermission | OwnPermission
>;
export type DivisionOwnPermission = ModelPermission<ModelType, OwnPermission>;
export type DivisionAllPermission = ModelPermission<ModelType, AllPermission>;
