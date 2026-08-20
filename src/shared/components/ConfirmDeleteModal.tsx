import Modal from "./Modal";

interface ConfirmDeleteModalProps {
  entityName: string;
  itemName: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteModal = ({
  entityName,
  itemName,
  loading,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal>
      <div className="modal-header">
        <h5 className="modal-title">Delete {entityName}</h5>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onCancel}
        />
      </div>

      <div className="modal-body">
        <p className="mb-0">
          Are you sure you want to delete this {entityName.toLowerCase()}{" "}
          <strong>{itemName}</strong>? This action cannot be undone.
        </p>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
