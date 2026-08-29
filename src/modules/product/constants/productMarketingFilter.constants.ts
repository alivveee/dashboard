import { ProductMarketingFilter } from "../types/Product.types";

export const PRODUCT_OPTIONS = [
  { value: "1", label: "Lite" },
  { value: "2", label: "Lite+" },
  { value: "3", label: "Signature" },
  { value: "4", label: "Dedicated Link" },
];

export const BILLING_CYCLE_OPTIONS = [
  { value: "4", label: "Monthly" },
  { value: "1", label: "Quarterly" },
  { value: "2", label: "Semester" },
  { value: "3", label: "Annual" },
];

export const PUBLISH_OPTIONS = [
  { value: "", label: "All" },
  { value: "true", label: "Published" },
  { value: "false", label: "Unpublished" },
];

export const EMPTY_PRODUCT_MARKETING_FILTER: ProductMarketingFilter = {
  search: "",
  productIds: [],
  billingCycleIds: [],
  publish: "",
};
