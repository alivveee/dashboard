import PageHeader from "../../../shared/components/PageHeader";
import PermissionsTable from "./PermissionsTable";
import PermissionFormOffcanvas from "./PermissionFormOffcanvas";
import usePermission from "../hooks/usePermission";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const PermissionManagementTab = () => {
  const { isEditAllowed } = usePermissionFlags(PERMISSION_ID.PERMISSIONS);

  const {
    permissions,
    isLoading,

    selectedItem,
    formOffcanvasRef,
    handleOpenEdit,
    handleSubmitForm,
    handleCloseForm,
  } = usePermission();

  return (
    <>
      <PageHeader title="Permission List" />

      <PermissionsTable
        permissions={permissions}
        isEditAllowed={isEditAllowed}
        onEdit={handleOpenEdit}
      />

      <PermissionFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        permission={selectedItem}
        isLoading={isLoading}
        onSubmit={handleSubmitForm}
        onCancel={handleCloseForm}
      />
    </>
  );
};

export default PermissionManagementTab;
