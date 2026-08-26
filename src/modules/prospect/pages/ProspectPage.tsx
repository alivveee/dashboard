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
  const { __isAddAllowed, __isEditAllowed, __isDeleteAllowed } =
    usePermissionFlags(PERMISSION_ID.PROSPECT);

  const {
    __items,
    __isLoading,

    __selectedItem,

    __formInitialValues,
    __formOffcanvasRef,
    __handleOpenAdd,
    __handleOpenEdit,
    __handleSubmitForm,
    __handleCloseForm,

    __deleteModalRef,
    __handleOpenDelete,
    __handleConfirmDelete,
    __handleCloseDelete,
  } = useProspect();

  return (
    <>
      <PageHeader
        title="Prospect List"
        action={
          __isAddAllowed
            ? {
                label: "Add Prospect",
                icon: <IconPlus />,
                onClick: __handleOpenAdd,
              }
            : undefined
        }
      />

      <ClientTable
        items={__items}
        clientLabelLower="prospect"
        statusOptions={prospectStatusOptions}
        actions={{ onEdit: __handleOpenEdit, onDelete: __handleOpenDelete }}
        isEditAllowed={__isEditAllowed}
        isDeleteAllowed={__isDeleteAllowed}
      />

      <ClientFormOffcanvas
        offcanvasRef={__formOffcanvasRef}
        initialValues={__formInitialValues}
        clientLabel="Prospect"
        namePrefix="prospect"
        statusOptions={prospectStatusOptions}
        isEditing={!!__selectedItem}
        isLoading={__isLoading}
        actions={{ onSubmit: __handleSubmitForm, onCancel: __handleCloseForm }}
      />

      <ConfirmDeleteModal
        modalRef={__deleteModalRef}
        entityName="Prospect"
        itemName={__selectedItem?.name ?? ""}
        isLoading={__isLoading}
        actions={{
          onConfirm: __handleConfirmDelete,
          onCancel: __handleCloseDelete,
        }}
      />
    </>
  );
};

export default ProspectPage;
