import type { RefObject } from "react";
import { RoleFormData } from "../types/Role.types";
import { Permission } from "../../../shared/types/Permission.types";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";
import RoleForm from "./RoleForm";

interface RoleFormOffcanvasActions {
  onSubmit: (data: RoleFormData) => void;
  onCancel: () => void;
}

interface RoleFormOffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  initialValues: RoleFormData;
  permissions: Permission[];
  isEditing: boolean;
  isLoading: boolean;
  actions: RoleFormOffcanvasActions;
}

const RoleFormOffcanvas = ({
  offcanvasRef,
  initialValues,
  permissions,
  isEditing,
  isLoading,
  actions,
}: RoleFormOffcanvasProps) => {
  return (
    <Offcanvas offcanvasRef={offcanvasRef} onClose={actions.onCancel}>
      <RoleForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        permissions={permissions}
        isEditing={isEditing}
        isLoading={isLoading}
        actions={actions}
      />
    </Offcanvas>
  );
};

export default RoleFormOffcanvas;
