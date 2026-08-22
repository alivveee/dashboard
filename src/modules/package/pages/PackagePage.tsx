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
    openAdd,
    openEdit,
    submitForm,
    closeForm,

    deleteModalRef,
    openDelete,
    confirmDelete,
    closeDelete,
  } = usePackage();

  return (
    <div>
      <PageHeader
        title="Package Management"
        action={
          isAddAllowed
            ? {
                label: "Add Package",
                icon: <IconPlus />,
                onClick: openAdd,
              }
            : undefined
        }
      />

      <PackagesTable
        packages={packages}
        onEdit={openEdit}
        onDelete={openDelete}
        isEditAllowed={isEditAllowed}
        isDeleteAllowed={isDeleteAllowed}
      />

      <PackageFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        initialValues={formInitialValues}
        isEditing={!!selectedItem}
        isLoading={isLoading}
        onSubmit={submitForm}
        onCancel={closeForm}
      />

      <ConfirmDeleteModal
        modalRef={deleteModalRef}
        entityName="Package"
        itemName={selectedItem?.name ?? ""}
        isLoading={isLoading}
        onConfirm={confirmDelete}
        onCancel={closeDelete}
      />
    </div>
  );
};

export default PackagePage;
