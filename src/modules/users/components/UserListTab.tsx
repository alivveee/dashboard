import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import UsersTable from "./UsersTable";
import UserFormOffcanvas from "./UserFormOffcanvas";
import UserDetailOffcanvas from "./UserDetailOffcanvas";
import useUser from "../hooks/useUser";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const UserListTab = () => {
  const { isAddAllowed, isViewAllowed, isEditAllowed, isDeleteAllowed } = usePermissionFlags(
    PERMISSION_ID.USERS,
  );

  const {
    users,
    isLoading,

    selectedItem: selectedUser,

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

    detailOffcanvasRef,
    openDetail,
    closeDetail,
  } = useUser();

  return (
    <div>
      <PageHeader
        title="User List"
        action={
          isAddAllowed
            ? {
                label: "Add User",
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
        isViewAllowed={isViewAllowed}
        isEditAllowed={isEditAllowed}
        isDeleteAllowed={isDeleteAllowed}
      />

      <UserFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        initialValues={formInitialValues}
        isEditing={!!selectedUser}
        isLoading={isLoading}
        onSubmit={submitForm}
        onCancel={closeForm}
      />

      <ConfirmDeleteModal
        modalRef={deleteModalRef}
        entityName="User"
        itemName={selectedUser?.name ?? ""}
        isLoading={isLoading}
        onConfirm={confirmDelete}
        onCancel={closeDelete}
      />

      <UserDetailOffcanvas
        offcanvasRef={detailOffcanvasRef}
        user={selectedUser}
        onClose={closeDetail}
      />
    </div>
  );
};

export default UserListTab;
