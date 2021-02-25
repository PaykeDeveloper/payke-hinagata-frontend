export enum ErrorStatus {
  Unknown,
  NotFound = 404,
  UnprocessableEntity = 422,
}

export interface StoreError<Status = ErrorStatus, Data = unknown> {
  status: Status;
  data?: Data;
}

export type NotFoundError = StoreError<ErrorStatus.NotFound>;

export type UnprocessableEntityError = StoreError<
  ErrorStatus.UnprocessableEntity,
  {
    message: string;
    errors: Record<string, string[]>;
  }
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
