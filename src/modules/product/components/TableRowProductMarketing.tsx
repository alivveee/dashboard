import { Fragment, ReactNode } from "react";
import { formatCurrency, formatPercent } from "../../../shared/helpers/format";
import CopyableText from "../../../shared/components/CopyableText";
import { ProductVariantMarketing } from "../types/Product.types";

const CELL_CLASS = "align-top py-3";
const CODE_CLASS = "small text-muted";

interface DetailLineProps {
  label: string;
  value: ReactNode;
}

const DetailLine = ({ label, value }: DetailLineProps) => (
  <div className="small lh-lg">
    <span className="text-muted">{label}:</span> {value}
  </div>
);

interface FeeGridProps {
  rows: { label: string; value: ReactNode }[];
}

// A definition list keeps every amount on the same vertical line, so fees can be
// compared down the column instead of being re-read label by label.
const FeeGrid = ({ rows }: FeeGridProps) => (
  <dl className="row g-0 small mb-0">
    {rows.map((row) => (
      <Fragment key={row.label}>
        <dt className="col-5 fw-normal text-muted">{row.label}</dt>
        <dd className="col-7 mb-0">{row.value}</dd>
      </Fragment>
    ))}
  </dl>
);

interface StatusBadgeProps {
  isOn: boolean;
  onLabel: string;
  offLabel: string;
  onClassName: string;
  isSubdued?: boolean;
}

const StatusBadge = ({
  isOn,
  onLabel,
  offLabel,
  onClassName,
  isSubdued = false,
}: StatusBadgeProps) => (
  <span
    className={
      isSubdued
        ? `badge rounded-pill fw-normal border ${isOn ? onClassName : "text-secondary"}`
        : `badge ${isOn ? onClassName : "text-bg-secondary"}`
    }
  >
    {isOn ? onLabel : offLabel}
  </span>
);

interface TableRowProductMarketingProps {
  item: ProductVariantMarketing;
}

const TableRowProductMarketing = ({ item }: TableRowProductMarketingProps) => {
  const assignedBranches = item.branches.filter((branch) => branch.assigned);

  const validAddOns = (item.addOns ?? []).filter((addOn) => addOn.valid);
  const hasChips = item.popular || validAddOns.length > 0;

  // The API only exposes the add-on portion of the discount, so the effective
  // rate is derived from the fees themselves to stay consistent with Final Fee.
  const effectiveDiscount =
    item.finalBaseFee > 0
      ? ((item.finalBaseFee - item.finalDiscountedFee) / item.finalBaseFee) *
        100
      : 0;

  return (
    <tr>
      <td className={CELL_CLASS} style={{ width: "22%" }}>
        <div className="fw-semibold mb-1">{item.alias}</div>
        <CopyableText text={item.number} className={CODE_CLASS} />
        {item.networkSetting ? (
          <DetailLine label="Network" value={item.networkSetting.name} />
        ) : null}

        {hasChips ? (
          <div className="d-flex flex-wrap gap-1 mt-2">
            {/* {item.popular ? (
              <span className="badge text-bg-warning">Popular</span>
            ) : null} */}
            {validAddOns.map((addOn) => (
              <span
                key={addOn.id}
                title={`${addOn.description} (${addOn.fromDate} - ${addOn.toDate})`}
                className="badge rounded-pill fw-normal text-bg-light border"
              >
                {addOn.name}
              </span>
            ))}
          </div>
        ) : null}

        <div className="d-flex flex-wrap gap-1 mt-2">
          <StatusBadge
            isOn={item.active}
            onLabel="Active"
            offLabel="Inactive"
            onClassName="text-bg-success"
          />
          <StatusBadge
            isOn={item.publish}
            onLabel="Published"
            offLabel="Unpublished"
            onClassName="text-bg-info"
          />
        </div>
      </td>

      <td className={CELL_CLASS} style={{ width: "24%" }}>
        <div className="fw-semibold mb-1">{item.product.name}</div>
        <CopyableText text={item.product.number} className={CODE_CLASS} />
        <DetailLine label="Category" value={item.product.category.name} />
        <DetailLine label="Created By" value={`${item.product.createdBy}`} />
        <div className="d-flex flex-wrap gap-1 mt-2">
          <StatusBadge
            isSubdued
            isOn={item.product.active}
            onLabel="Active"
            offLabel="Inactive"
            onClassName="text-success"
          />
          <StatusBadge
            isSubdued
            isOn={item.product.publish}
            onLabel="Published"
            offLabel="Unpublished"
            onClassName="text-info"
          />
        </div>
      </td>

      <td className={CELL_CLASS} style={{ width: "24%" }}>
        <div className="fs-6 fw-semibold text-nowrap">
          {formatCurrency(item.finalDiscountedFee)}
          <span className="fs-6 fw-normal text-muted">
            {" "}
            / {item.billingCycle.name}
          </span>
        </div>
        <div className="small text-muted">Final Fee</div>

        <hr className="my-2" />

        <FeeGrid
          rows={[
            {
              label: "Base fee",
              value: (
                <>
                  {formatCurrency(item.finalBaseFee)}
                  <span className="text-muted">
                    {" "}
                    / {item.billingCycle.name}
                  </span>
                </>
              ),
            },
            {
              label: "Recurring",
              value: (
                <>
                  {formatCurrency(item.recurringFee)}
                  <span className="text-muted"> / month</span>
                </>
              ),
            },
            {
              label: "Discount",
              value: (
                <>
                  {formatPercent(effectiveDiscount)}
                  {item.additionalDiscount > 0 ? (
                    <span className="text-muted">
                      {" "}
                      (additional {formatPercent(item.additionalDiscount)})
                    </span>
                  ) : null}
                </>
              ),
            },
            {
              label: "Tax",
              value: (
                <>
                  {formatCurrency(item.taxFee)}
                  <span className="text-muted">
                    {" "}
                    / month ({item.includeTax ? "included" : "excluded"})
                  </span>
                </>
              ),
            },
            { label: "Setup", value: formatCurrency(item.setupFee) },
          ]}
        />
      </td>

      <td className={CELL_CLASS} style={{ width: "16%" }}>
        {assignedBranches.length > 0 ? (
          <>
            <div className="small text-muted mb-1">
              {assignedBranches.length}{" "}
              {assignedBranches.length === 1 ? "branch" : "branches"}
            </div>
            <div className="d-flex flex-wrap gap-1">
              {assignedBranches.map((branch) => (
                <span
                  key={branch.id}
                  title={branch.name}
                  className="badge rounded-pill fw-normal text-bg-light border"
                >
                  {branch.code || branch.name}
                </span>
              ))}
            </div>
          </>
        ) : (
          "-"
        )}
      </td>
    </tr>
  );
};

export default TableRowProductMarketing;
