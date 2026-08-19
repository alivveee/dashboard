import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import PackagesTable from "../components/PackagesTable";
import PackageFormModal from "../components/PackageFormModal";
import usePackage from "../hooks/usePackage";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const PackagePage = () => {
  const { canAdd, canEdit, canDelete } = usePermissionFlags(
    PERMISSION_ID.PACKAGE,
  );

  const {
    packages,
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
  } = usePackage();

  return (
    <div>
      <PageHeader
        title="Manajemen paket"
        action={
          canAdd
            ? {
                label: "Tambah Paket",
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
        canEdit={canEdit}
        canDelete={canDelete}
      />

      {isFormOpen && (
        <PackageFormModal
          initialValues={formInitialValues}
          isEditing={!!selectedItem}
          loading={loading}
          onSubmit={submitForm}
          onCancel={closeForm}
        />
      )}

      {isDeleteOpen && selectedItem && (
        <ConfirmDeleteModal
          entityName="Paket"
          itemName={selectedItem.name}
          loading={loading}
          onConfirm={confirmDelete}
          onCancel={closeDelete}
        />
      )}
    </div>
  );
};

export default PackagePage;
