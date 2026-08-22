import type { RefObject } from "react";
import { PackageOption } from "../types/Package.types";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";
import PackageForm from "./PackageForm";

interface PackageFormOffcanvasProps {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  initialValues: Omit<PackageOption, "id">;
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: Omit<PackageOption, "id">) => void;
  onCancel: () => void;
}

const PackageFormOffcanvas = ({
  offcanvasRef,
  initialValues,
  isEditing,
  loading,
  onSubmit,
  onCancel,
}: PackageFormOffcanvasProps) => {
  return (
    <Offcanvas offcanvasRef={offcanvasRef} onClose={onCancel}>
      <PackageForm
        initialValues={initialValues}
        isEditing={isEditing}
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Offcanvas>
  );
};

export default PackageFormOffcanvas;
