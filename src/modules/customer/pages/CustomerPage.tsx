import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import useCustomer, {
  customerStatusOptions,
} from "../hooks/useCustomer";
import ClientTable from "../../client/components/ClientTable";
import ClientFormModal from "../../client/components/ClientFormModal";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const CustomerPage = () => {
  const { canAdd, canEdit, canDelete } = usePermissionFlags(
    PERMISSION_ID.CUSTOMER,
  );

  const {
    items: customers,
    loading,

    selectedItem: selectedCustomer,

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
  } = useCustomer();

  return (
    <div>
      <PageHeader
        title="Daftar customer"
        action={
          canAdd
            ? {
                label: "Tambah Customer",
                icon: <IconPlus />,
                onClick: openAdd,
              }
            : undefined
        }
      />

      <ClientTable
        items={customers}
        clientLabelLower="customer"
        statusOptions={customerStatusOptions}
        onEdit={openEdit}
        onDelete={openDelete}
        canEdit={canEdit}
        canDelete={canDelete}
      />

      {isFormOpen && (
        <ClientFormModal
          initialValues={formInitialValues}
          clientLabel="Customer"
          namePrefix="customer"
          statusOptions={customerStatusOptions}
          isEditing={!!selectedCustomer}
          loading={loading}
          onSubmit={submitForm}
          onCancel={closeForm}
        />
      )}

      {isDeleteOpen && selectedCustomer && (
        <ConfirmDeleteModal
          entityName="Customer"
          itemName={selectedCustomer.name}
          loading={loading}
          onConfirm={confirmDelete}
          onCancel={closeDelete}
        />
      )}
    </div>
  );
};

export default CustomerPage;
