import { TableShellHeader, TableShellSortState } from "./types";
import { isHeaderConfig } from "./table.helper";
import { IconSort, IconSortAsc, IconSortDesc } from "../icons/Icons";

interface TableShellHeadProps {
  headers: TableShellHeader[];
  sort: TableShellSortState | null;
  onSort: (columnIndex: number) => void;
}

function renderSortIcon(
  columnIndex: number,
  sort: TableShellSortState | null,
) {
  if (!sort || sort.columnIndex !== columnIndex) {
    return <IconSort className="text-muted" />;
  }

  return sort.direction === "asc" ? <IconSortAsc /> : <IconSortDesc />;
}

const TableShellHead = ({ headers, sort, onSort }: TableShellHeadProps) => (
  <thead className="sticky-top bg-body-tertiary">
    <tr>
      {headers.map((header, headerIndex) =>
        isHeaderConfig(header) ? (
          <th key={headerIndex} scope="col" className={header.className}>
            {header.isSortable ? (
              <button
                type="button"
                className="btn btn-sm p-0 d-flex align-items-center gap-1 fw-semibold text-body"
                onClick={() => onSort(headerIndex)}
              >
                {header.content}
                {renderSortIcon(headerIndex, sort)}
              </button>
            ) : (
              header.content
            )}
          </th>
        ) : (
          <th key={headerIndex} scope="col">
            {header}
          </th>
        ),
      )}
    </tr>
  </thead>
);

export default TableShellHead;
