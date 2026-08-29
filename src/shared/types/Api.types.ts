export interface ApiResponseStatus {
  code: number;
  message: string;
  internalMsg: string;
  attributes: unknown;
}

export interface ApiPaginationLinks {
  next: number;
  previous: number;
}

export interface ApiPagination {
  count: number;
  currentPage: number;
  perPage: number;
  total: number;
  totalPage: number;
  links: ApiPaginationLinks;
}

export interface ApiResponse<T> {
  status: ApiResponseStatus;
  result: T;
  pagination?: ApiPagination;
}
