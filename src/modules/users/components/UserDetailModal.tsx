import { User } from "../types/User.types";
import useRoles from "../../roles/hooks/useRoles";
import Modal from "../../../shared/components/Modal";

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

const UserDetailModal = ({ user, onClose }: UserDetailModalProps) => {
  const roles = useRoles();
  const roleLabel = roles.find((role) => role.id === user.role)?.name ?? user.role;
  const genderLabel =
    user.gender === "L" ? "Laki-laki" : user.gender === "P" ? "Perempuan" : user.gender;

  return (
    <Modal>
      <div className="modal-header">
        <h5 className="modal-title">Detail User</h5>

        <button
          type="button"
          className="btn-close"
          aria-label="Tutup"
          onClick={onClose}
        />
      </div>

      <div className="modal-body">
        <div className="mb-3">
          <div className="form-label text-muted mb-1">Nama</div>
          <div>{user.name}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Email</div>
          <div>{user.email}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Alamat</div>
          <div>{user.address}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Tanggal Lahir</div>
          <div>{user.birthday}</div>
        </div>

        <div className="mb-3">
          <div className="form-label text-muted mb-1">Jenis Kelamin</div>
          <div>{genderLabel}</div>
        </div>

        <div>
          <div className="form-label text-muted mb-1">Role</div>
          <div>{roleLabel}</div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </Modal>
  );
};

export default UserDetailModal;
