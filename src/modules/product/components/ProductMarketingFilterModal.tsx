import type { RefObject } from "react";
import Modal, { type ModalHandle } from "../../../shared/components/Modal";
import FormInput from "../../../shared/components/form/FormInput";
import FormMultiSelect from "../../../shared/components/form/FormMultiSelect";
import FormSelect from "../../../shared/components/form/FormSelect";
import { IconSearch } from "../../../shared/components/icons/Icons";
import {
  BILLING_CYCLE_OPTIONS,
  PRODUCT_OPTIONS,
  PUBLISH_OPTIONS,
} from "../constants/productMarketingFilter.constants";
import { ProductMarketingFilter } from "../types/Product.types";

interface ProductMarketingFilterModalActions {
  onChange: (
    field: keyof ProductMarketingFilter,
    value: string | string[],
  ) => void;
  onSubmit: () => void;
  onClose: () => void;
}

interface ProductMarketingFilterModalProps {
  modalRef: RefObject<ModalHandle | null>;
  values: ProductMarketingFilter;
  actions: ProductMarketingFilterModalActions;
}

const ProductMarketingFilterModal = ({
  modalRef,
  values,
  actions,
}: ProductMarketingFilterModalProps) => {
  return (
    <Modal modalRef={modalRef} onClose={actions.onClose}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          actions.onSubmit();
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title">Advanced Search</h5>

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={actions.onClose}
          />
        </div>

        <div className="modal-body">
          <FormInput
            id="filter-search"
            label="Search"
            value={values.search}
            onChange={(value) => actions.onChange("search", value)}
            placeholder="Search product marketing..."
            icon={<IconSearch className="text-muted" />}
          />

          <FormMultiSelect
            id="filter-products"
            label="Product"
            value={values.productIds}
            options={PRODUCT_OPTIONS}
            onChange={(value) => actions.onChange("productIds", value)}
            placeholder="All products"
          />

          <FormMultiSelect
            id="filter-billing-cycles"
            label="Billing Cycle"
            value={values.billingCycleIds}
            options={BILLING_CYCLE_OPTIONS}
            onChange={(value) => actions.onChange("billingCycleIds", value)}
            placeholder="All billing cycles"
          />

          <FormSelect
            id="filter-publish"
            label="Publish"
            value={values.publish}
            options={PUBLISH_OPTIONS}
            onChange={(value) => actions.onChange("publish", value)}
          />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={actions.onClose}
          >
            Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            Apply
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductMarketingFilterModal;
