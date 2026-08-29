import { getPageNumbers, PAGE_ELLIPSIS } from "./table.helper";
import { PaginationState } from "../../types/Pagination.types";

interface TableShellPaginationProps {
  pagination: PaginationState;
  pageSizeOptions: number[];
  startIndex: number;
}

const TableShellPagination = ({
  pagination: {
    page,
    pageSize,
    totalItems,
    totalPages,
    onPageChange,
    onPageSizeChange,
  },
  pageSizeOptions,
  startIndex,
}: TableShellPaginationProps) => (
  <div className="card-footer d-flex flex-wrap justify-content-between align-items-center gap-2">
    {/* Page Size */}
    <div className="d-flex align-items-center gap-2">
      <span className="text-muted small">Rows per page</span>

      <select
        className="form-select form-select-sm w-auto"
        value={pageSize}
        onChange={(event) => onPageSizeChange(Number(event.target.value))}
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
        Showing {startIndex + 1}-{Math.min(startIndex + pageSize, totalItems)}{" "}
        of {totalItems} entries
      </span>

      <nav aria-label="Page navigation">
        <ul className="pagination pagination-sm mb-0">
          {/* Previous */}
          <li className={`page-item ${page <= 1 ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              aria-label="Previous page"
            >
              &laquo;
            </button>
          </li>

          {/* Page Numbers */}
          {getPageNumbers(page, totalPages).map((pageNumber, index) =>
            pageNumber === PAGE_ELLIPSIS ? (
              <li key={`ellipsis-${index}`} className="page-item disabled">
                <span className="page-link">{PAGE_ELLIPSIS}</span>
              </li>
            ) : (
              <li
                key={pageNumber}
                className={`page-item ${pageNumber === page ? "active" : ""}`}
                aria-current={pageNumber === page ? "page" : undefined}
              >
                <button
                  type="button"
                  className="page-link"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ),
          )}

          {/* Next */}
          <li className={`page-item ${page >= totalPages ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
              aria-label="Next page"
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default TableShellPagination;
