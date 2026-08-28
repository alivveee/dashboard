export interface ApiResponseStatus {
  code: number;
  message: string;
  internalMsg: string;
  attributes: unknown;
}

export interface ApiResponse<T> {
  status: ApiResponseStatus;
  result: T;
}
