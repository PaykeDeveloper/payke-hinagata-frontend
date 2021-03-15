import { createAsyncThunk } from '@reduxjs/toolkit';
import { serialize } from 'object-to-formdata';
import api, { CancelToken, isAxiosError } from 'src/base/api';
import { siteName } from 'src/base/constants';
import { RootState } from 'src/store/state';
import {
  ErrorStatus,
  NotFoundError,
  InternalServerError,
  StoreError,
  UnauthorizedError,
  UnprocessableEntityError,
} from 'src/store/types';

const getError = (status: number, data: unknown) => {
  switch (status) {
    case 401: {
      return { status: ErrorStatus.Unauthorized, data } as UnauthorizedError;
    }
    case 404: {
      return { status: ErrorStatus.NotFound } as NotFoundError;
    }
    case 422: {
      return {
        status: ErrorStatus.UnprocessableEntity,
        data,
      } as UnprocessableEntityError;
    }
    case 500: {
      return {
        status: ErrorStatus.InternalServerError,
        data,
      } as InternalServerError;
    }
    default: {
      return undefined;
    }
  }
};

const getRejectValue = (error: Error) => {
  if (isAxiosError(error)) {
    if (error.response) {
      const { status, data } = error.response;
      const e = getError(status, data);
      if (e) {
        return e;
      }
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
    { pathParams: PathParams; bodyParams: BodyParams; useFormData?: boolean },
    ThunkApiConfig
  >(
    `${siteName}/${name}`,
    async (
      { pathParams, bodyParams, useFormData },
      { signal, rejectWithValue }
    ) => {
      try {
        const response = await api.post(
          getApiUrl(pathParams),
          useFormData ? serialize(bodyParams) : bodyParams,
          {
            cancelToken: createCancelToken(signal),
          }
        );
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
    { pathParams: PathParams; bodyParams: BodyParams; useFormData?: boolean },
    ThunkApiConfig
  >(
    `${siteName}/${name}`,
    async (
      { pathParams, bodyParams, useFormData },
      { signal, rejectWithValue }
    ) => {
      try {
        const response = await api.post(
          getApiUrl(pathParams),
          useFormData ? serialize(bodyParams) : bodyParams,
          {
            cancelToken: createCancelToken(signal),
            headers: {
              'X-HTTP-Method-Override': 'PATCH',
            },
          }
        );
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
