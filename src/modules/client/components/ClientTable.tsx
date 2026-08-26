import { formatCurrency } from "../../../shared/helpers/format";
import { INITIAL_PACKAGES, PACKAGES_KEY } from "../../package/hooks/usePackage";
import useLocalStorage from "../../../shared/hooks/useLocalStorage";
import { BaseClient, StatusOption } from "../types/Client.types";
import { PackageOption } from "../../package/types/Package.types";
import TableShell from "../../../shared/components/TableShell";
import TableRowActions from "../../../shared/components/TableRowActions";

interface ClientWithStatus extends BaseClient {
  status: string;
}

interface ClientTableActions<TItem> {
  onEdit: (item: TItem) => void;
  onDelete: (item: TItem) => void;
}

interface ClientTableProps<TItem extends ClientWithStatus> {
  items: TItem[];
  clientLabelLower: string;
  statusOptions: StatusOption[];
  actions: ClientTableActions<TItem>;
  isEditAllowed: boolean;
  isDeleteAllowed: boolean;
}

function ClientTable<TItem extends ClientWithStatus>({
  items,
  clientLabelLower,
  statusOptions,
  actions,
  isEditAllowed,
  isDeleteAllowed,
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
    <TableShell
      emptyMessage={`No ${clientLabelLower} data yet.`}
      searchPlaceholder="Search by name..."
      headers={[
        "#",
        { content: "Personal Data", isSortable: true, isSearchable: true },
        { content: "Package", isSortable: true },
        { content: "Status", isSortable: true },
        { className: "text-end", content: "Actions" },
      ]}
      rows={items.map((item, index) => {
        const pkg = packageById.get(item.packageId);
        const status = statusByValue.get(item.status);

        return [
          index + 1,
          {
            sortValue: item.name,
            content: (
              <>
                <div>{item.name}</div>

                <a
                  href={`mailto:${item.email}`}
                  className="text-muted small contact-link d-block"
                >
                  {item.email}
                </a>

                <a
                  href={`tel:${item.phone}`}
                  className="text-muted small contact-link d-block"
                >
                  {item.phone}
                </a>
              </>
            ),
          },
          {
            sortValue: pkg ? `${pkg.name}` : "",
            content: (
              <>
                <div>{pkg ? `${pkg.name} ${pkg.speed}` : "-"}</div>
                {pkg ? (
                  <div className="text-muted small">
                    {formatCurrency(pkg.price)}
                  </div>
                ) : null}
              </>
            ),
          },
          {
            sortValue: status?.label ?? "",
            content: status ? (
              <span className={`badge ${status.badgeClass}`}>
                {status.label}
              </span>
            ) : null,
          },
          {
            className: "text-end",
            content: (
              <TableRowActions
                item={item}
                actions={actions}
                isEditAllowed={isEditAllowed}
                isDeleteAllowed={isDeleteAllowed}
                label={clientLabelLower}
              />
            ),
          },
        ];
      })}
    />
  );
}

export default ClientTable;
