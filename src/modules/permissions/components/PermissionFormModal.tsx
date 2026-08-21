import { Permission, PermissionAction } from "../../../shared/types/Permission.types";
import Modal from "../../../shared/components/Modal";
import PermissionForm from "./PermissionForm";

interface PermissionFormModalProps {
  permission: Permission;
  loading: boolean;
  onSubmit: (activeActions: PermissionAction[]) => void;
  onCancel: () => void;
}

const PermissionFormModal = ({
  permission,
  loading,
  onSubmit,
  onCancel,
}: PermissionFormModalProps) => (
  <Modal>
    <PermissionForm
      permission={permission}
      loading={loading}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  </Modal>
);

export default PermissionFormModal;
