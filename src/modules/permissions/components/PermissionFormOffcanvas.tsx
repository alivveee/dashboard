import type { RefObject } from "react";
import { Permission, PermissionAction } from "../../../shared/types/Permission.types";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";
import PermissionForm from "./PermissionForm";

interface PermissionFormOffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  permission: Permission | null;
  loading: boolean;
  onSubmit: (activeActions: PermissionAction[]) => void;
  onCancel: () => void;
}

const PermissionFormOffcanvas = ({
  offcanvasRef,
  permission,
  loading,
  onSubmit,
  onCancel,
}: PermissionFormOffcanvasProps) => (
  <Offcanvas offcanvasRef={offcanvasRef} onClose={onCancel}>
    {permission && (
      <PermissionForm
        permission={permission}
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    )}
  </Offcanvas>
);

export default PermissionFormOffcanvas;
