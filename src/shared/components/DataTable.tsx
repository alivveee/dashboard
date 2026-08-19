import { ReactNode } from "react";
import { IconEdit, IconEye, IconTrash } from "./icons/Icons";

export interface DataTableColumn<T> {
  header: string;
  render: (item: T, index: number) => ReactNode;
  headerClassName?: string;
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
}: DataTableProps<T>) {
  const hasActions = !!(onView || onEdit || onDelete);
  const colSpan = 1 + columns.length + (hasActions ? 1 : 0);

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0 table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">#</th>
              {columns.map((col) => (
                <th
                  key={col.header}
                  scope="col"
                  className={col.headerClassName}
                >
                  {col.header}
                </th>
              ))}
              {hasActions && (
                <th scope="col" className="text-end">
                  Aksi
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="text-center text-muted py-4">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              items.map((item, idx) => (
                <tr key={item.id}>
                  <th scope="row">{idx + 1}</th>
                  {columns.map((col) => (
                    <td key={col.header}>{col.render(item, idx)}</td>
                  ))}
                  {hasActions && (
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        {onView && canView && (
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary d-flex align-items-center"
                            onClick={() => onView(item)}
                            aria-label={`Detail ${getItemLabel(item)}`}
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
                            aria-label={`Hapus ${getItemLabel(item)}`}
                          >
                            <IconTrash />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
