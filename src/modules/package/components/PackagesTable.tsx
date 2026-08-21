import { PackageOption } from "../types/Package.types";
import { formatCurrency } from "../../../shared/helpers/format";
import TableShell from "../../../shared/components/TableShell";
import TableRowActions from "../../../shared/components/TableRowActions";

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
  <TableShell
    emptyMessage="No package data yet."
    headers={[
      "#",
      "Package Name",
      "Speed",
      "Price/Month",
      { className: "text-end", content: "Actions" },
    ]}
    rows={packages.map((item, index) => [
      index + 1,
      item.name,
      item.speed,
      formatCurrency(item.price),
      {
        className: "text-end",
        content: (
          <TableRowActions
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            canEdit={canEdit}
            canDelete={canDelete}
            label={item.name}
          />
        ),
      },
    ])}
  />
);

export default PackagesTable;
