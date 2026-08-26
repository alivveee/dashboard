import type { ReactNode, RefObject } from "react";
import { User } from "../types/User.types";
import useRoles from "../../roles/hooks/useRoles";
import Offcanvas, {
  type OffcanvasHandle,
} from "../../../shared/components/Offcanvas";
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

interface DetailFieldProps {
  label: string;
  value: ReactNode;
}

const DetailField = ({ label, value }: DetailFieldProps) => (
  <div className="mb-2">
    <span className="text-muted d-inline-block" style={{ width: "120px" }}>
      {label}
    </span>
    <span>: </span>
    <span>{value || "-"}</span>
  </div>
);

const UserDetailOffcanvas = ({
  offcanvasRef,
  user,
  onClose,
}: UserDetailOffcanvasProps) => {
  const roles = useRoles();

  const roleLabel = user
    ? (roles.find((role) => role.id === user.role)?.name ?? user.role)
    : "";

  const genderLabel = user
    ? user.gender === "L"
      ? "Male"
      : user.gender === "P"
        ? "Female"
        : user.gender
    : "";

  return (
    <Offcanvas offcanvasRef={offcanvasRef} onClose={onClose} closable>
      {user ? (
        <>
          <OffcanvasPanelHeader title="User Detail" onClose={onClose} />

          <OffcanvasPanelBody>
            <OffcanvasSectionLabel>Personal Information</OffcanvasSectionLabel>

            <DetailField label="Full Name" value={user.name} />
            <DetailField label="Gender" value={genderLabel} />
            <DetailField label="Birthday" value={user.birthday} />
            <DetailField label="Address" value={user.address} />

            <br />

            <OffcanvasSectionLabel>Account</OffcanvasSectionLabel>

            <DetailField
              label="Email"
              value={
                <a
                  href={`mailto:${user.email}`}
                  className="text-decoration-none"
                >
                  {user.email}
                </a>
              }
            />

            <DetailField
              label="Role"
              value={
                <span className="badge text-bg-secondary">{roleLabel}</span>
              }
            />
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
        </>
      ) : null}
    </Offcanvas>
  );
};

export default UserDetailOffcanvas;
