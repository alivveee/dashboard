import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import UsersTable from "./UsersTable";
import UserFormModal from "./UserFormModal";
import UserDetailModal from "./UserDetailModal";
import useUser from "../hooks/useUser";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const UserListTab = () => {
  const { canAdd, canView, canEdit, canDelete } = usePermissionFlags(
    PERMISSION_ID.USERS,
  );

  const {
    users,
    loading,

    selectedItem: selectedUser,

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

    isDetailOpen,
    openDetail,
    closeDetail,
  } = useUser();

  return (
    <div>
      <PageHeader
        title="Daftar user"
        action={
          canAdd
            ? {
                label: "Tambah User",
                icon: <IconPlus />,
                onClick: openAdd,
              }
            : undefined
        }
      />

      <UsersTable
        users={users}
        onView={openDetail}
        onEdit={openEdit}
        onDelete={openDelete}
        canView={canView}
        canEdit={canEdit}
        canDelete={canDelete}
      />

      {isFormOpen && (
        <UserFormModal
          initialValues={formInitialValues}
          isEditing={!!selectedUser}
          loading={loading}
          onSubmit={submitForm}
          onCancel={closeForm}
        />
      )}

      {isDeleteOpen && selectedUser && (
        <ConfirmDeleteModal
          entityName="User"
          itemName={selectedUser.name}
          loading={loading}
          onConfirm={confirmDelete}
          onCancel={closeDelete}
        />
      )}

      {isDetailOpen && selectedUser && (
        <UserDetailModal user={selectedUser} onClose={closeDetail} />
      )}
    </div>
  );
};

export default UserListTab;
