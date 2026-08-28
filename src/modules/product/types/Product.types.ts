export type BillingCycle = {
  id: number;
  billEveryNMonth: number;
  name: string;
};

export type Branch = {
  id: number;
  code: string;
  name: string;
  assigned: boolean;
};

export type ProductCategory = {
  id: number;
  name: string;
};

export type ProductGroup = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  uuid: string;
  number: string;
  name: string;
  description: string;
  monthlyFee: number;
  active: boolean;
  publish: boolean;
  category: ProductCategory;
  group: ProductGroup;
  countProductVariant: number;
  createdAt: string;
  createdBy: string;
};

export type NetworkSetting = {
  id: number;
  name: string;
};

export type DiscountType = {
  id: number;
  name: string;
};

export type AddOn = {
  id: number;
  addOnId: number;
  name: string;
  description: string;
  valid: boolean;
  fromDate: string;
  toDate: string;
  additionalDiscount: number;
  discountType: DiscountType;
};

export type ProductVariantMarketing = {
  id: number;
  uuid: string;
  number: string;
  alias: string;
  active: boolean;
  publish: boolean;
  popular: boolean;
  billNDate: number;
  billingCycle: BillingCycle;
  branches: Branch[];
  product: Product;
  networkSetting: NetworkSetting | null;
  addOns: AddOn[] | null;
  finalBaseFee: number;
  finalDiscountedFee: number;
  additionalDiscount: number;
  recurringFee: number;
  setupFee: number;
  taxFee: number;
  techvisitFree: number;
  includeTax: boolean;
};

export type ProductMarketingFilter = {
  search: string;
  productIds: string[];
  billingCycleIds: string[];
  publish: string;
};
