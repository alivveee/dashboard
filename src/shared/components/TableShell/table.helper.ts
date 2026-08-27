import { ReactNode } from "react";
import { TableShellHeader, TableShellRow } from "./types";

export const PAGE_ELLIPSIS = "...";

export function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | typeof PAGE_ELLIPSIS)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([
    1,
    2,
    totalPages - 1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  const sortedPages = [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const result: (number | typeof PAGE_ELLIPSIS)[] = [];

  sortedPages.forEach((page, index) => {
    if (index > 0 && page - sortedPages[index - 1] > 1) {
      result.push(PAGE_ELLIPSIS);
    }

    result.push(page);
  });

  return result;
}

export function isHeaderConfig<T>(value: TableShellHeader<T>): value is Exclude<
  TableShellHeader<T>,
  string
> {
  return typeof value === "object" && value !== null && "content" in value;
}

export function isCellConfig(
  value: unknown,
): value is { className?: string; content: ReactNode; sortValue?: string | number } {
  return typeof value === "object" && value !== null && "content" in value;
}

export function getRowValue<T>(
  row: T,
  columnIndex: number,
  headers: TableShellHeader<T>[],
): string | number {
  const header = headers[columnIndex];

  if (isHeaderConfig(header) && header.sortValue) {
    return header.sortValue(row);
  }

  const cell = (row as unknown as TableShellRow)[columnIndex];

  if (isCellConfig(cell)) {
    if (cell.sortValue !== undefined) {
      return cell.sortValue;
    }

    return typeof cell.content === "string" || typeof cell.content === "number"
      ? cell.content
      : "";
  }

  return typeof cell === "string" || typeof cell === "number" ? cell : "";
}

export function compareSortValues(a: string | number, b: string | number): number {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  return String(a).localeCompare(String(b));
}
