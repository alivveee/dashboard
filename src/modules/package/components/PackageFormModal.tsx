import { PackageOption } from "../types/Package.types";
import Modal from "../../../shared/components/Modal";
import PackageForm from "./PackageForm";

interface PackageFormModalProps {
  initialValues: Omit<PackageOption, "id">;
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: Omit<PackageOption, "id">) => void;
  onCancel: () => void;
}

const PackageFormModal = ({
  initialValues,
  isEditing,
  loading,
  onSubmit,
  onCancel,
}: PackageFormModalProps) => {
  return (
    <Modal>
      <PackageForm
        initialValues={initialValues}
        isEditing={isEditing}
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Modal>
  );
};

export default PackageFormModal;
