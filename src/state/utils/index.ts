import {
  ErrorStatus,
  NotFoundError,
  StoreError,
  UnprocessableEntityError,
} from 'src/state/types';
export {
  createGetAsyncThunk,
  createPostAsyncThunk,
  createDeleteAsyncThunk,
  createPatchAsyncThunk,
} from './createAsyncThunks';
export {
  default as createEntitySlice,
  getEntityInitialState,
} from './createEntitySlice';
export {
  default as createEntitiesSlice,
  getEntitiesInitialState,
} from './createEntitiesSlice';

export const isNotFoundError = (error: StoreError): error is NotFoundError =>
  error.status === ErrorStatus.NotFound;

export const isUnprocessableEntityError = (
  error: StoreError
): error is UnprocessableEntityError =>
  error.status === ErrorStatus.UnprocessableEntity;
