import { useState } from "react";
import type { TableShellPaginationState } from "../components/TableShell/types";
import { DEFAULT_PAGE_SIZE } from "../constants/table";
import { ApiPagination } from "../types/Api.types";

const usePagination = (defaultPageSize = DEFAULT_PAGE_SIZE) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [meta, setMeta] = useState<ApiPagination | null>(null);

  const _handleChangePageSize = (size: number) => {
    setPage(1);
    setPageSize(size);
  };

  const _resetPage = () => {
    setPage(1);
  };

  const pagination: TableShellPaginationState = {
    page,
    pageSize,
    totalItems: meta?.total ?? 0,
    totalPages: meta?.totalPage ?? 1,
    onPageChange: setPage,
    onPageSizeChange: _handleChangePageSize,
  };

  return {
    __page: page,
    __pageSize: pageSize,

    __pagination: pagination,
    __setPaginationMeta: setMeta,
    __resetPage: _resetPage,
  };
};

export default usePagination;
