import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { CancelToken } from 'src/base/api';
import { ApiError } from 'src/base/api/types';
import { getRejectValue } from 'src/base/api/utils';
import { siteName } from 'src/base/constants';
import { RootState } from 'src/state/ducks/types';

const createCancelToken = (signal: AbortSignal) => {
  const source = CancelToken.source();
  signal.addEventListener('abort', () => {
    source.cancel();
  });
  return source.token;
};

type ThunkApiConfig = {
  state: RootState;
  rejectValue: ApiError;
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
