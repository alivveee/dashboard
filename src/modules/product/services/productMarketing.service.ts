import api from "../../../shared/lib/axios";
import { ApiResponse } from "../../../shared/types/Api.types";
import { ProductVariantMarketing } from "../types/Product.types";

const PRODUCT_MARKETING_ENDPOINT =
  "/public/v2/businesses/products/variants/marketings";

export interface FetchProductVariantMarketingsParams {
  search?: string;
}

export const fetchProductVariantMarketings = async (
  params: FetchProductVariantMarketingsParams = {},
  signal?: AbortSignal,
): Promise<ProductVariantMarketing[]> => {
  const response = await api.get<ApiResponse<ProductVariantMarketing[]>>(
    PRODUCT_MARKETING_ENDPOINT,
    {
      params: { search: params.search?.trim() || undefined, all: true },
      signal,
    },
  );

  return response.data.result ?? [];
};
