import PageHeader from "../../../shared/components/PageHeader";
import PermissionsTable from "./PermissionsTable";
import PermissionFormOffcanvas from "./PermissionFormOffcanvas";
import usePermission from "../hooks/usePermission";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const PermissionManagementTab = () => {
  const { __isEditAllowed } = usePermissionFlags(PERMISSION_ID.PERMISSIONS);

  const {
    __permissions,
    __isLoading,

    __selectedItem,
    __formOffcanvasRef,
    __handleOpenEdit,
    __handleSubmitForm,
    __handleCloseForm,
  } = usePermission();

  return (
    <>
      <PageHeader title="Permission List" />

      <PermissionsTable
        permissions={__permissions}
        isEditAllowed={__isEditAllowed}
        onEdit={__handleOpenEdit}
      />

      <PermissionFormOffcanvas
        offcanvasRef={__formOffcanvasRef}
        permission={__selectedItem}
        isLoading={__isLoading}
        actions={{ onSubmit: __handleSubmitForm, onCancel: __handleCloseForm }}
      />
    </>
  );
};

export default PermissionManagementTab;
