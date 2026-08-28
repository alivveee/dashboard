import { useEffect, useState } from "react";
import { fetchProductVariantMarketings } from "../services/productMarketing.service";
import { ProductVariantMarketing } from "../types/Product.types";

const useProductMarketing = () => {
  const [items, setItems] = useState<ProductVariantMarketing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProductVariantMarketings()
      .then((result) => setItems(result))
      .catch(() => setErrorMessage("Failed to load product marketing data."))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    __productMarketings: items,
    __isLoading: isLoading,
    __errorMessage: errorMessage,
  };
};

export default useProductMarketing;
