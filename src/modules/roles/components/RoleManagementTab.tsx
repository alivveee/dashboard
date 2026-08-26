import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import RolesTable from "./RolesTable";
import RoleFormOffcanvas from "./RoleFormOffcanvas";
import useRole from "../hooks/useRole";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const RoleManagementTab = () => {
  const { __isAddAllowed, __isEditAllowed, __isDeleteAllowed } =
    usePermissionFlags(PERMISSION_ID.ROLES);

  const {
    __roles,
    __permissions,
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
  } = useRole();

  return (
    <>
      <PageHeader
        title="Role List"
        action={
          __isAddAllowed
            ? {
                label: "Add Role",
                icon: <IconPlus />,
                onClick: __handleOpenAdd,
              }
            : undefined
        }
      />

      <RolesTable
        roles={__roles}
        actions={{ onEdit: __handleOpenEdit, onDelete: __handleOpenDelete }}
        isEditAllowed={__isEditAllowed}
        isDeleteAllowed={__isDeleteAllowed}
      />

      <RoleFormOffcanvas
        offcanvasRef={__formOffcanvasRef}
        initialValues={__formInitialValues}
        permissions={__permissions}
        isEditing={!!__selectedItem}
        isLoading={__isLoading}
        actions={{ onSubmit: __handleSubmitForm, onCancel: __handleCloseForm }}
      />

      <ConfirmDeleteModal
        modalRef={__deleteModalRef}
        entityName="Role"
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

export default RoleManagementTab;
