import { StatusOption, BaseClient } from "../types/Client.types";
import Modal from "../../../shared/components/Modal";
import ClientForm from "./ClientForm";

interface ClientFormData extends Omit<BaseClient, "id"> {
  status: string;
}

interface ClientFormModalProps<TFormData extends ClientFormData> {
  initialValues: TFormData;
  clientLabel: string;
  namePrefix: string;
  statusOptions: StatusOption[];
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: TFormData) => void;
  onCancel: () => void;
}

function ClientFormModal<TFormData extends ClientFormData>({
  initialValues,
  clientLabel,
  namePrefix,
  statusOptions,
  isEditing,
  loading,
  onSubmit,
  onCancel,
}: ClientFormModalProps<TFormData>) {
  return (
    <Modal>
      <ClientForm
        initialValues={initialValues}
        clientLabel={clientLabel}
        namePrefix={namePrefix}
        statusOptions={statusOptions}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isEditing={isEditing}
        loading={loading}
      />
    </Modal>
  );
}

export default ClientFormModal;
