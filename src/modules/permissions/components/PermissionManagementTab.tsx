import PageHeader from "../../../shared/components/PageHeader";
import PermissionsTable from "./PermissionsTable";
import PermissionFormOffcanvas from "./PermissionFormOffcanvas";
import usePermission from "../hooks/usePermission";
import usePermissionFlags from "../../auth/hooks/usePermissionFlags";
import { PERMISSION_ID } from "../../../shared/constants/permissions";

const PermissionManagementTab = () => {
  const { canEdit } = usePermissionFlags(PERMISSION_ID.PERMISSIONS);

  const {
    permissions,
    loading,

    selectedItem,
    formOffcanvasRef,
    openEdit,
    submitForm,
    closeForm,
  } = usePermission();

  return (
    <div>
      <PageHeader title="Permission List" />

      <PermissionsTable
        permissions={permissions}
        canEdit={canEdit}
        onEdit={openEdit}
      />

      <PermissionFormOffcanvas
        offcanvasRef={formOffcanvasRef}
        permission={selectedItem}
        loading={loading}
        onSubmit={submitForm}
        onCancel={closeForm}
      />
    </div>
  );
};

export default PermissionManagementTab;
