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
    handleOpenAdd,
    handleOpenEdit,
    handleSubmitForm,
    handleCloseForm,

    deleteModalRef,
    handleOpenDelete,
    handleConfirmDelete,
    handleCloseDelete,
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
                onClick: handleOpenAdd,
              }
            : undefined
        }
      />

      <ClientTable
        items={prospects}
        clientLabelLower="prospect"
        statusOptions={prospectStatusOptions}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
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
        onSubmit={handleSubmitForm}
        onCancel={handleCloseForm}
      />

      <ConfirmDeleteModal
        modalRef={deleteModalRef}
        entityName="Prospect"
        itemName={selectedProspect?.name ?? ""}
        isLoading={isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
      />
    </div>
  );
};

export default ProspectPage;
