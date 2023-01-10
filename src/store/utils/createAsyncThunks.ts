import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Options, serialize } from 'object-to-formdata';
import qs from 'qs';
import api, { CancelToken, isAxiosError } from 'src/base/api';
import { siteName } from 'src/base/constants';
import { RootState } from 'src/store/state';
import {
  ConnectionError,
  ErrorStatus,
  ForbiddenError,
  InternalServerError,
  MethodNotAllowedError,
  NotFoundError,
  ServiceUnavailable,
  StoreError,
  UnauthorizedError,
  UnknownError,
  UnprocessableEntityError,
} from 'src/store/types';

const options: Options = {
  indices: true,
  allowEmptyArrays: true,
  booleansAsIntegers: true,
};

const getError = (error: AxiosError) => {
  if (!error.response) {
    const result: ConnectionError = {
      status: ErrorStatus.Connection,
      data: {},
    };
    return result;
  }
  const { status, data: responseData } = error.response;
  const data =
    responseData && typeof responseData === 'object' ? responseData : {};
  switch (status) {
    case 401: {
      const result: UnauthorizedError = {
        status: ErrorStatus.Unauthorized,
        data,
      };
      return result;
    }
    case 403: {
      const result: ForbiddenError = { status: ErrorStatus.Forbidden, data };
      return result;
    }
    case 404: {
      const result: NotFoundError = { status: ErrorStatus.NotFound, data };
      return result;
    }
    case 405: {
      const result: MethodNotAllowedError = {
        status: ErrorStatus.MethodNotAllowed,
        data,
      };
      return result;
    }
    case 422: {
      const result: UnprocessableEntityError = {
        status: ErrorStatus.UnprocessableEntity,
        data,
      };
      return result;
    }
    case 500: {
      const result: InternalServerError = {
        status: ErrorStatus.InternalServerError,
        data,
      };
      return result;
    }
    case 503: {
      const result: ServiceUnavailable = {
        status: ErrorStatus.ServiceUnavailable,
        data,
      };
      return result;
    }
    default: {
      const result: UnknownError = {
        status: ErrorStatus.Unknown,
        data,
      };
      return result;
    }
  }
};

const getRejectValue = (error: unknown) => {
  if (isAxiosError(error)) {
    return getError(error);
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
    async ({ pathParams, searchParams }, { signal, rejectWithValue }) => {
      try {
        let url = getApiUrl(pathParams);
        if (searchParams) {
          url += `?${qs.stringify(searchParams)}`;
        }
        const response = await api.get<Returned>(url, {
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
        const response = await api.post<Returned>(
          getApiUrl(pathParams),
          useFormData ? serialize(bodyParams, options) : bodyParams,
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

export const createPutAsyncThunk = <Returned, PathParams, BodyParams>(
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
        const response = await api.put<Returned>(
          getApiUrl(pathParams),
          useFormData ? serialize(bodyParams, options) : bodyParams,
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
        const response = await api.post<Returned>(
          getApiUrl(pathParams),
          useFormData ? serialize(bodyParams, options) : bodyParams,
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
        const response = await api.delete<Returned>(getApiUrl(pathParams), {
          cancelToken: createCancelToken(signal),
        });
        return response.data;
      } catch (e) {
        const rejectValue = getRejectValue(e);
        return rejectWithValue(rejectValue);
      }
    }
  );
