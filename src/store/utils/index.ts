import {
  ErrorStatus,
  NotFoundError,
  InternalServerError,
  StoreError,
  UnauthorizedError,
  UnprocessableEntityError,
} from 'src/store/types';
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

export const isUnauthorizedError = (
  error: StoreError
): error is UnauthorizedError => error.status === ErrorStatus.Unauthorized;

export const isNotFoundError = (error: StoreError): error is NotFoundError =>
  error.status === ErrorStatus.NotFound;

export const isUnprocessableEntityError = (
  error: StoreError
): error is UnprocessableEntityError =>
  error.status === ErrorStatus.UnprocessableEntity;

export const isInternalServerError = (
  error: StoreError
): error is InternalServerError =>
  error.status === ErrorStatus.InternalServerError;
