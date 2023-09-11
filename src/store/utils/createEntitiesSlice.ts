import {
  ActionReducerMapBuilder,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import { Draft, castDraft } from 'immer';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import { siteName } from 'src/base/constants';
import { StoreDispatch } from 'src/store';
import { RootState } from 'src/store/state';
import { EntitiesState, StoreStatus } from 'src/store/types';
import {
  createDeleteAsyncThunk,
  createGetAsyncThunk,
  createPatchAsyncThunk,
  createPostAsyncThunk,
} from './createAsyncThunks';
import {
  defaultActiveMilliSeconds,
  getMetaInitialState,
} from './createEntitySlice';

interface KeyMapping<DomainObject, PathParams> {
  objectKey: keyof DomainObject;
  pathKey: keyof PathParams;
}

export const getEntitiesInitialState = () => ({
  entity: undefined,
  entities: [],
  meta: {
    fetchEntity: getMetaInitialState(),
    fetchEntities: getMetaInitialState(),
  },
});

interface Sort<Entity> {
  key: keyof Entity;
  reverse?: boolean;
  skipUpdated?: boolean;
}

const sortIfNeeded = <Entity>(collection: Entity[], sort?: Sort<Entity>) => {
  if (!sort) {
    return collection;
  }
  const { key, reverse } = sort;
  const sorted = sortBy(collection, key);
  return reverse ? sorted.reverse() : sorted;
};

const createEntitiesSlice = <
  Entity,
  EntitiesPath,
  EntityDetail,
  EntityPath,
  CreateInput,
  UpdateInput = CreateInput,
  DomainState extends EntitiesState<
    Entity,
    EntitiesPath,
    EntityDetail,
    EntityPath
  > = EntitiesState<Entity, EntitiesPath, EntityDetail, EntityPath>,
>({
  domainName,
  initialState,
  entitiesUrl,
  entityUrl,
  domainSelector,
  keyMapping,
  detailToList,
  listToDetail,
  sort,
  reducers,
  extraReducers,
  activeMilliSeconds,
}: {
  domainName: string;
  initialState: DomainState;
  entitiesUrl: (e: EntitiesPath) => string;
  entityUrl: (e: EntityPath) => string;
  domainSelector: (state: RootState) => DomainState;
  keyMapping?: KeyMapping<Entity, EntityPath>;
  detailToList?: (e: EntityDetail) => Entity;
  listToDetail?: (e: Entity) => EntityDetail;
  sort?: Sort<Entity>;
  reducers?: ValidateSliceCaseReducers<
    DomainState,
    SliceCaseReducers<DomainState>
  >;
  extraReducers?: (builder: ActionReducerMapBuilder<DomainState>) => void;
  activeMilliSeconds?: number;
}) => {
  type FetchEntitiesArg = Exclude<
    DomainState['meta']['fetchEntities']['arg'],
    undefined
  >;
  type FetchEntityArg = Exclude<
    DomainState['meta']['fetchEntity']['arg'],
    undefined
  >;
  type GetState = () => RootState;

  const fetchEntities = createGetAsyncThunk<Entity[], EntitiesPath, unknown>(
    `${domainName}/fetchEntities`,
    entitiesUrl,
  );

  const fetchEntity = createGetAsyncThunk<EntityDetail, EntityPath, never>(
    `${domainName}/fetchEntity`,
    entityUrl,
  );

  const addEntity = createPostAsyncThunk<
    EntityDetail,
    EntitiesPath,
    CreateInput
  >(`${domainName}/addEntity`, entitiesUrl);

  const mergeEntity = createPatchAsyncThunk<
    EntityDetail,
    EntityPath,
    UpdateInput
  >(`${domainName}/mergeEntity`, entityUrl);

  const removeEntity = createDeleteAsyncThunk<null, EntityPath>(
    `${domainName}/removeEntity`,
    entityUrl,
  );

  const slice = createSlice({
    name: `${siteName}/${domainName}`,
    initialState,
    reducers: {
      resetEntity(state) {
        state.entity = undefined;
        state.meta.fetchEntity = getMetaInitialState();
      },
      resetEntities(state) {
        state.entities = [];
        state.meta.fetchEntities = getMetaInitialState();
      },
      setEntity(
        state,
        {
          payload: { entity, timestamp, arg },
        }: PayloadAction<{
          entity: EntityDetail;
          timestamp: number;
          arg: FetchEntityArg;
        }>,
      ) {
        state.entity = castDraft(entity);
        state.meta.fetchEntity.status = StoreStatus.Done;
        state.meta.fetchEntity.timestamp = timestamp;
        state.meta.fetchEntity.arg = castDraft(arg);
        state.meta.fetchEntity.requestId = undefined;
      },
      ...reducers,
    },
    extraReducers: (builder) => {
      const extraBuilder = builder
        .addCase(fetchEntities.pending, (state, action) => {
          state.meta.fetchEntities.status = StoreStatus.Started;
          state.meta.fetchEntities.arg = castDraft(action.meta.arg);
          state.meta.fetchEntities.requestId = action.meta.requestId;
        })
        .addCase(fetchEntities.fulfilled, (state, action) => {
          if (state.meta.fetchEntities.requestId === action.meta.requestId) {
            state.entities = castDraft(sortIfNeeded(action.payload, sort));
            state.meta.fetchEntities.status = StoreStatus.Done;
            state.meta.fetchEntities.timestamp = Date.now();
            state.meta.fetchEntities.error = undefined;
          }
        })
        .addCase(fetchEntities.rejected, (state, action) => {
          if (state.meta.fetchEntities.requestId === action.meta.requestId) {
            state.entities = [];
            state.meta.fetchEntities.status = StoreStatus.Failed;
            state.meta.fetchEntities.timestamp = Date.now();
            state.meta.fetchEntities.error = action.payload;
          }
        })
        .addCase(fetchEntity.pending, (state, action) => {
          state.meta.fetchEntity.status = StoreStatus.Started;
          state.meta.fetchEntity.arg = castDraft(action.meta.arg);
          state.meta.fetchEntity.requestId = action.meta.requestId;
        })
        .addCase(fetchEntity.fulfilled, (state, action) => {
          if (state.meta.fetchEntity.requestId === action.meta.requestId) {
            state.entity = castDraft(action.payload);
            state.meta.fetchEntity.status = StoreStatus.Done;
            state.meta.fetchEntity.timestamp = Date.now();
            state.meta.fetchEntity.error = undefined;
          }
        })
        .addCase(fetchEntity.rejected, (state, action) => {
          if (state.meta.fetchEntity.requestId === action.meta.requestId) {
            state.entity = undefined;
            state.meta.fetchEntity.status = StoreStatus.Failed;
            state.meta.fetchEntity.timestamp = Date.now();
            state.meta.fetchEntity.error = action.payload;
          }
        })
        .addCase(addEntity.fulfilled, (state, action) => {
          if (
            detailToList &&
            state.meta.fetchEntities.status === StoreStatus.Done &&
            isEqual(
              action.meta.arg.pathParams,
              state.meta.fetchEntities.arg?.pathParams,
            )
          ) {
            const entities = [
              ...state.entities,
              castDraft(detailToList(action.payload)),
            ];
            state.entities = sortIfNeeded(
              entities,
              sort as Sort<Draft<Entity>>,
            );
          }
        })
        .addCase(mergeEntity.fulfilled, (state, action) => {
          if (state.meta.fetchEntity.status === StoreStatus.Done) {
            state.entity = castDraft(action.payload);
            state.meta.fetchEntity.timestamp = Date.now();
          }

          if (
            keyMapping &&
            detailToList &&
            state.meta.fetchEntities.status === StoreStatus.Done
          ) {
            const entitiesEntity = detailToList(action.payload);
            const objectKeyValue = entitiesEntity[keyMapping.objectKey];
            const entities = state.entities.map((entity) => {
              if ((entity as Entity)[keyMapping.objectKey] === objectKeyValue) {
                return castDraft(entitiesEntity);
              }
              return entity;
            });
            state.entities = sort?.skipUpdated
              ? entities
              : sortIfNeeded(entities, sort as Sort<Draft<Entity>>);
          }
        })
        .addCase(removeEntity.fulfilled, (state, action) => {
          if (state.meta.fetchEntity.status === StoreStatus.Done) {
            state.entity = undefined;
            state.meta.fetchEntity = getMetaInitialState();
          }

          if (
            keyMapping &&
            state.meta.fetchEntities.status === StoreStatus.Done
          ) {
            const urlKeyValue: unknown =
              action.meta.arg.pathParams[keyMapping.pathKey];
            state.entities = state.entities.filter(
              (entity) =>
                `${(entity as Entity)[keyMapping.objectKey]}` !== urlKeyValue,
            );
          }
        });
      return extraReducers ? extraReducers(extraBuilder) : extraBuilder;
    },
  });

  const { actions, reducer } = slice;

  const milliSeconds = activeMilliSeconds ?? defaultActiveMilliSeconds;
  const checkInActivePeriod = (timestamp: number | undefined) =>
    timestamp && Date.now() - timestamp < milliSeconds;

  const shouldFetchEntities = (domain: DomainState, arg: FetchEntitiesArg) => {
    const meta = domain.meta.fetchEntities;
    switch (meta.status) {
      case StoreStatus.Initial:
      case StoreStatus.Failed: {
        return true;
      }
      case StoreStatus.Started: {
        return false;
      }
      case StoreStatus.Done: {
        return !checkInActivePeriod(meta.timestamp) || !isEqual(meta.arg, arg);
      }
      default: {
        return false;
      }
    }
  };

  const fetchEntitiesIfNeeded =
    (arg: FetchEntitiesArg) =>
    (dispatch: StoreDispatch, getState: GetState) => {
      const domain = domainSelector(getState());
      if (!shouldFetchEntities(domain, arg)) {
        return undefined;
      }

      if (arg.reset) {
        dispatch(resetEntitiesIfNeeded());
      }

      return dispatch(fetchEntities(arg));
    };

  const shouldFetchEntity = (domain: DomainState, arg: FetchEntityArg) => {
    const meta = domain.meta.fetchEntity;
    switch (meta.status) {
      case StoreStatus.Initial:
      case StoreStatus.Failed: {
        return true;
      }
      case StoreStatus.Started: {
        return false;
      }
      case StoreStatus.Done: {
        return !checkInActivePeriod(meta.timestamp) || !isEqual(meta.arg, arg);
      }
      default: {
        return false;
      }
    }
  };

  const fetchEntityIfNeeded =
    (arg: FetchEntityArg) => (dispatch: StoreDispatch, getState: GetState) => {
      const domain = domainSelector(getState());
      if (!shouldFetchEntity(domain, arg)) {
        return undefined;
      }

      if (arg.reset) {
        dispatch(resetEntityIfNeeded());
      }

      const urlValue: unknown =
        keyMapping && keyMapping.pathKey && arg.pathParams[keyMapping.pathKey];
      const { timestamp } = domain.meta.fetchEntities;
      if (
        listToDetail &&
        keyMapping &&
        urlValue &&
        timestamp &&
        checkInActivePeriod(timestamp)
      ) {
        const entitiesEntity = domain.entities.find(
          (entity) => `${entity[keyMapping.objectKey]}` === `${urlValue}`,
        );
        if (entitiesEntity) {
          const entity = listToDetail(entitiesEntity);
          return dispatch(actions.setEntity({ entity, timestamp, arg }));
        }
      }

      return dispatch(fetchEntity(arg));
    };

  const shouldResetEntities = (domain: DomainState) => {
    return domain.meta.fetchEntities.status !== StoreStatus.Initial;
  };

  const resetEntitiesIfNeeded =
    () => (dispatch: StoreDispatch, getState: GetState) => {
      const domain = domainSelector(getState());
      if (!shouldResetEntities(domain)) {
        return undefined;
      }

      return dispatch(actions.resetEntities());
    };

  const shouldResetEntity = (domain: DomainState) => {
    return domain.meta.fetchEntity.status !== StoreStatus.Initial;
  };

  const resetEntityIfNeeded =
    () => (dispatch: StoreDispatch, getState: GetState) => {
      const domain = domainSelector(getState());
      if (!shouldResetEntity(domain)) {
        return undefined;
      }

      return dispatch(actions.resetEntity());
    };

  return {
    actions: {
      ...actions,
      fetchEntities,
      fetchEntity,
      addEntity,
      mergeEntity,
      removeEntity,
      fetchEntitiesIfNeeded,
      fetchEntityIfNeeded,
      resetEntitiesIfNeeded,
      resetEntityIfNeeded,
    },
    reducer,
  };
};

export default createEntitiesSlice;
