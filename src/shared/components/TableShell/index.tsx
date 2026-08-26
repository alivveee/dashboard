import { TableShellHeader, TableShellRow } from "./types";
import { useTableShellState } from "./useTableShellState";
import TableSearchBox from "./TableSearchBox";
import TableShellHead from "./TableShellHead";
import TableShellBody from "./TableShellBody";
import TableShellPagination from "./TableShellPagination";

interface TableShellProps {
  headers: TableShellHeader[];
  rows: TableShellRow[];
  emptyMessage: string;

  isLoading?: boolean;
  className?: string;

  pageSizeOptions?: number[];
  defaultPageSize?: number;

  searchPlaceholder?: string;
}

function TableShell({
  headers,
  rows,
  emptyMessage,
  isLoading,
  className,

  pageSizeOptions = [10, 25, 50],
  defaultPageSize = pageSizeOptions[0],

  searchPlaceholder = "Search...",
}: TableShellProps) {
  const {
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
    isSearchableColumnsPresent,

    handlePreviousPage,
    handleNextPage,
    goToPage,
  } = useTableShellState({ headers, rows, defaultPageSize });

  const colSpan = headers.length;

  return (
    <div className={`card border-0 shadow-sm ${className ?? ""}`.trim()}>
      {/* Search */}
      {isSearchableColumnsPresent ? (
        <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-2">
          <TableSearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={searchPlaceholder}
          />
        </div>
      ) : null}

      {/* Table */}
      <div
        className="card-body p-0 table-responsive"
        style={{ maxHeight: "65vh", overflowY: "auto" }}
      >
        <table className="table align-middle mb-0">
          <TableShellHead headers={headers} sort={sort} onSort={handleSort} />

          <TableShellBody
            rows={pagedRows}
            colSpan={colSpan}
            isLoading={isLoading}
            emptyMessage={
              isSearching
                ? `No results found for "${searchQuery.trim()}".`
                : emptyMessage
            }
          />
        </table>
      </div>

      {/* Pagination */}
      {totalItems > 0 ? (
        <TableShellPagination
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          totalItems={totalItems}
          actions={{
            onPageSizeChange: setPageSize,
            onPrevious: handlePreviousPage,
            onNext: handleNextPage,
            onGoToPage: goToPage,
          }}
        />
      ) : null}
    </div>
  );
}

export default TableShell;
