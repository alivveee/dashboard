import { useEffect, useMemo, useState } from "react";
import { TableShellHeader, TableShellRow, TableShellSortState } from "./types";
import {
  compareSortValues,
  getRowSortValue,
  isHeaderConfig,
} from "./table.helper";

interface UseTableShellStateOptions {
  headers: TableShellHeader[];
  rows: TableShellRow[];
  defaultPageSize: number;
}

export function useTableShellState({
  headers,
  rows,
  defaultPageSize,
}: UseTableShellStateOptions) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sort, setSort] = useState<TableShellSortState | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchableColumnIndexes = useMemo(
    () =>
      headers
        .map((header, index) =>
          isHeaderConfig(header) && header.isSearchable ? index : -1,
        )
        .filter((index) => index !== -1),
    [headers],
  );

  const filteredRows = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();

    if (!trimmedQuery || searchableColumnIndexes.length === 0) {
      return rows;
    }

    return rows.filter((row) =>
      searchableColumnIndexes.some((columnIndex) =>
        String(getRowSortValue(row, columnIndex))
          .toLowerCase()
          .includes(trimmedQuery),
      ),
    );
  }, [rows, searchQuery, searchableColumnIndexes]);

  const sortedRows = useMemo(() => {
    if (!sort) {
      return filteredRows;
    }

    const factor = sort.direction === "asc" ? 1 : -1;

    return [...filteredRows].sort(
      (a, b) =>
        compareSortValues(
          getRowSortValue(a, sort.columnIndex),
          getRowSortValue(b, sort.columnIndex),
        ) * factor,
    );
  }, [filteredRows, sort]);

  const totalItems = sortedRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const pagedRows = useMemo(
    () => sortedRows.slice(startIndex, startIndex + pageSize),
    [sortedRows, startIndex, pageSize],
  );

  useEffect(() => {
    setPage(1);
  }, [rows, pageSize, sort, searchQuery]);

  const isSearching =
    searchableColumnIndexes.length > 0 && searchQuery.trim() !== "";

  const handleSort = (columnIndex: number) => {
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

  const handlePreviousPage = () => {
    setPage((page) => Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setPage((page) => Math.min(totalPages, page + 1));
  };

  return {
    pagedRows,
    totalItems,
    totalPages,
    currentPage,
    startIndex,

    pageSize,
    setPageSize,

    sort,
    handleSort,

    searchQuery,
    setSearchQuery,
    isSearching,
    isSearchableColumnsPresent: searchableColumnIndexes.length > 0,

    handlePreviousPage,
    handleNextPage,
    goToPage: setPage,
  };
}
