import { ReactNode } from "react";
import { PAGE_SIZE_OPTIONS } from "../../constants/table";
import {
  TableShellHeader,
  TableShellPaginationState,
  TableShellRow,
  TableShellSearch,
} from "./types";
import { useTableShellState } from "./useTableShellState";
import TableSearchBox from "./TableSearchBox";
import TableShellHead from "./TableShellHead";
import TableShellBody from "./TableShellBody";
import TableShellPagination from "./TableShellPagination";

interface TableShellProps<T = TableShellRow> {
  headers: TableShellHeader<T>[];
  rows: T[];
  emptyMessage: string;

  isLoading?: boolean;
  className?: string;

  pageSizeOptions?: number[];
  defaultPageSize?: number;
  pagination?: TableShellPaginationState;

  searchPlaceholder?: string;
  search?: TableShellSearch;
  advanceSearch?: ReactNode;
  children?: (pagedRows: T[], startIndex: number) => ReactNode;
}

function TableShell<T = TableShellRow>({
  headers,
  rows,
  emptyMessage,
  isLoading,
  className,

  pageSizeOptions = PAGE_SIZE_OPTIONS,
  defaultPageSize = pageSizeOptions[0],
  pagination,

  searchPlaceholder = "Search...",
  search,
  advanceSearch,

  children,
}: TableShellProps<T>) {
  const {
    __pagedRows,
    __sort,
    __handleSort,
    __isSearchableColumnsPresent,
    __clientPagination,
    __clientSearch,
  } = useTableShellState({
    headers,
    rows,
    defaultPageSize,
    isPaginationExternal: pagination !== undefined,
  });

  const activePagination = pagination ?? __clientPagination;
  const activeSearch = search ?? __clientSearch;

  const startIndex = (activePagination.page - 1) * activePagination.pageSize;
  const appliedSearchQuery = (activeSearch.appliedValue ?? "").trim();

  return (
    <div className={`card border-0 shadow-sm ${className ?? ""}`.trim()}>
      {/* Search */}
      {search || advanceSearch || __isSearchableColumnsPresent ? (
        <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-center gap-2">
            <TableSearchBox
              value={activeSearch.value}
              onChange={activeSearch.onChange}
              onSubmit={activeSearch.onSubmit}
              placeholder={searchPlaceholder}
            />

            {advanceSearch}
          </div>
        </div>
      ) : null}

      {/* Table */}
      <div
        className="card-body p-0 table-responsive"
        style={{ overflow: "visible" }}
      >
        <table className="table align-middle mb-0">
          <TableShellHead
            headers={headers}
            sort={__sort}
            onSort={__handleSort}
          />

          <TableShellBody
            rows={__pagedRows}
            colSpan={headers.length}
            isLoading={isLoading}
            startIndex={startIndex}
            children={children}
            emptyMessage={
              appliedSearchQuery
                ? `No results found for "${appliedSearchQuery}".`
                : emptyMessage
            }
          />
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && activePagination.totalItems > 0 ? (
        <TableShellPagination
          pagination={activePagination}
          pageSizeOptions={pageSizeOptions}
          startIndex={startIndex}
        />
      ) : null}
    </div>
  );
}

export type { TableShellSearch, TableShellPaginationState };
export default TableShell;
