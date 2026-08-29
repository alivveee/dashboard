import { ReactNode } from "react";

export type TableShellHeader<T = unknown> =
  | string
  | {
      className?: string;
      content: ReactNode;
      isSortable?: boolean;
      isSearchable?: boolean;
      sortValue?: (row: T) => string | number;
    };

export type TableShellCell =
  | ReactNode
  | { className?: string; content: ReactNode; sortValue?: string | number };

export type TableShellRow = TableShellCell[];

export type SortDirection = "asc" | "desc";

export interface TableShellSortState {
  columnIndex: number;
  direction: SortDirection;
}

export interface TableShellPaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

/** Same idea as TableShellPaginationState, for the search box. */
export interface TableShellSearch {
  value: string;
  appliedValue?: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
}
