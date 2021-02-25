export enum ErrorStatus {
  Unknown,
  NotFound = 404,
  UnprocessableEntity = 422,
}

export interface ApiError<Status = ErrorStatus, Data = unknown> {
  status: Status;
  data?: Data;
}

export type NotFoundError = ApiError<ErrorStatus.NotFound>;

export type UnprocessableEntityError = ApiError<
  ErrorStatus.UnprocessableEntity,
  {
    message: string;
    errors: Record<string, string[]>;
  }
>;
