import { User } from "../types/User.types";
import Modal from "../../../shared/components/Modal";
import UserForm from "./UserForm";

interface UserFormModalProps {
  initialValues: Omit<User, "id">;
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: Omit<User, "id">) => void;
  onCancel: () => void;
}

const UserFormModal = ({
  initialValues,
  isEditing,
  loading,
  onSubmit,
  onCancel,
}: UserFormModalProps) => {
  return (
    <Modal>
      <UserForm
        initialValues={initialValues}
        isEditing={isEditing}
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default UserFormModal;
