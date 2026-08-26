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
  const { __isAddAllowed, __isEditAllowed, __isDeleteAllowed } =
    usePermissionFlags(PERMISSION_ID.CUSTOMER);

  const {
    __items,
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
  } = useCustomer();

  return (
    <>
      <PageHeader
        title="Customer List"
        action={
          __isAddAllowed
            ? {
                label: "Add Customer",
                icon: <IconPlus />,
                onClick: __handleOpenAdd,
              }
            : undefined
        }
      />

      <ClientTable
        items={__items}
        clientLabelLower="customer"
        statusOptions={customerStatusOptions}
        actions={{ onEdit: __handleOpenEdit, onDelete: __handleOpenDelete }}
        isEditAllowed={__isEditAllowed}
        isDeleteAllowed={__isDeleteAllowed}
      />

      <ClientFormOffcanvas
        offcanvasRef={__formOffcanvasRef}
        initialValues={__formInitialValues}
        clientLabel="Customer"
        namePrefix="customer"
        statusOptions={customerStatusOptions}
        isEditing={!!__selectedItem}
        isLoading={__isLoading}
        actions={{ onSubmit: __handleSubmitForm, onCancel: __handleCloseForm }}
      />

      <ConfirmDeleteModal
        modalRef={__deleteModalRef}
        entityName="Customer"
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

export default CustomerPage;
