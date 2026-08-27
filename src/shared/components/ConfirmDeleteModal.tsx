import type { RefObject } from "react";
import Modal, { type ModalHandle } from "./Modal";

interface ConfirmDeleteModalActions {
  onConfirm: () => void;
  onCancel: () => void;
}

interface ConfirmDeleteModalProps {
  modalRef: RefObject<ModalHandle | null>;
  entityName: string;
  itemName: string;
  isLoading: boolean;
  actions: ConfirmDeleteModalActions;
}

const ConfirmDeleteModal = ({
  modalRef,
  entityName,
  itemName,
  isLoading,
  actions,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal modalRef={modalRef} onClose={actions.onCancel} closable>
      <div className="modal-header">
        <h5 className="modal-title">Delete {entityName}</h5>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={actions.onCancel}
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
          onClick={actions.onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={actions.onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
