import TableShell, {
  TableShellSearch,
} from "../../../shared/components/TableShell";
import { ProductVariantMarketing } from "../types/Product.types";
import TableRowProductMarketing from "./TableRowProductMarketing";

interface ProductMarketingTableProps {
  items: ProductVariantMarketing[];
  isLoading: boolean;
  search: TableShellSearch;
}

const ProductMarketingTable = ({
  items,
  isLoading,
  search,
}: ProductMarketingTableProps) => (
  <TableShell
    emptyMessage="No product marketing data yet."
    isLoading={isLoading}
    isPaginationHidden
    rows={items}
    search={search}
    searchPlaceholder="Search product marketing..."
    headers={[
      "Variant",
      "Product",
      "Pricing",
      "Branches",
    ].map((content) => ({ content, className: "py-3" }))}
  >
    {(pagedItems) =>
      pagedItems.map((item) => (
        <TableRowProductMarketing key={item.id} item={item} />
      ))
    }
  </TableShell>
);

export default ProductMarketingTable;
