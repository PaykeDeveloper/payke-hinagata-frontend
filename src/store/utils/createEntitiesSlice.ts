import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import isEqual from 'lodash/isEqual';
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

export const getEntitiesInitialState = () => ({
  entity: undefined,
  entities: [],
  meta: {
    fetchEntity: getMetaInitialState(),
    fetchEntities: getMetaInitialState(),
  },
});

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
  > = EntitiesState<Entity, EntitiesPath, EntityDetail, EntityPath>
>(
  domainName: string,
  initialState: DomainState,
  entitiesUrl: (e: EntitiesPath) => string,
  entityUrl: (e: EntityPath) => string,
  domainSelector: (state: RootState) => DomainState,
  reducers?: ValidateSliceCaseReducers<
    DomainState,
    SliceCaseReducers<DomainState>
  >,
  extraReducers?: (builder: ActionReducerMapBuilder<DomainState>) => void,
  activeMilliSeconds: number = defaultActiveMilliSeconds
) => {
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
    entitiesUrl
  );

  const fetchEntity = createGetAsyncThunk<EntityDetail, EntityPath, never>(
    `${domainName}/fetchEntity`,
    entityUrl
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
    entityUrl
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
        }>
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
            state.entities = castDraft(action.payload);
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
        .addCase(addEntity.fulfilled, (state) => {
          if (state.meta.fetchEntities.status === StoreStatus.Done) {
            state.entities = [];
            state.meta.fetchEntities = getMetaInitialState();
          }
        })
        .addCase(mergeEntity.fulfilled, (state, action) => {
          if (state.meta.fetchEntity.status === StoreStatus.Done) {
            state.entity = castDraft(action.payload);
            state.meta.fetchEntity.timestamp = Date.now();
          }

          if (state.meta.fetchEntities.status === StoreStatus.Done) {
            state.entities = [];
            state.meta.fetchEntities = getMetaInitialState();
          }
        })
        .addCase(removeEntity.fulfilled, (state) => {
          if (state.meta.fetchEntity.status === StoreStatus.Done) {
            state.entity = undefined;
            state.meta.fetchEntity = getMetaInitialState();
          }

          if (state.meta.fetchEntities.status === StoreStatus.Done) {
            state.entities = [];
            state.meta.fetchEntities = getMetaInitialState();
          }
        });
      return extraReducers ? extraReducers(extraBuilder) : extraBuilder;
    },
  });

  const { actions, reducer } = slice;

  const checkInActivePeriod = (timestamp: number | undefined) =>
    timestamp && Date.now() - timestamp < activeMilliSeconds;

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
