import {
  ActionReducerMapBuilder,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import isEqual from 'lodash/isEqual';
import { siteName } from 'src/base/constants';
import { StoreDispatch } from 'src/store';
import { RootState } from 'src/store/state';
import { EntityState, StoreStatus } from 'src/store/types';
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
  CreateInput = Partial<Entity>,
  UpdateInput = CreateInput,
  DomainState extends EntityState<Entity, EntityPath> = EntityState<
    Entity,
    EntityPath
  >,
>({
  domainName,
  initialState,
  entityUrl,
  domainSelector,
  reducers,
  extraReducers,
  activeMilliSeconds,
}: {
  domainName: string;
  initialState: DomainState;
  entityUrl: (e: EntityPath) => string;
  domainSelector: (state: RootState) => DomainState;
  reducers?: ValidateSliceCaseReducers<
    DomainState,
    SliceCaseReducers<DomainState>
  >;
  extraReducers?: (builder: ActionReducerMapBuilder<DomainState>) => void;
  activeMilliSeconds?: number;
}) => {
  type FetchEntityArg = Exclude<
    DomainState['meta']['fetchEntity']['arg'],
    undefined
  >;
  type GetState = () => RootState;

  const fetchEntity = createGetAsyncThunk<Entity, EntityPath, unknown>(
    `${domainName}/fetchEntity`,
    entityUrl,
  );

  const addEntity = createPostAsyncThunk<Entity, EntityPath, CreateInput>(
    `${domainName}/addEntity`,
    entityUrl,
  );

  const mergeEntity = createPatchAsyncThunk<Entity, EntityPath, UpdateInput>(
    `${domainName}/mergeEntity`,
    entityUrl,
  );

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
          if (state.meta.fetchEntity.status === StoreStatus.Done) {
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

  const milliSeconds = activeMilliSeconds ?? defaultActiveMilliSeconds;
  const checkInActivePeriod = (timestamp: number | undefined) =>
    timestamp && Date.now() - timestamp < milliSeconds;

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
