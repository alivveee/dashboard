import type { RefObject } from "react";
import { User } from "../types/User.types";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";
import UserForm from "./UserForm";

interface UserFormOffcanvasActions {
  onSubmit: (data: Omit<User, "id">) => void;
  onCancel: () => void;
}

interface UserFormOffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  initialValues: Omit<User, "id">;
  isEditing: boolean;
  isLoading: boolean;
  actions: UserFormOffcanvasActions;
}

const UserFormOffcanvas = ({
  offcanvasRef,
  initialValues,
  isEditing,
  isLoading,
  actions,
}: UserFormOffcanvasProps) => {
  return (
    <Offcanvas offcanvasRef={offcanvasRef} onClose={actions.onCancel}>
      <UserForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        isEditing={isEditing}
        isLoading={isLoading}
        actions={actions}
      />
    </Offcanvas>
  );
};

export default UserFormOffcanvas;
