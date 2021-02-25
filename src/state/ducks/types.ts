import { ApiError } from 'src/base/api/types';

export enum StoreStatus {
  Initial,
  Started,
  Done,
  Failed,
}

interface StoreMeta<Arg> {
  status: StoreStatus;
  error: ApiError | undefined;
  arg: Arg | undefined;
  timestamp: number | undefined;
  requestId: string | undefined;
}

interface FetchEntityArg<EntityUrl> {
  pathParams: EntityUrl;
}

export interface EntityState<Entity, EntityArg> {
  entity: Entity | undefined;
  meta: {
    fetchEntity: StoreMeta<FetchEntityArg<EntityArg>>;
  };
}

interface FetchEntitiesArg<EntitiesUrl> {
  pathParams: EntitiesUrl;
  searchParams?: unknown;
}

export interface EntitiesState<Entity, EntityArg, EntitiesArg>
  extends EntityState<Entity, EntityArg> {
  entities: Entity[];
  meta: {
    fetchEntity: StoreMeta<FetchEntityArg<EntityArg>>;
    fetchEntities: StoreMeta<FetchEntitiesArg<EntitiesArg>>;
  };
}

export interface DomainState {}

export interface UiState {}

export interface Status {
  isAuthenticated: boolean;
}

export interface AppState {
  status: EntityState<Status, unknown>;
}

export interface RootState {
  // domain: DomainState;
  // ui: UiState;
  app: AppState;
}
