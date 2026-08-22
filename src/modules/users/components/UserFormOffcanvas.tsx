import type { RefObject } from "react";
import { User } from "../types/User.types";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";
import UserForm from "./UserForm";

interface UserFormOffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  initialValues: Omit<User, "id">;
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: Omit<User, "id">) => void;
  onCancel: () => void;
}

const UserFormOffcanvas = ({
  offcanvasRef,
  initialValues,
  isEditing,
  loading,
  onSubmit,
  onCancel,
}: UserFormOffcanvasProps) => {
  return (
    <Offcanvas offcanvasRef={offcanvasRef} onClose={onCancel}>
      <UserForm
        initialValues={initialValues}
        isEditing={isEditing}
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Offcanvas>
  );
};

export default UserFormOffcanvas;
