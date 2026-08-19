import { useEffect, useMemo, useState } from "react";
import { DataTableColumn } from "../types/DataTable.types";

export type SortDirection = "asc" | "desc";

export interface SortState {
  columnIndex: number;
  direction: SortDirection;
}

function getSortValue<T>(item: T, column: DataTableColumn<T>): string | number {
  if (column.sortValue) {
    return column.sortValue(item);
  }

  if (column.key) {
    const value = item[column.key];

    if (value instanceof Date) {
      return value.getTime();
    }

    if (typeof value === "number") {
      return value;
    }

    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }

    return String(value ?? "").toLowerCase();
  }

  return "";
}

function compareValues(a: string | number, b: string | number): number {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  return String(a).localeCompare(String(b));
}

interface UseSortedPaginatedDataOptions {
  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

export function useSortedPaginatedData<T>(
  items: T[],
  columns: DataTableColumn<T>[],
  {
    pageSizeOptions = [10, 25, 50],
    defaultPageSize = pageSizeOptions[0],
  }: UseSortedPaginatedDataOptions = {},
) {
  const [sortState, setSortState] = useState<SortState | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Total halaman berdasarkan seluruh data
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * pageSize;

  // Ambil data berdasarkan halaman terlebih dahulu
  const pageItems = useMemo(() => {
    return items.slice(startIndex, startIndex + pageSize);
  }, [items, startIndex, pageSize]);

  // Sort hanya data pada halaman aktif
  const paginatedItems = useMemo(() => {
    if (!sortState) {
      return pageItems;
    }

    const column = columns[sortState.columnIndex];

    if (!column) {
      return pageItems;
    }

    const direction = sortState.direction === "asc" ? 1 : -1;

    return [...pageItems].sort(
      (a, b) =>
        compareValues(getSortValue(a, column), getSortValue(b, column)) *
        direction,
    );
  }, [pageItems, sortState, columns]);

  // Reset ke halaman pertama ketika data atau page size berubah
  useEffect(() => {
    setPage(1);
  }, [items, pageSize]);

  const handleSort = (columnIndex: number) => {
    setSortState((prev) => {
      // Kolom baru → ASC
      if (!prev || prev.columnIndex !== columnIndex) {
        return {
          columnIndex,
          direction: "asc",
        };
      }

      // ASC → DESC
      if (prev.direction === "asc") {
        return {
          columnIndex,
          direction: "desc",
        };
      }

      // DESC → reset
      return null;
    });
  };

  return {
    sortState,
    handleSort,
    paginatedItems,

    page: currentPage,
    setPage,

    pageSize,
    setPageSize,

    totalPages,
    startIndex,

    totalItems: items.length,
  };
}
