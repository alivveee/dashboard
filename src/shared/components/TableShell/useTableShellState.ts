import { useEffect, useState } from "react";
import { PaginationState } from "../../types/Pagination.types";
import {
  TableShellHeader,
  TableShellSearch,
  TableShellSortState,
} from "./types";
import { compareSortValues, getRowValue, isHeaderConfig } from "./table.helper";

interface UseTableShellStateOptions<T> {
  headers: TableShellHeader<T>[];
  rows: T[];
  defaultPageSize: number;
  isPaginationExternal: boolean;
}

export function useTableShellState<T>({
  headers,
  rows,
  defaultPageSize,
  isPaginationExternal,
}: UseTableShellStateOptions<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sort, setSort] = useState<TableShellSortState | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchableColumnIndexes = headers
    .map((header, index) =>
      isHeaderConfig(header) && header.isSearchable ? index : -1,
    )
    .filter((index) => index !== -1);

  const filteredRows = (() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    if (!trimmedQuery || searchableColumnIndexes.length === 0) {
      return rows;
    }

    return rows.filter((row) =>
      searchableColumnIndexes.some((columnIndex) =>
        String(getRowValue(row, columnIndex, headers))
          .toLowerCase()
          .includes(trimmedQuery),
      ),
    );
  })();

  const sortedRows = (() => {
    if (!sort) {
      return filteredRows;
    }

    const factor = sort.direction === "asc" ? 1 : -1;

    return [...filteredRows].sort(
      (a, b) =>
        compareSortValues(
          getRowValue(a, sort.columnIndex, headers),
          getRowValue(b, sort.columnIndex, headers),
        ) * factor,
    );
  })();

  const totalItems = sortedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  // Externally paginated rows are already a single server page.
  const pagedRows = isPaginationExternal
    ? sortedRows
    : sortedRows.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    if (isPaginationExternal) {
      return;
    }

    setPage(1);
  }, [rows, pageSize, sort, searchQuery, isPaginationExternal]);

  const isSearching =
    searchableColumnIndexes.length > 0 && searchQuery.trim() !== "";

  const _handleSort = (columnIndex: number) => {
    setSort((prev) => {
      if (!prev || prev.columnIndex !== columnIndex) {
        return { columnIndex, direction: "asc" };
      }

      if (prev.direction === "asc") {
        return { columnIndex, direction: "desc" };
      }

      return null;
    });
  };

  const clientPagination: PaginationState = {
    page: currentPage,
    pageSize,
    totalItems,
    totalPages,
    onPageChange: setPage,
    onPageSizeChange: setPageSize,
  };

  // No onSubmit: client-side search filters as you type
  const clientSearch: TableShellSearch = {
    value: searchQuery,
    appliedValue: isSearching ? searchQuery : "",
    onChange: setSearchQuery,
  };

  return {
    __pagedRows: pagedRows,

    __sort: sort,
    __handleSort: _handleSort,

    __isSearchableColumnsPresent: searchableColumnIndexes.length > 0,

    __clientPagination: clientPagination,
    __clientSearch: clientSearch,
  };
}
