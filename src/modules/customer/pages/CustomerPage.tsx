import { IconPlus } from "../../../shared/components/icons/Icons";
import PageHeader from "../../../shared/components/PageHeader";
import ConfirmDeleteModal from "../../../shared/components/ConfirmDeleteModal";
import useCustomer, {
  customerStatusOptions,
} from "../hooks/useCustomer";
import ClientTable from "../../client/components/ClientTable";
import ClientFormOffcanvas from "../../client/components/ClientFormOffcanvas";
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
    formOffcanvasRef,
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
        title="Customer List"
        action={
          canAdd
            ? {
                label: "Add Customer",
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

      <ClientFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        initialValues={formInitialValues}
        clientLabel="Customer"
        namePrefix="customer"
        statusOptions={customerStatusOptions}
        isEditing={!!selectedCustomer}
        loading={loading}
        onSubmit={submitForm}
        onCancel={closeForm}
      />

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
