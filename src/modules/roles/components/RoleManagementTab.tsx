import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import RolesTable from "./RolesTable";
import RoleFormOffcanvas from "./RoleFormOffcanvas";
import useRole from "../hooks/useRole";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const RoleManagementTab = () => {
  const { isAddAllowed, isEditAllowed, isDeleteAllowed } = usePermissionFlags(
    PERMISSION_ID.ROLES,
  );

  const {
    roles,
    permissions,
    isLoading,

    selectedItem,

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
  } = useRole();

  return (
    <div>
      <PageHeader
        title="Role List"
        action={
          isAddAllowed
            ? {
                label: "Add Role",
                icon: <IconPlus />,
                onClick: openAdd,
              }
            : undefined
        }
      />

      <RolesTable
        roles={roles}
        onEdit={openEdit}
        onDelete={openDelete}
        isEditAllowed={isEditAllowed}
        isDeleteAllowed={isDeleteAllowed}
      />

      <RoleFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        initialValues={formInitialValues}
        permissions={permissions}
        isEditing={!!selectedItem}
        isLoading={isLoading}
        onSubmit={submitForm}
        onCancel={closeForm}
      />

      <ConfirmDeleteModal
        modalRef={deleteModalRef}
        entityName="Role"
        itemName={selectedItem?.name ?? ""}
        isLoading={isLoading}
        onConfirm={confirmDelete}
        onCancel={closeDelete}
      />
    </div>
  );
};

export default RoleManagementTab;
