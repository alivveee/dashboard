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
  const { isAddAllowed, isEditAllowed, isDeleteAllowed } = usePermissionFlags(
    PERMISSION_ID.CUSTOMER,
  );

  const {
    items: customers,
    isLoading,

    selectedItem: selectedCustomer,

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
  } = useCustomer();

  return (
    <div>
      <PageHeader
        title="Customer List"
        action={
          isAddAllowed
            ? {
                label: "Add Customer",
                icon: <IconPlus />,
                onClick: handleOpenAdd,
              }
            : undefined
        }
      />

      <ClientTable
        items={customers}
        clientLabelLower="customer"
        statusOptions={customerStatusOptions}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDelete}
        isEditAllowed={isEditAllowed}
        isDeleteAllowed={isDeleteAllowed}
      />

      <ClientFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        initialValues={formInitialValues}
        clientLabel="Customer"
        namePrefix="customer"
        statusOptions={customerStatusOptions}
        isEditing={!!selectedCustomer}
        isLoading={isLoading}
        onSubmit={handleSubmitForm}
        onCancel={handleCloseForm}
      />

      <ConfirmDeleteModal
        modalRef={deleteModalRef}
        entityName="Customer"
        itemName={selectedCustomer?.name ?? ""}
        isLoading={isLoading}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
      />
    </div>
  );
};

export default CustomerPage;
