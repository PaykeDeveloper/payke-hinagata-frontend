import { AxiosError } from 'axios';
import {
  ApiError,
  ErrorStatus,
  NotFoundError,
  UnprocessableEntityError,
} from './types';

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
      return { status: ErrorStatus.Unknown } as ApiError;
    }
  }
};

const isAxiosError = <T = unknown>(error: unknown): error is AxiosError<T> =>
  !!error && (error as AxiosError<T>).isAxiosError;

export const isNotFoundError = (error: ApiError): error is NotFoundError =>
  error.status === ErrorStatus.NotFound;

export const isUnprocessableEntityError = (
  error: ApiError
): error is UnprocessableEntityError =>
  error.status === ErrorStatus.UnprocessableEntity;

export const getRejectValue = (error: Error) => {
  if (isAxiosError(error)) {
    if (error.response) {
      const { status, data } = error.response;
      return getError(status, data);
    }
    return { status: ErrorStatus.Unknown } as ApiError;
  }
  throw error;
};
