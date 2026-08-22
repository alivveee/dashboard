import type { RefObject } from "react";
import { Role } from "../types/Role.types";
import { Permission } from "../../../shared/types/Permission.types";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";
import RoleForm from "./RoleForm";

interface RoleFormOffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  initialValues: Omit<Role, "id">;
  permissions: Permission[];
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: Omit<Role, "id">) => void;
  onCancel: () => void;
}

const RoleFormOffcanvas = ({
  offcanvasRef,
  initialValues,
  permissions,
  isEditing,
  loading,
  onSubmit,
  onCancel,
}: RoleFormOffcanvasProps) => {
  return (
    <Offcanvas offcanvasRef={offcanvasRef} onClose={onCancel}>
      <RoleForm
        initialValues={initialValues}
        permissions={permissions}
        isEditing={isEditing}
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Offcanvas>
  );
};

export default RoleFormOffcanvas;
