import { useEffect, useRef, useState } from "react";
import type { ModalHandle } from "../../../shared/components/Modal";
import { createModalControls } from "../../../shared/helpers/modal";
import useForm from "../../../shared/hooks/useForm";
import { EMPTY_PRODUCT_MARKETING_FILTER } from "../constants/productMarketingFilter";
import { fetchProductVariantMarketings } from "../services/productMarketing.service";
import {
  ProductMarketingFilter,
  ProductVariantMarketing,
} from "../types/Product.types";

const useProductMarketing = () => {
  const [items, setItems] = useState<ProductVariantMarketing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<ProductMarketingFilter>(
    EMPTY_PRODUCT_MARKETING_FILTER,
  );

  const {
    __values: filterDraft,
    __setForm: _setFilterDraft,
    __handleChange: _handleChangeFilter,
    __resetForm: _resetFilterDraft,
  } = useForm<ProductMarketingFilter>(EMPTY_PRODUCT_MARKETING_FILTER);

  const filterModal = createModalControls(useRef<ModalHandle>(null));

  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const result = await fetchProductVariantMarketings(
          appliedFilters,
          controller.signal,
        );

        setItems(result);
      } catch {
        if (!controller.signal.aborted) {
          setErrorMessage("Failed to load product marketing data.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => controller.abort();
  }, [appliedFilters]);

  const _handleSubmitSearch = () => {
    setAppliedFilters({ ...appliedFilters, search: searchQuery.trim() });
  };

  const _handleOpenFilter = () => {
    _setFilterDraft({ ...appliedFilters, search: searchQuery });
    filterModal.open();
  };

  const _handleSubmitFilter = () => {
    const search = filterDraft.search.trim();

    setSearchQuery(search);
    setAppliedFilters({ ...filterDraft, search });
    filterModal.close();
  };

  const _handleResetFilter = () => {
    setSearchQuery("");
    setAppliedFilters(EMPTY_PRODUCT_MARKETING_FILTER);
    _resetFilterDraft();
  };

  const _handleCloseFilter = () => {
    filterModal.close();
  };

  const activeFilterCount = (() => {
    const { productIds, billingCycleIds, publish } = appliedFilters;

    return (
      (productIds.length > 0 ? 1 : 0) +
      (billingCycleIds.length > 0 ? 1 : 0) +
      (publish !== "" ? 1 : 0)
    );
  })();

  return {
    // Data
    __productMarketings: items,
    __isLoading: isLoading,
    __errorMessage: errorMessage,

    // Search
    __searchQuery: searchQuery,
    __setSearchQuery: setSearchQuery,
    __appliedSearch: appliedFilters.search,
    __handleSubmitSearch: _handleSubmitSearch,

    // Advanced search
    __filterDraft: filterDraft,
    __filterModalRef: filterModal.ref,
    __activeFilterCount: activeFilterCount,
    __hasActiveFilter:
      activeFilterCount > 0 || appliedFilters.search !== "",
    __handleOpenFilter: _handleOpenFilter,
    __handleChangeFilter: _handleChangeFilter,
    __handleSubmitFilter: _handleSubmitFilter,
    __handleResetFilter: _handleResetFilter,
    __handleCloseFilter: _handleCloseFilter,
  };
};

export default useProductMarketing;
