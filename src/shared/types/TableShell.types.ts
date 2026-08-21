import { ReactNode } from "react";

export type TableShellHeader =
  | string
  | {
      className?: string;
      content: ReactNode;
      sortable?: boolean;
      searchable?: boolean;
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
