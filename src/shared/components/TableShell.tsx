import { useEffect, useMemo, useState } from "react";
import { TableShellHeader, TableShellRow } from "../types/TableShell.types";
import {
  getPageNumbers,
  isCellConfig,
  PAGE_ELLIPSIS,
} from "../helpers/table.helper";

interface TableShellProps {
  headers: TableShellHeader[];
  rows: TableShellRow[];
  emptyMessage: string;

  isEmpty?: boolean;
  isLoading?: boolean;
  className?: string;

  pageSizeOptions?: number[];
  defaultPageSize?: number;
}

function TableShell({
  headers,
  rows,
  emptyMessage,
  isLoading,
  className,

  pageSizeOptions = [10, 25, 50],
  defaultPageSize = pageSizeOptions[0],
}: TableShellProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalItems = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  const pagedRows = useMemo(
    () => rows.slice(startIndex, startIndex + pageSize),
    [rows, startIndex, pageSize],
  );

  useEffect(() => {
    setPage(1);
  }, [rows, pageSize]);

  const colSpan = headers.length;

  const handlePreviousPage = () => {
    setPage((page) => Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setPage((page) => Math.min(totalPages, page + 1));
  };

  return (
    <div className={`card border-0 shadow-sm ${className ?? ""}`.trim()}>
      {/* Table */}
      <div
        className="card-body p-0 table-responsive"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <table className="table align-middle mb-0">
          <thead className="sticky-top bg-body-tertiary">
            <tr>
              {headers.map((header, headerIndex) =>
                isCellConfig(header) ? (
                  <th
                    key={headerIndex}
                    scope="col"
                    className={header.className}
                  >
                    {header.content}
                  </th>
                ) : (
                  <th key={headerIndex} scope="col">
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={colSpan} className="text-center py-4">
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : pagedRows.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="text-center text-muted py-4">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              pagedRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) =>
                    isCellConfig(cell) ? (
                      <td key={cellIndex} className={cell.className}>
                        {cell.content}
                      </td>
                    ) : (
                      <td key={cellIndex}>{cell}</td>
                    ),
                  )}
                </tr>
              ))
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

export default TableShell;
