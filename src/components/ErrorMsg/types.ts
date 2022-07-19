export const enum HttpErrorCode {
  ClientError,
  Unauth,
  Forbidden,
  NotFound,
  Timeout,
}

export const ERR_EMOJI = {
  [HttpErrorCode.ClientError]: '😐',
  [HttpErrorCode.Unauth]: '🤐',
  [HttpErrorCode.Forbidden]: '😡',
  [HttpErrorCode.NotFound]: '🤔',
  [HttpErrorCode.Timeout]: '😴',
};

export interface Error {
  code: number;
  message: string;
}
