export enum ErrorStatus {
  Unknown,
  Unauthorized = 401,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}

export interface StoreError<Status = ErrorStatus, Data = unknown> {
  status: Status;
  data: Data;
}

export type UnauthorizedError = StoreError<
  ErrorStatus.Unauthorized,
  { message: string }
>;

export type NotFoundError = StoreError<ErrorStatus.NotFound, undefined>;

export type UnprocessableEntityError = StoreError<
  ErrorStatus.UnprocessableEntity,
  {
    message: string;
    errors: Record<string, string[]>;
  }
>;

export type InternalServerError = StoreError<
  ErrorStatus.InternalServerError,
  { message: string }
>;

export enum StoreStatus {
  Initial,
  Started,
  Done,
  Failed,
}

interface StoreMeta<Arg> {
  status: StoreStatus;
  error: StoreError | undefined;
  arg: Arg | undefined;
  timestamp: number | undefined;
  requestId: string | undefined;
}

interface FetchEntityArg<EntityUrl> {
  pathParams: EntityUrl;
  reset?: boolean;
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
  reset?: boolean;
}

export interface EntitiesState<EntitiesEntity, EntitiesArg, Entity, EntityArg>
  extends EntityState<Entity, EntityArg> {
  entities: EntitiesEntity[];
  meta: {
    fetchEntity: StoreMeta<FetchEntityArg<EntityArg>>;
    fetchEntities: StoreMeta<FetchEntitiesArg<EntitiesArg>>;
  };
}
