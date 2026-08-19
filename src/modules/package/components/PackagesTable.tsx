import { PackageOption } from "../types/Package.types";
import { formatCurrency } from "../../../shared/helpers/format";
import DataTable from "../../../shared/components/DataTable";

interface PackagesTableProps {
  packages: PackageOption[];
  onEdit: (item: PackageOption) => void;
  onDelete: (item: PackageOption) => void;
  canEdit: boolean;
  canDelete: boolean;
}

const PackagesTable = ({
  packages,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}: PackagesTableProps) => (
  <DataTable
    items={packages}
    emptyMessage="Belum ada data paket."
    onEdit={onEdit}
    onDelete={onDelete}
    canEdit={canEdit}
    canDelete={canDelete}
    getItemLabel={(item) => item.name}
    columns={[
      { header: "Nama Paket", render: (item) => item.name },
      { header: "Kecepatan", render: (item) => item.speed },
      {
        header: "Harga/Bulan",
        render: (item) => formatCurrency(item.price),
      },
    ]}
  />
);

export default PackagesTable;
