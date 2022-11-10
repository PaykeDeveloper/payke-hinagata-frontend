import i18next from 'i18next';
import {
  ConnectionError,
  ErrorStatus,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  ServiceUnavailable,
  StoreError,
  StoreStatus,
  UnauthorizedError,
  UnknownError,
  UnprocessableEntityError,
} from 'src/store/types';
export {
  createGetAsyncThunk,
  createPostAsyncThunk,
  createDeleteAsyncThunk,
  createPatchAsyncThunk,
  createPutAsyncThunk,
} from './createAsyncThunks';
export {
  default as createEntitySlice,
  getEntityInitialState,
} from './createEntitySlice';
export {
  default as createEntitiesSlice,
  getEntitiesInitialState,
} from './createEntitiesSlice';
export {
  AllPermissionFactory,
  OwnPermissionFactory,
} from 'src/store/utils/permissionFactories';

export const isStoreError = (error: unknown): error is StoreError =>
  !!(error && typeof error === 'object' && 'status' in error);

const isUnknownError = (error: StoreError): error is UnknownError =>
  error.status === ErrorStatus.Unknown;

const isConnectionError = (error: StoreError): error is ConnectionError =>
  error.status === ErrorStatus.Connection;

const isUnauthorizedError = (error: StoreError): error is UnauthorizedError =>
  error.status === ErrorStatus.Unauthorized;

const isForbiddenError = (error: StoreError): error is ForbiddenError =>
  error.status === ErrorStatus.Forbidden;

export const isNotFoundError = (error: StoreError): error is NotFoundError =>
  error.status === ErrorStatus.NotFound;

const isMethodNotAllowedError = (
  error: StoreError
): error is MethodNotAllowedError =>
  error.status === ErrorStatus.MethodNotAllowed;

export const isUnprocessableEntityError = (
  error: StoreError
): error is UnprocessableEntityError =>
  error.status === ErrorStatus.UnprocessableEntity;

const isInternalServerError = (
  error: StoreError
): error is InternalServerError =>
  error.status === ErrorStatus.InternalServerError;

const isServiceUnavailable = (error: StoreError): error is ServiceUnavailable =>
  error.status === ErrorStatus.ServiceUnavailable;

const getResponseErrorMessage = (error: StoreError) => {
  if (isUnprocessableEntityError(error)) {
    const message = error.data.errors?.[''];
    if (message) {
      return `${message}`;
    }
  }
  return undefined;
};

const getDefault = (error: StoreError) => {
  if (isUnknownError(error)) {
  } else if (isConnectionError(error)) {
    return 'An network error has occurred.';
  } else if (isUnauthorizedError(error)) {
    return 'Unauthorized';
  } else if (isForbiddenError(error)) {
    return 'Forbidden';
  } else if (isNotFoundError(error)) {
    return 'Page not found';
  } else if (isMethodNotAllowedError(error)) {
    return 'This action is not allowed';
  } else if (isUnprocessableEntityError(error)) {
    return 'The given data was invalid.';
  } else if (isInternalServerError(error)) {
    return 'Internal server error';
  } else if (isServiceUnavailable(error)) {
    return 'Service Unavailable';
  }
  return 'An unknown error has occurred.';
};

const getDefaultErrorMessage = (error: StoreError) => {
  const message = getDefault(error);
  return i18next.t(message);
};

export const getErrorMessage = (error: StoreError) =>
  getResponseErrorMessage(error) || getDefaultErrorMessage(error);

export const checkProcessed = (status: StoreStatus) =>
  status === StoreStatus.Done || status === StoreStatus.Failed;
