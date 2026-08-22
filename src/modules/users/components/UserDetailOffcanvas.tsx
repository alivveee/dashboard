import type { ReactNode, RefObject } from "react";
import { User } from "../types/User.types";
import useRoles from "../../roles/hooks/useRoles";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";
import {
  OffcanvasPanelHeader,
  OffcanvasPanelBody,
  OffcanvasPanelFooter,
  OffcanvasSectionLabel,
} from "../../../shared/components/OffcanvasPanel";

interface UserDetailOffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  user: User | null;
  onClose: () => void;
}

const DetailField = ({ label, value }: { label: string; value: ReactNode }) => (
  <div>
    <div className="form-label text-muted mb-1">{label}</div>
    <div>{value}</div>
  </div>
);

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
          <OffcanvasPanelHeader title="User Detail" onClose={onClose} />

          <OffcanvasPanelBody>
            <div className="fs-5 fw-semibold">{user.name}</div>

            <OffcanvasSectionLabel>Personal Information</OffcanvasSectionLabel>

            <div className="mb-3">
              <div className="form-label text-muted mb-1">Gender</div>
              <span className="badge text-bg-light">{genderLabel}</span>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 g-3">
              <div className="col">
                <DetailField label="Address" value={user.address} />
              </div>

              <div className="col">
                <DetailField label="Date of Birth" value={user.birthday} />
              </div>
            </div>

            <OffcanvasSectionLabel>Account</OffcanvasSectionLabel>

            <div className="mb-3">
              <DetailField label="Email" value={user.email} />
            </div>

            <div>
              <div className="form-label text-muted mb-1">Role</div>
              <span className="badge text-bg-secondary">{roleLabel}</span>
            </div>
          </OffcanvasPanelBody>

          <OffcanvasPanelFooter>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </OffcanvasPanelFooter>
        </div>
      )}
    </Offcanvas>
  );
};

export default UserDetailOffcanvas;
