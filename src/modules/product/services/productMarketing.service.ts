import api from "../../../shared/lib/axios";
import { ApiResponse } from "../../../shared/types/Api.types";
import { ProductVariantMarketing } from "../types/Product.types";

const PRODUCT_MARKETING_ENDPOINT =
  "/public/v2/businesses/products/variants/marketings";

export const fetchProductVariantMarketings = async (): Promise<
  ProductVariantMarketing[]
> => {
  const response = await api.get<ApiResponse<ProductVariantMarketing[]>>(
    PRODUCT_MARKETING_ENDPOINT,
  );

  return response.data.result ?? [];
};
