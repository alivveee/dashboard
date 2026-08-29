import TableShell from "../../../shared/components/TableShell";
import { PaginationState } from "../../../shared/types/Pagination.types";
import { IconFilter } from "../../../shared/components/icons/Icons";
import { ProductVariantMarketing } from "../types/Product.types";
import TableRowProductMarketing from "./TableRowProductMarketing";
import { TableShellSearch } from "../../../shared/components/TableShell/types";

interface ProductMarketingTableFilter {
  activeCount: number;
  hasActive: boolean;
  onOpen: () => void;
  onReset: () => void;
}

interface ProductMarketingTableProps {
  items: ProductVariantMarketing[];
  isLoading: boolean;
  search: TableShellSearch;
  filter: ProductMarketingTableFilter;
  pagination: PaginationState;
}

const ProductMarketingTable = ({
  items,
  isLoading,
  search,
  filter,
  pagination,
}: ProductMarketingTableProps) => (
  <TableShell
    emptyMessage="No product marketing data yet."
    isLoading={isLoading}
    rows={items}
    pagination={pagination}
    search={search}
    searchPlaceholder="Search product marketing..."
    advanceSearch={
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-sm btn-light d-flex align-items-center gap-1"
          onClick={filter.onOpen}
          aria-label="Advanced search"
        >
          <IconFilter />

          {filter.activeCount > 0 ? (
            <span className="badge rounded-pill text-bg-primary mb-2">
              {filter.activeCount}
            </span>
          ) : null}
        </button>

        {filter.hasActive ? (
          <button
            type="button"
            className="btn btn-sm btn-light p-1"
            onClick={filter.onReset}
          >
            Reset
          </button>
        ) : null}
      </div>
    }
    headers={["Variant", "Product", "Pricing", "Branches"].map((content) => ({
      content,
      className: "py-3",
    }))}
  >
    {(pagedItems) =>
      pagedItems.map((item) => (
        <TableRowProductMarketing key={item.id} item={item} />
      ))
    }
  </TableShell>
);

export default ProductMarketingTable;
