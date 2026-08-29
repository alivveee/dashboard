import { useState } from "react";
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from "../constants/table";
import { ApiPagination } from "../types/Api.types";
import { PaginationState } from "../types/Pagination.types";
import useQueryParams, { QueryParamsPatch } from "./useQueryParams";

const PAGE_PARAM = "page";
const PAGE_SIZE_PARAM = "limit";

const usePagination = (defaultPageSize = DEFAULT_PAGE_SIZE) => {
  const { __getNumberParam, __setParams } = useQueryParams();
  const [meta, setMeta] = useState<ApiPagination | null>(null);

  const page = __getNumberParam(PAGE_PARAM, 1);
  const pageSizeParam = __getNumberParam(PAGE_SIZE_PARAM, defaultPageSize);
  const pageSize = PAGE_SIZE_OPTIONS.includes(pageSizeParam)
    ? pageSizeParam
    : defaultPageSize;

  const _pageParam = (nextPage: number) => (nextPage > 1 ? nextPage : null);

  const _handleChangePage = (nextPage: number) => {
    __setParams({ [PAGE_PARAM]: _pageParam(nextPage) });
  };

  const _handleChangePageSize = (size: number) => {
    __setParams({
      [PAGE_PARAM]: null,
      [PAGE_SIZE_PARAM]: size === defaultPageSize ? null : size,
    });
  };

  const pagination: PaginationState = {
    page,
    pageSize,
    totalItems: meta?.total ?? 0,
    totalPages: meta?.totalPage ?? 1,
    onPageChange: _handleChangePage,
    onPageSizeChange: _handleChangePageSize,
  };

  return {
    __page: page,
    __pageSize: pageSize,

    __pagination: pagination,
    __setPaginationMeta: setMeta,

    __resetPageParams: { [PAGE_PARAM]: null } as QueryParamsPatch,
  };
};

export default usePagination;
