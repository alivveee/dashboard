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
