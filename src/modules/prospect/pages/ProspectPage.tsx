import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import useProspect, {
  prospectStatusOptions,
} from "../hooks/useProspect";
import ClientTable from "../../client/components/ClientTable";
import ClientFormModal from "../../client/components/ClientFormModal";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const ProspectPage = () => {
  const { canAdd, canEdit, canDelete } = usePermissionFlags(
    PERMISSION_ID.PROSPECT,
  );

  const {
    items: prospects,
    loading,

    selectedItem: selectedProspect,

    formInitialValues,
    isFormOpen,
    openAdd,
    openEdit,
    submitForm,
    closeForm,

    isDeleteOpen,
    openDelete,
    confirmDelete,
    closeDelete,
  } = useProspect();

  return (
    <div>
      <PageHeader
        title="Daftar prospect"
        action={
          canAdd
            ? {
                label: "Tambah Prospect",
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
        canEdit={canEdit}
        canDelete={canDelete}
      />

      {isFormOpen && (
        <ClientFormModal
          initialValues={formInitialValues}
          clientLabel="Prospect"
          namePrefix="prospect"
          statusOptions={prospectStatusOptions}
          isEditing={!!selectedProspect}
          loading={loading}
          onSubmit={submitForm}
          onCancel={closeForm}
        />
      )}

      {isDeleteOpen && selectedProspect && (
        <ConfirmDeleteModal
          entityName="Prospect"
          itemName={selectedProspect.name}
          loading={loading}
          onConfirm={confirmDelete}
          onCancel={closeDelete}
        />
      )}
    </div>
  );
};

export default ProspectPage;
