import type { RefObject } from "react";
import { PackageOption } from "../types/Package.types";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";
import PackageForm from "./PackageForm";

interface PackageFormOffcanvasActions {
  onSubmit: (data: Omit<PackageOption, "id">) => void;
  onCancel: () => void;
}

interface PackageFormOffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  initialValues: Omit<PackageOption, "id">;
  isEditing: boolean;
  isLoading: boolean;
  actions: PackageFormOffcanvasActions;
}

const PackageFormOffcanvas = ({
  offcanvasRef,
  initialValues,
  isEditing,
  isLoading,
  actions,
}: PackageFormOffcanvasProps) => {
  return (
    <Offcanvas offcanvasRef={offcanvasRef} onClose={actions.onCancel}>
      <PackageForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        isEditing={isEditing}
        isLoading={isLoading}
        actions={actions}
      />
    </Offcanvas>
  );
};

export default PackageFormOffcanvas;
