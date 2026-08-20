import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import RolesTable from "./RolesTable";
import RoleFormModal from "./RoleFormModal";
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
    isFormOpen,
    openAdd,
    openEdit,
    submitForm,
    closeForm,

    isDeleteOpen,
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

      {isFormOpen && (
        <RoleFormModal
          initialValues={formInitialValues}
          permissions={permissions}
          isEditing={!!selectedItem}
          loading={loading}
          onSubmit={submitForm}
          onCancel={closeForm}
        />
      )}

      {isDeleteOpen && selectedItem && (
        <ConfirmDeleteModal
          entityName="Role"
          itemName={selectedItem.name}
          loading={loading}
          onConfirm={confirmDelete}
          onCancel={closeDelete}
        />
      )}
    </div>
  );
};

export default RoleManagementTab;
