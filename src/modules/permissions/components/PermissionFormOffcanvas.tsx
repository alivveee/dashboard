import type { RefObject } from "react";
import {
  Permission,
  PermissionAction,
} from "../../../shared/types/Permission.types";
import Offcanvas, {
  type OffcanvasHandle,
} from "../../../shared/components/Offcanvas";
import PermissionForm from "./PermissionForm";

interface PermissionFormOffcanvasActions {
  onSubmit: (activeActions: PermissionAction[]) => void;
  onCancel: () => void;
}

interface PermissionFormOffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  permission: Permission | null;
  isLoading: boolean;
  actions: PermissionFormOffcanvasActions;
}

const PermissionFormOffcanvas = ({
  offcanvasRef,
  permission,
  isLoading,
  actions,
}: PermissionFormOffcanvasProps) => (
  <Offcanvas offcanvasRef={offcanvasRef} onClose={actions.onCancel}>
    {permission ? (
      <PermissionForm
        key={permission.id}
        permission={permission}
        isLoading={isLoading}
        actions={actions}
      />
    ) : null}
  </Offcanvas>
);

export default PermissionFormOffcanvas;
