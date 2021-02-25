import {
  ActionReducerMapBuilder,
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import isEqual from 'lodash/isEqual';
import { siteName } from 'src/base/constants';
import { EntityState, RootState, StoreStatus } from 'src/state/ducks/types';
import { Dispatch } from 'src/state/store';
import {
  createDeleteAsyncThunk,
  createGetAsyncThunk,
  createPatchAsyncThunk,
  createPostAsyncThunk,
} from './createAsyncThunks';

export const defaultActiveMilliSeconds = 60 * 60 * 1000;

export const getMetaInitialState = () => ({
  status: StoreStatus.Initial,
  error: undefined,
  arg: undefined,
  timestamp: undefined,
  requestId: undefined,
});

export const getEntityInitialState = () => ({
  entity: undefined,
  meta: {
    fetchEntity: getMetaInitialState(),
  },
});

const createEntitySlice = <
  Entity,
  EntityPath,
  DomainState extends EntityState<Entity, EntityPath> = EntityState<
    Entity,
    EntityPath
  >
>(
  domainName: string,
  initialState: DomainState,
  entityUrl: (e: EntityPath) => string,
  domainSelector: (state: RootState) => DomainState,
  reducers?: ValidateSliceCaseReducers<
    DomainState,
    SliceCaseReducers<DomainState>
  >,
  extraReducers?: (builder: ActionReducerMapBuilder<DomainState>) => void,
  activeMilliSeconds: number = defaultActiveMilliSeconds
) => {
  type FetchEntityArg = Exclude<
    DomainState['meta']['fetchEntity']['arg'],
    undefined
  >;
  type GetState = () => RootState;

  const fetchEntity = createGetAsyncThunk<Entity, EntityPath, never>(
    `${domainName}/fetchEntity`,
    entityUrl
  );

  const addEntity = createPostAsyncThunk<Entity, EntityPath, Partial<Entity>>(
    `${domainName}/addEntity`,
    entityUrl
  );

  const mergeEntity = createPatchAsyncThunk<
    Entity,
    EntityPath,
    Partial<Entity>
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
      ...reducers,
    },
    extraReducers: (builder) => {
      const extraBuilder = builder
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
            state.meta.fetchEntity.status === StoreStatus.Done ||
            state.meta.fetchEntity.status === StoreStatus.Failed
          ) {
            state.entity = castDraft(action.payload);
            state.meta.fetchEntity.timestamp = Date.now();
          }
        })
        .addCase(mergeEntity.fulfilled, (state, action) => {
          if (state.meta.fetchEntity.status === StoreStatus.Done) {
            state.entity = castDraft(action.payload);
            state.meta.fetchEntity.timestamp = Date.now();
          }
        })
        .addCase(removeEntity.fulfilled, (state) => {
          if (state.meta.fetchEntity.status === StoreStatus.Done) {
            state.entity = undefined;
            state.meta.fetchEntity = getMetaInitialState();
          }
        });
      return extraReducers ? extraReducers(extraBuilder) : extraBuilder;
    },
  });

  const { actions, reducer } = slice;

  const checkInActivePeriod = (timestamp: number | undefined) =>
    timestamp && Date.now() - timestamp < activeMilliSeconds;

  const shouldFetchEntity = (domain: DomainState, arg: FetchEntityArg) => {
    const meta = domain.meta.fetchEntity;
    switch (meta.status) {
      case StoreStatus.Initial: {
        return true;
      }
      case StoreStatus.Started: {
        return false;
      }
      case StoreStatus.Failed:
      case StoreStatus.Done: {
        return !checkInActivePeriod(meta.timestamp) || !isEqual(meta.arg, arg);
      }
      default: {
        return false;
      }
    }
  };

  const fetchEntityIfNeeded = (arg: FetchEntityArg) => (
    dispatch: Dispatch,
    getState: GetState
  ) => {
    const domain = domainSelector(getState());
    if (!shouldFetchEntity(domain, arg)) {
      return undefined;
    }

    return dispatch(fetchEntity(arg));
  };

  const shouldResetEntity = (domain: DomainState) => {
    return domain.meta.fetchEntity.status !== StoreStatus.Initial;
  };

  const resetEntityIfNeeded = () => (
    dispatch: Dispatch,
    getState: GetState
  ) => {
    const domain = domainSelector(getState());
    if (!shouldResetEntity(domain)) {
      return undefined;
    }

    return dispatch(actions.resetEntity());
  };

  return {
    actions: {
      ...actions,
      fetchEntity,
      addEntity,
      mergeEntity,
      removeEntity,
      fetchEntityIfNeeded,
      resetEntityIfNeeded,
    },
    reducer,
  };
};

export default createEntitySlice;
