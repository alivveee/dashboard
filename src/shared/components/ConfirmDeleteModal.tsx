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
        <h5 className="modal-title">Hapus {entityName}</h5>

        <button
          type="button"
          className="btn-close"
          aria-label="Tutup"
          onClick={onCancel}
        />
      </div>

      <div className="modal-body">
        <p className="mb-0">
          Apakah Anda yakin ingin menghapus {entityName.toLowerCase()}{" "}
          <strong>{itemName}</strong>? Tindakan ini tidak dapat dibatalkan.
        </p>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Batal
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Menghapus..." : "Hapus"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
