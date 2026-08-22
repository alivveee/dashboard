import type { RefObject } from "react";
import { User } from "../types/User.types";
import useRoles from "../../roles/hooks/useRoles";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";

interface UserDetailOffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  user: User | null;
  onClose: () => void;
}

const UserDetailOffcanvas = ({ offcanvasRef, user, onClose }: UserDetailOffcanvasProps) => {
  const roles = useRoles();
  const roleLabel = user
    ? roles.find((role) => role.id === user.role)?.name ?? user.role
    : "";
  const genderLabel = user
    ? user.gender === "L"
      ? "Male"
      : user.gender === "P"
        ? "Female"
        : user.gender
    : "";

  return (
    <Offcanvas offcanvasRef={offcanvasRef} onClose={onClose}>
      {user && (
        <div className="d-flex flex-column h-100">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">User Detail</h5>

            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          <div className="offcanvas-body">
            <div className="mb-3">
              <div className="form-label text-muted mb-1">Name</div>
              <div>{user.name}</div>
            </div>

            <div className="mb-3">
              <div className="form-label text-muted mb-1">Email</div>
              <div>{user.email}</div>
            </div>

            <div className="mb-3">
              <div className="form-label text-muted mb-1">Address</div>
              <div>{user.address}</div>
            </div>

            <div className="mb-3">
              <div className="form-label text-muted mb-1">Date of Birth</div>
              <div>{user.birthday}</div>
            </div>

            <div className="mb-3">
              <div className="form-label text-muted mb-1">Gender</div>
              <div>{genderLabel}</div>
            </div>

            <div>
              <div className="form-label text-muted mb-1">Role</div>
              <div>{roleLabel}</div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 border-top p-3 mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Offcanvas>
  );
};

export default UserDetailOffcanvas;
