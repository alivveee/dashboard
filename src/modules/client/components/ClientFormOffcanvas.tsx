import type { RefObject } from "react";
import { StatusOption, BaseClient } from "../types/Client.types";
import Offcanvas, { type OffcanvasHandle } from "../../../shared/components/Offcanvas";
import ClientForm from "./ClientForm";

interface ClientFormData extends Omit<BaseClient, "id"> {
  status: string;
}

interface ClientFormOffcanvasActions<TFormData> {
  onSubmit: (data: TFormData) => void;
  onCancel: () => void;
}

interface ClientFormOffcanvasProps<TFormData extends ClientFormData> {
  offcanvasRef: RefObject<OffcanvasHandle | null>;
  initialValues: TFormData;
  clientLabel: string;
  namePrefix: string;
  statusOptions: StatusOption[];
  isEditing: boolean;
  isLoading: boolean;
  actions: ClientFormOffcanvasActions<TFormData>;
}

function ClientFormOffcanvas<TFormData extends ClientFormData>({
  offcanvasRef,
  initialValues,
  clientLabel,
  namePrefix,
  statusOptions,
  isEditing,
  isLoading,
  actions,
}: ClientFormOffcanvasProps<TFormData>) {
  return (
    <Offcanvas offcanvasRef={offcanvasRef} onClose={actions.onCancel}>
      <ClientForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        clientLabel={clientLabel}
        namePrefix={namePrefix}
        statusOptions={statusOptions}
        actions={actions}
        isEditing={isEditing}
        isLoading={isLoading}
      />
    </Offcanvas>
  );
}

export default ClientFormOffcanvas;
