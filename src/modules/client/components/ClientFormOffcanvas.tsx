import type { RefObject } from "react";
import { StatusOption, BaseClient } from "../types/Client.types";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";
import ClientForm from "./ClientForm";

interface ClientFormData extends Omit<BaseClient, "id"> {
  status: string;
}

interface ClientFormOffcanvasProps<TFormData extends ClientFormData> {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  initialValues: TFormData;
  clientLabel: string;
  namePrefix: string;
  statusOptions: StatusOption[];
  isEditing: boolean;
  loading: boolean;
  onSubmit: (data: TFormData) => void;
  onCancel: () => void;
}

function ClientFormOffcanvas<TFormData extends ClientFormData>({
  offcanvasRef,
  initialValues,
  clientLabel,
  namePrefix,
  statusOptions,
  isEditing,
  loading,
  onSubmit,
  onCancel,
}: ClientFormOffcanvasProps<TFormData>) {
  return (
    <Offcanvas offcanvasRef={offcanvasRef} onClose={onCancel}>
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
    </Offcanvas>
  );
}

export default ClientFormOffcanvas;
