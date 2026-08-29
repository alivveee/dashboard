import api from "../../../shared/lib/axios";
import { ApiPagination, ApiResponse } from "../../../shared/types/Api.types";
import { ProductVariantMarketing } from "../types/Product.types";

const PRODUCT_MARKETING_ENDPOINT =
  "/public/v2/businesses/products/variants/marketings";

export interface FetchProductVariantMarketingsParams {
  search?: string;
  productIds?: string[];
  billingCycleIds?: string[];
  publish?: string;
  page?: number;
  limit?: number;
}

export interface FetchProductVariantMarketingsResult {
  items: ProductVariantMarketing[];
  pagination: ApiPagination | null;
}

export const fetchProductVariantMarketings = async (
  params: FetchProductVariantMarketingsParams = {},
  signal?: AbortSignal,
): Promise<FetchProductVariantMarketingsResult> => {
  const response = await api.get<ApiResponse<ProductVariantMarketing[]>>(
    PRODUCT_MARKETING_ENDPOINT,
    {
      params: {
        search: params.search?.trim() || undefined,
        productIds: params.productIds?.join(",") || undefined,
        billingCycleIds: params.billingCycleIds?.join(",") || undefined,
        publish: params.publish || undefined,
        page: params.page,
        limit: params.limit,
        all: true,
      },
      signal,
    },
  );

  return {
    items: response.data.result ?? [],
    pagination: response.data.pagination ?? null,
  };
};
