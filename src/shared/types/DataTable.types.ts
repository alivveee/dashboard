import { ReactNode } from "react";

export interface DataTableColumn<T> {
  header: string;
  key?: keyof T;
  render?: (item: T, index: number) => ReactNode;
  sortable?: boolean;
  sortValue?: (item: T) => string | number;
  headerClassName?: string;
}
