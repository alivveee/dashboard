import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import RolesTable from "./RolesTable";
import RoleFormOffcanvas from "./RoleFormOffcanvas";
import useRole from "../hooks/useRole";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const RoleManagementTab = () => {
  const { canAdd, canEdit, canDelete } = usePermissionFlags(
    PERMISSION_ID.ROLES,
  );

  const {
    roles,
    permissions,
    loading,

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
          canAdd
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
        canEdit={canEdit}
        canDelete={canDelete}
      />

      <RoleFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        initialValues={formInitialValues}
        permissions={permissions}
        isEditing={!!selectedItem}
        loading={loading}
        onSubmit={submitForm}
        onCancel={closeForm}
      />

      <ConfirmDeleteModal
        modalRef={deleteModalRef}
        entityName="Role"
        itemName={selectedItem?.name ?? ""}
        loading={loading}
        onConfirm={confirmDelete}
        onCancel={closeDelete}
      />
    </div>
  );
};

export default RoleManagementTab;
