import { formatCurrency } from "../../../shared/helpers/format";
import {
  INITIAL_PACKAGES,
  PACKAGES_KEY,
} from "../../package/hooks/usePackage";
import useLocalStorage from "../../../shared/hooks/useLocalStorage";
import { BaseClient, StatusOption } from "../types/Client.types";
import { PackageOption } from "../../package/types/Package.types";
import DataTable from "../../../shared/components/DataTable";

interface ClientWithStatus extends BaseClient {
  status: string;
}

interface ClientTableProps<TItem extends ClientWithStatus> {
  items: TItem[];
  clientLabelLower: string;
  statusOptions: StatusOption[];
  onEdit: (item: TItem) => void;
  onDelete: (item: TItem) => void;
  canEdit: boolean;
  canDelete: boolean;
}

function ClientTable<TItem extends ClientWithStatus>({
  items,
  clientLabelLower,
  statusOptions,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}: ClientTableProps<TItem>) {
  const statusByValue = new Map(
    statusOptions.map((option) => [option.value, option]),
  );
  const [packages] = useLocalStorage<PackageOption[]>(
    PACKAGES_KEY,
    INITIAL_PACKAGES,
  );
  const packageById = new Map(packages.map((pkg) => [pkg.id, pkg]));

  return (
    <DataTable<TItem>
      items={items}
      emptyMessage={`Belum ada data ${clientLabelLower}.`}
      onEdit={onEdit}
      onDelete={onDelete}
      canEdit={canEdit}
      canDelete={canDelete}
      getItemLabel={() => clientLabelLower}
      columns={[
        { header: "Nama", key: "name", sortable: true },
        { header: "Email", key: "email", sortable: true },
        { header: "Telepon", key: "phone", sortable: true },
        {
          header: "Paket",
          sortable: true,
          sortValue: (item) => packageById.get(item.packageId)?.name ?? "",
          render: (item) => {
            const pkg = packageById.get(item.packageId);
            return pkg ? `${pkg.name} ${pkg.speed}` : "-";
          },
        },
        {
          header: "Harga",
          sortable: true,
          sortValue: (item) => packageById.get(item.packageId)?.price ?? 0,
          render: (item) => {
            const pkg = packageById.get(item.packageId);
            return pkg ? formatCurrency(pkg.price) : "-";
          },
        },
        {
          header: "Status",
          key: "status",
          sortable: true,
          render: (item) => {
            const status = statusByValue.get(item.status);
            return (
              status && (
                <span className={`badge ${status.badgeClass}`}>
                  {status.label}
                </span>
              )
            );
          },
        },
      ]}
    />
  );
}

export default ClientTable;
