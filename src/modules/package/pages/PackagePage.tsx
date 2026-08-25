import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import PackagesTable from "../components/PackagesTable";
import PackageFormOffcanvas from "../components/PackageFormOffcanvas";
import usePackage from "../hooks/usePackage";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const PackagePage = () => {
  const { isAddAllowed, isEditAllowed, isDeleteAllowed } = usePermissionFlags(
    PERMISSION_ID.PACKAGE,
  );

  const {
    packages,
    isLoading,

    selectedItem,

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
  } = usePackage();

  return (
    <>
      <PageHeader
        title="Package Management"
        action={
          isAddAllowed
            ? {
                label: "Add Package",
                icon: <IconPlus />,
                onClick: handleOpenAdd,
              }
            : undefined
        }
      />

      <PackagesTable
        packages={packages}
        actions={{ onEdit: handleOpenEdit, onDelete: handleOpenDelete }}
        isEditAllowed={isEditAllowed}
        isDeleteAllowed={isDeleteAllowed}
      />

      <PackageFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        initialValues={formInitialValues}
        isEditing={!!selectedItem}
        isLoading={isLoading}
        actions={{ onSubmit: handleSubmitForm, onCancel: handleCloseForm }}
      />

      <ConfirmDeleteModal
        modalRef={deleteModalRef}
        entityName="Package"
        itemName={selectedItem?.name ?? ""}
        isLoading={isLoading}
        actions={{ onConfirm: handleConfirmDelete, onCancel: handleCloseDelete }}
      />
    </>
  );
};

export default PackagePage;
