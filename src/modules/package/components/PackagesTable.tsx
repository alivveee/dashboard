import { PackageOption } from "../types/Package.types";
import { formatCurrency } from "../../../shared/helpers/format";
import TableShell from "../../../shared/components/TableShell";
import TableRowActions from "../../../shared/components/TableRowActions";

interface PackagesTableProps {
  packages: PackageOption[];
  onEdit: (item: PackageOption) => void;
  onDelete: (item: PackageOption) => void;
  isEditAllowed: boolean;
  isDeleteAllowed: boolean;
}

const PackagesTable = ({
  packages,
  onEdit,
  onDelete,
  isEditAllowed,
  isDeleteAllowed,
}: PackagesTableProps) => (
  <TableShell
    emptyMessage="No package data yet."
    headers={[
      "#",
      { content: "Package Name", isSortable: true },
      { content: "Speed", isSortable: true },
      { content: "Price/Month", isSortable: true },
      { className: "text-end", content: "Actions" },
    ]}
    rows={packages.map((item, index) => [
      index + 1,
      item.name,
      item.speed,
      { sortValue: item.price, content: formatCurrency(item.price) },
      {
        className: "text-end",
        content: (
          <TableRowActions
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            isEditAllowed={isEditAllowed}
            isDeleteAllowed={isDeleteAllowed}
            label={item.name}
          />
        ),
      },
    ])}
  />
);

export default PackagesTable;
