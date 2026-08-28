import { ReactNode } from "react";
import { TableShellHeader, TableShellRow } from "./types";
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
  isPaginationHidden?: boolean;

  searchPlaceholder?: string;
  children?: (pagedRows: T[], startIndex: number) => ReactNode;
}

function TableShell<T = TableShellRow>({
  headers,
  rows,
  emptyMessage,
  isLoading,
  className,

  pageSizeOptions = [10, 25, 50],
  defaultPageSize = pageSizeOptions[0],
  isPaginationHidden = false,

  searchPlaceholder = "Search...",

  children,
}: TableShellProps<T>) {
  const {
    __pagedRows,
    __totalItems,
    __totalPages,
    __currentPage,
    __startIndex,

    __pageSize,
    __setPageSize,

    __sort,
    __handleSort,

    __searchQuery,
    __setSearchQuery,
    __isSearching,
    __isSearchableColumnsPresent,

    __handlePreviousPage,
    __handleNextPage,
    __goToPage,
  } = useTableShellState({
    headers,
    rows,
    defaultPageSize: isPaginationHidden
      ? Number.MAX_SAFE_INTEGER
      : defaultPageSize,
  });

  const colSpan = headers.length;

  return (
    <div className={`card border-0 shadow-sm ${className ?? ""}`.trim()}>
      {/* Search */}
      {__isSearchableColumnsPresent ? (
        <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
          <TableSearchBox
            value={__searchQuery}
            onChange={__setSearchQuery}
            placeholder={searchPlaceholder}
          />
        </div>
      ) : null}

      {/* Table */}
      <div
        className="card-body p-0 table-responsive"
        style={
          isPaginationHidden
            ? { overflow: "visible" }
            : { maxHeight: "65vh", overflowY: "auto" }
        }
      >
        <table className="table align-middle mb-0">
          <TableShellHead
            headers={headers}
            sort={__sort}
            onSort={__handleSort}
          />

          <TableShellBody
            rows={__pagedRows}
            colSpan={colSpan}
            isLoading={isLoading}
            startIndex={__startIndex}
            children={children}
            emptyMessage={
              __isSearching
                ? `No results found for "${__searchQuery.trim()}".`
                : emptyMessage
            }
          />
        </table>
      </div>

      {/* Pagination */}
      {!isPaginationHidden && __totalItems > 0 ? (
        <TableShellPagination
          pageSize={__pageSize}
          pageSizeOptions={pageSizeOptions}
          currentPage={__currentPage}
          totalPages={__totalPages}
          startIndex={__startIndex}
          totalItems={__totalItems}
          actions={{
            onPageSizeChange: __setPageSize,
            onPrevious: __handlePreviousPage,
            onNext: __handleNextPage,
            onGoToPage: __goToPage,
          }}
        />
      ) : null}
    </div>
  );
}

export default TableShell;
