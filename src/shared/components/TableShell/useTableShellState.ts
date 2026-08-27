import { useEffect, useState } from "react";
import { TableShellHeader, TableShellSortState } from "./types";
import { compareSortValues, getRowValue, isHeaderConfig } from "./table.helper";

interface UseTableShellStateOptions<T> {
  headers: TableShellHeader<T>[];
  rows: T[];
  defaultPageSize: number;
}

export function useTableShellState<T>({
  headers,
  rows,
  defaultPageSize,
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

  const pagedRows = sortedRows.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    setPage(1);
  }, [rows, pageSize, sort, searchQuery]);

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

  const _handlePreviousPage = () => {
    setPage((page) => Math.max(1, page - 1));
  };

  const _handleNextPage = () => {
    setPage((page) => Math.min(totalPages, page + 1));
  };

  return {
    __pagedRows: pagedRows,
    __totalItems: totalItems,
    __totalPages: totalPages,
    __currentPage: currentPage,
    __startIndex: startIndex,

    __pageSize: pageSize,
    __setPageSize: setPageSize,

    __sort: sort,
    __handleSort: _handleSort,

    __searchQuery: searchQuery,
    __setSearchQuery: setSearchQuery,
    __isSearching: isSearching,
    __isSearchableColumnsPresent: searchableColumnIndexes.length > 0,

    __handlePreviousPage: _handlePreviousPage,
    __handleNextPage: _handleNextPage,
    __goToPage: setPage,
  };
}
