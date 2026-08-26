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
  const {
    __isAddAllowed,
    __isViewAllowed,
    __isEditAllowed,
    __isDeleteAllowed,
  } = usePermissionFlags(PERMISSION_ID.USERS);

  const {
    __users,
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

    __detailOffcanvasRef,
    __handleOpenDetail,
    __handleCloseDetail,
  } = useUser();

  return (
    <>
      <PageHeader
        title="User List"
        action={
          __isAddAllowed
            ? {
                label: "Add User",
                icon: <IconPlus />,
                onClick: __handleOpenAdd,
              }
            : undefined
        }
      />

      <UsersTable
        users={__users}
        actions={{
          onView: __handleOpenDetail,
          onEdit: __handleOpenEdit,
          onDelete: __handleOpenDelete,
        }}
        isViewAllowed={__isViewAllowed}
        isEditAllowed={__isEditAllowed}
        isDeleteAllowed={__isDeleteAllowed}
      />

      <UserFormOffcanvas
        offcanvasRef={__formOffcanvasRef}
        initialValues={__formInitialValues}
        isEditing={!!__selectedItem}
        isLoading={__isLoading}
        actions={{ onSubmit: __handleSubmitForm, onCancel: __handleCloseForm }}
      />

      <ConfirmDeleteModal
        modalRef={__deleteModalRef}
        entityName="User"
        itemName={__selectedItem?.name ?? ""}
        isLoading={__isLoading}
        actions={{
          onConfirm: __handleConfirmDelete,
          onCancel: __handleCloseDelete,
        }}
      />

      <UserDetailOffcanvas
        offcanvasRef={__detailOffcanvasRef}
        user={__selectedItem}
        onClose={__handleCloseDetail}
      />
    </>
  );
};

export default UserListTab;
