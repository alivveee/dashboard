import { Role } from "../types/Role.types";
import { Permission } from "../../../shared/types/Permission.types";
import Modal from "../../../shared/components/Modal";
import RoleForm from "./RoleForm";

interface RoleFormModalProps {
  initialValues: Omit<Role, "id">;
  permissions: Permission[];
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: Omit<Role, "id">) => void;
  onCancel: () => void;
}

const RoleFormModal = ({
  initialValues,
  permissions,
  isEditing,
  loading,
  onSubmit,
  onCancel,
}: RoleFormModalProps) => {
  return (
    <Modal>
      <RoleForm
        initialValues={initialValues}
        permissions={permissions}
        isEditing={isEditing}
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default RoleFormModal;
