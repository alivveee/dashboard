import { IconEdit, IconEye, IconTrash } from "./icons/Icons";

interface TableRowActionsActions<T> {
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

interface TableRowActionsProps<T> {
  item: T;
  actions?: TableRowActionsActions<T>;
  isViewAllowed?: boolean;
  isEditAllowed?: boolean;
  isDeleteAllowed?: boolean;
  label?: string;
}

function TableRowActions<T>({
  item,
  actions = {},
  isViewAllowed,
  isEditAllowed,
  isDeleteAllowed,
  label = "",
}: TableRowActionsProps<T>) {
  const { onView, onEdit, onDelete } = actions;

  return (
    <div className="d-flex justify-content-end gap-2">
      {onView && isViewAllowed ? (
        <button
          type="button"
          className="btn btn-sm text-secondary border-0 d-flex align-items-center"
          onClick={() => onView(item)}
          aria-label={`View ${label}`}
        >
          <IconEye />
        </button>
      ) : null}

      {onEdit && isEditAllowed ? (
        <button
          type="button"
          className="btn btn-sm text-secondary border-0 d-flex align-items-center"
          onClick={() => onEdit(item)}
          aria-label={`Edit ${label}`}
        >
          <IconEdit />
        </button>
      ) : null}

      {onDelete && isDeleteAllowed ? (
        <button
          type="button"
          className="btn btn-sm text-danger border-0 d-flex align-items-center"
          onClick={() => onDelete(item)}
          aria-label={`Delete ${label}`}
        >
          <IconTrash />
        </button>
      ) : null}
    </div>
  );
}

export default TableRowActions;
