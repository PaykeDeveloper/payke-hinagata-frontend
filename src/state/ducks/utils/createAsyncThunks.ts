import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { CancelToken, isAxiosError } from 'src/base/api';
import { siteName } from 'src/base/constants';
import {
  ErrorStatus,
  NotFoundError,
  RootState,
  StoreError,
  UnprocessableEntityError,
} from 'src/state/ducks/types';

const getError = (status: number, data: unknown) => {
  switch (status) {
    case 404: {
      return { status: ErrorStatus.NotFound } as NotFoundError;
    }
    case 422: {
      return {
        status: ErrorStatus.UnprocessableEntity,
        data,
      } as UnprocessableEntityError;
    }
    default: {
      return { status: ErrorStatus.Unknown } as StoreError;
    }
  }
};

const getRejectValue = (error: Error) => {
  if (isAxiosError(error)) {
    if (error.response) {
      const { status, data } = error.response;
      return getError(status, data);
    }
    return { status: ErrorStatus.Unknown } as StoreError;
  }
  throw error;
};

const createCancelToken = (signal: AbortSignal) => {
  const source = CancelToken.source();
  signal.addEventListener('abort', () => {
    source.cancel();
  });
  return source.token;
};

type ThunkApiConfig = {
  state: RootState;
  rejectValue: StoreError;
};

export const createGetAsyncThunk = <Returned, PathParams, SearchParams>(
  name: string,
  getApiUrl: (_: PathParams) => string
) =>
  createAsyncThunk<
    Returned,
    { pathParams: PathParams; searchParams?: SearchParams },
    ThunkApiConfig
  >(
    `${siteName}/${name}`,
    async ({ pathParams }, { signal, rejectWithValue }) => {
      try {
        const response = await api.get(getApiUrl(pathParams), {
          cancelToken: createCancelToken(signal),
        });
        return response.data;
      } catch (e) {
        const rejectValue = getRejectValue(e);
        return rejectWithValue(rejectValue);
      }
    }
  );

export const createPostAsyncThunk = <Returned, PathParams, BodyParams>(
  name: string,
  getApiUrl: (_: PathParams) => string
) =>
  createAsyncThunk<
    Returned,
    { pathParams: PathParams; bodyParams: BodyParams },
    ThunkApiConfig
  >(
    `${siteName}/${name}`,
    async ({ pathParams, bodyParams }, { signal, rejectWithValue }) => {
      try {
        const response = await api.post(getApiUrl(pathParams), bodyParams, {
          cancelToken: createCancelToken(signal),
        });
        return response.data;
      } catch (e) {
        const rejectValue = getRejectValue(e);
        return rejectWithValue(rejectValue);
      }
    }
  );

export const createPatchAsyncThunk = <Returned, PathParams, BodyParams>(
  name: string,
  getApiUrl: (_: PathParams) => string
) =>
  createAsyncThunk<
    Returned,
    { pathParams: PathParams; bodyParams: BodyParams },
    ThunkApiConfig
  >(
    `${siteName}/${name}`,
    async ({ pathParams, bodyParams }, { signal, rejectWithValue }) => {
      try {
        const response = await api.patch(getApiUrl(pathParams), bodyParams, {
          cancelToken: createCancelToken(signal),
        });
        return response.data;
      } catch (e) {
        const rejectValue = getRejectValue(e);
        return rejectWithValue(rejectValue);
      }
    }
  );

export const createDeleteAsyncThunk = <Returned, PathParams>(
  name: string,
  getApiUrl: (_: PathParams) => string
) =>
  createAsyncThunk<Returned, { pathParams: PathParams }, ThunkApiConfig>(
    `${siteName}/${name}`,
    async ({ pathParams }, { signal, rejectWithValue }) => {
      try {
        const response = await api.delete(getApiUrl(pathParams), {
          cancelToken: createCancelToken(signal),
        });
        return response.data;
      } catch (e) {
        const rejectValue = getRejectValue(e);
        return rejectWithValue(rejectValue);
      }
    }
  );