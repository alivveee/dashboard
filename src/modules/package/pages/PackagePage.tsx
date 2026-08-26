import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import PackagesTable from "../components/PackagesTable";
import PackageFormOffcanvas from "../components/PackageFormOffcanvas";
import usePackage from "../hooks/usePackage";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const PackagePage = () => {
  const { __isAddAllowed, __isEditAllowed, __isDeleteAllowed } =
    usePermissionFlags(PERMISSION_ID.PACKAGE);

  const {
    __packages,
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
  } = usePackage();

  return (
    <>
      <PageHeader
        title="Package Management"
        action={
          __isAddAllowed
            ? {
                label: "Add Package",
                icon: <IconPlus />,
                onClick: __handleOpenAdd,
              }
            : undefined
        }
      />

      <PackagesTable
        packages={__packages}
        actions={{ onEdit: __handleOpenEdit, onDelete: __handleOpenDelete }}
        isEditAllowed={__isEditAllowed}
        isDeleteAllowed={__isDeleteAllowed}
      />

      <PackageFormOffcanvas
        offcanvasRef={__formOffcanvasRef}
        initialValues={__formInitialValues}
        isEditing={!!__selectedItem}
        isLoading={__isLoading}
        actions={{ onSubmit: __handleSubmitForm, onCancel: __handleCloseForm }}
      />

      <ConfirmDeleteModal
        modalRef={__deleteModalRef}
        entityName="Package"
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

export default PackagePage;
