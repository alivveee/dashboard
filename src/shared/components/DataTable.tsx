import {
  IconEdit,
  IconEye,
  IconSort,
  IconSortAsc,
  IconSortDesc,
  IconTrash,
} from "./icons/Icons";
import { DataTableColumn } from "../types/DataTable.types";
import { useSortedPaginatedData } from "../hooks/useSortedPaginatedData";

const PAGE_ELLIPSIS = "...";

function getPageNumbers(
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

interface DataTableProps<T extends { id: string }> {
  items: T[];
  columns: DataTableColumn<T>[];
  emptyMessage: string;

  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;

  canView?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;

  getItemLabel?: (item: T) => string;

  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

function DataTable<T extends { id: string }>({
  items,
  columns,
  emptyMessage,

  onView,
  onEdit,
  onDelete,

  canView,
  canEdit,
  canDelete,

  getItemLabel = () => "",

  pageSizeOptions = [10, 25, 50],
  defaultPageSize = pageSizeOptions[0],
}: DataTableProps<T>) {
  const hasActions = Boolean(onView || onEdit || onDelete);

  const colSpan = 1 + columns.length + (hasActions ? 1 : 0);

  const {
    sortState,
    handleSort,
    paginatedItems,

    page: currentPage,
    setPage,

    pageSize,
    setPageSize,

    totalPages,
    startIndex,
    totalItems,
  } = useSortedPaginatedData(items, columns, {
    pageSizeOptions,
    defaultPageSize,
  });

  const sortIcon = (columnIndex: number) => {
    if (!sortState || sortState.columnIndex !== columnIndex) {
      return <IconSort className="text-muted" />;
    }

    return sortState.direction === "asc" ? <IconSortAsc /> : <IconSortDesc />;
  };

  const handlePreviousPage = () => {
    setPage((page) => Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setPage((page) => Math.min(totalPages, page + 1));
  };

  return (
    <div className="card border-0 shadow-sm">
      {/* Table */}
      <div className="card-body p-0 table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">#</th>

              {columns.map((column, columnIndex) => (
                <th
                  key={columnIndex}
                  scope="col"
                  className={column.headerClassName}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className="btn btn-sm p-0 d-flex align-items-center gap-1 fw-semibold text-body"
                      onClick={() => handleSort(columnIndex)}
                    >
                      {column.header}
                      {sortIcon(columnIndex)}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}

              {hasActions && (
                <th scope="col" className="text-end">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="text-center text-muted py-4">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedItems.map((item, index) => {
                const rowIndex = startIndex + index;

                return (
                  <tr key={item.id}>
                    <th scope="row">{rowIndex + 1}</th>

                    {columns.map((column, columnIndex) => (
                      <td key={columnIndex}>
                        {column.render
                          ? column.render(item, rowIndex)
                          : column.key
                            ? String(item[column.key] ?? "")
                            : null}
                      </td>
                    ))}

                    {hasActions && (
                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          {onView && canView && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary d-flex align-items-center"
                              onClick={() => onView(item)}
                              aria-label={`View ${getItemLabel(item)}`}
                            >
                              <IconEye />
                            </button>
                          )}

                          {onEdit && canEdit && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary d-flex align-items-center"
                              onClick={() => onEdit(item)}
                              aria-label={`Edit ${getItemLabel(item)}`}
                            >
                              <IconEdit />
                            </button>
                          )}

                          {onDelete && canDelete && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger d-flex align-items-center"
                              onClick={() => onDelete(item)}
                              aria-label={`Delete ${getItemLabel(item)}`}
                            >
                              <IconTrash />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="card-footer d-flex flex-wrap justify-content-between align-items-center gap-2">
          {/* Page Size */}
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted small">Rows per page</span>

            <select
              className="form-select form-select-sm w-auto"
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Pagination */}
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted small">
              Showing {startIndex + 1}-
              {Math.min(startIndex + pageSize, totalItems)} of {totalItems}{" "}
              entries
            </span>

            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm mb-0">
                {/* Previous */}
                <li
                  className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}
                >
                  <button
                    type="button"
                    className="page-link"
                    onClick={handlePreviousPage}
                    disabled={currentPage <= 1}
                    aria-label="Previous page"
                  >
                    &laquo;
                  </button>
                </li>

                {/* Page Numbers */}
                {getPageNumbers(currentPage, totalPages).map((page, index) =>
                  page === PAGE_ELLIPSIS ? (
                    <li
                      key={`ellipsis-${index}`}
                      className="page-item disabled"
                    >
                      <span className="page-link">{PAGE_ELLIPSIS}</span>
                    </li>
                  ) : (
                    <li
                      key={page}
                      className={`page-item ${
                        page === currentPage ? "active" : ""
                      }`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      <button
                        type="button"
                        className="page-link"
                        onClick={() => setPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ),
                )}

                {/* Next */}
                <li
                  className={`page-item ${
                    currentPage >= totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="page-link"
                    onClick={handleNextPage}
                    disabled={currentPage >= totalPages}
                    aria-label="Next page"
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
