import { useEffect, useState } from "react";
import { fetchProductVariantMarketings } from "../services/productMarketing.service";
import { ProductVariantMarketing } from "../types/Product.types";

const useProductMarketing = () => {
  const [items, setItems] = useState<ProductVariantMarketing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setErrorMessage(null);

    fetchProductVariantMarketings({ search: appliedSearch }, controller.signal)
      .then((result) => {
        setItems(result);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setErrorMessage("Failed to load product marketing data.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [appliedSearch]);

  const _handleSubmitSearch = () => {
    setAppliedSearch(searchQuery.trim());
  };

  return {
    __productMarketings: items,
    __isLoading: isLoading,
    __errorMessage: errorMessage,

    __searchQuery: searchQuery,
    __setSearchQuery: setSearchQuery,
    __appliedSearch: appliedSearch,
    __handleSubmitSearch: _handleSubmitSearch,
  };
};

export default useProductMarketing;
