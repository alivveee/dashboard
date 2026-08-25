import { getPageNumbers, PAGE_ELLIPSIS } from "./table.helper";

interface TableShellPaginationActions {
  onPageSizeChange: (size: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onGoToPage: (page: number) => void;
}

interface TableShellPaginationProps {
  pageSize: number;
  pageSizeOptions: number[];

  currentPage: number;
  totalPages: number;
  startIndex: number;
  totalItems: number;

  actions: TableShellPaginationActions;
}

const TableShellPagination = ({
  pageSize,
  pageSizeOptions,
  currentPage,
  totalPages,
  startIndex,
  totalItems,
  actions: { onPageSizeChange, onPrevious, onNext, onGoToPage },
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
        Showing {startIndex + 1}-
        {Math.min(startIndex + pageSize, totalItems)} of {totalItems} entries
      </span>

      <nav aria-label="Page navigation">
        <ul className="pagination pagination-sm mb-0">
          {/* Previous */}
          <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
            <button
              type="button"
              className="page-link"
              onClick={onPrevious}
              disabled={currentPage <= 1}
              aria-label="Previous page"
            >
              &laquo;
            </button>
          </li>

          {/* Page Numbers */}
          {getPageNumbers(currentPage, totalPages).map((page, index) =>
            page === PAGE_ELLIPSIS ? (
              <li key={`ellipsis-${index}`} className="page-item disabled">
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
                  onClick={() => onGoToPage(page)}
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
              onClick={onNext}
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
);

export default TableShellPagination;
