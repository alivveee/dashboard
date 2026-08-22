import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import useProspect, {
  prospectStatusOptions,
} from "../hooks/useProspect";
import ClientTable from "../../client/components/ClientTable";
import ClientFormOffcanvas from "../../client/components/ClientFormOffcanvas";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const ProspectPage = () => {
  const { isAddAllowed, isEditAllowed, isDeleteAllowed } = usePermissionFlags(
    PERMISSION_ID.PROSPECT,
  );

  const {
    items: prospects,
    isLoading,

    selectedItem: selectedProspect,

    formInitialValues,
    formOffcanvasRef,
    openAdd,
    openEdit,
    submitForm,
    closeForm,

    deleteModalRef,
    openDelete,
    confirmDelete,
    closeDelete,
  } = useProspect();

  return (
    <div>
      <PageHeader
        title="Prospect List"
        action={
          isAddAllowed
            ? {
                label: "Add Prospect",
                icon: <IconPlus />,
                onClick: openAdd,
              }
            : undefined
        }
      />

      <ClientTable
        items={prospects}
        clientLabelLower="prospect"
        statusOptions={prospectStatusOptions}
        onEdit={openEdit}
        onDelete={openDelete}
        isEditAllowed={isEditAllowed}
        isDeleteAllowed={isDeleteAllowed}
      />

      <ClientFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        initialValues={formInitialValues}
        clientLabel="Prospect"
        namePrefix="prospect"
        statusOptions={prospectStatusOptions}
        isEditing={!!selectedProspect}
        isLoading={isLoading}
        onSubmit={submitForm}
        onCancel={closeForm}
      />

      <ConfirmDeleteModal
        modalRef={deleteModalRef}
        entityName="Prospect"
        itemName={selectedProspect?.name ?? ""}
        isLoading={isLoading}
        onConfirm={confirmDelete}
        onCancel={closeDelete}
      />
    </div>
  );
};

export default ProspectPage;
