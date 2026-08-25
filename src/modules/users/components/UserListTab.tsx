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
    handleOpenAdd,
    handleOpenEdit,
    handleSubmitForm,
    handleCloseForm,

    deleteModalRef,
    handleOpenDelete,
    handleConfirmDelete,
    handleCloseDelete,

    detailOffcanvasRef,
    handleOpenDetail,
    handleCloseDetail,
  } = useUser();

  return (
    <>
      <PageHeader
        title="User List"
        action={
          isAddAllowed
            ? {
                label: "Add User",
                icon: <IconPlus />,
                onClick: handleOpenAdd,
              }
            : undefined
        }
      />

      <UsersTable
        users={users}
        onView={handleOpenDetail}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        isViewAllowed={isViewAllowed}
        isEditAllowed={isEditAllowed}
        isDeleteAllowed={isDeleteAllowed}
      />

      <UserFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        initialValues={formInitialValues}
        isEditing={!!selectedUser}
        isLoading={isLoading}
        onSubmit={handleSubmitForm}
        onCancel={handleCloseForm}
      />

      <ConfirmDeleteModal
        modalRef={deleteModalRef}
        entityName="User"
        itemName={selectedUser?.name ?? ""}
        isLoading={isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
      />

      <UserDetailOffcanvas
        offcanvasRef={detailOffcanvasRef}
        user={selectedUser}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default UserListTab;
