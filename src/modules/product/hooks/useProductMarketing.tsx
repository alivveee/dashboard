import { useEffect, useRef, useState } from "react";
import type { ModalHandle } from "../../../shared/components/Modal";
import { createModalControls } from "../../../shared/helpers/modal";
import useForm from "../../../shared/hooks/useForm";
import usePagination from "../../../shared/hooks/usePagination";
import useQueryParams from "../../../shared/hooks/useQueryParams";
import {
  BILLING_CYCLE_OPTIONS,
  EMPTY_PRODUCT_MARKETING_FILTER,
  PRODUCT_OPTIONS,
  PUBLISH_OPTIONS,
} from "../constants/productMarketingFilter";
import { fetchProductVariantMarketings } from "../services/productMarketing.service";
import {
  ProductMarketingFilter,
  ProductVariantMarketing,
} from "../types/Product.types";

type FilterOption = { value: string; label: string };

const keepKnownValues = (values: string[], options: FilterOption[]) =>
  values.filter((value) => options.some((option) => option.value === value));

const useProductMarketing = () => {
  const [items, setItems] = useState<ProductVariantMarketing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const controller = new AbortController();

  const { __queryString, __getParam, __getListParam, __setParams } =
    useQueryParams();

  const {
    __page,
    __pageSize,
    __pagination,
    __setPaginationMeta,
    __resetPageParams,
  } = usePagination();

  const appliedFilters: ProductMarketingFilter = {
    search: __getParam("search"),
    productIds: keepKnownValues(__getListParam("productIds"), PRODUCT_OPTIONS),
    billingCycleIds: keepKnownValues(
      __getListParam("billingCycleIds"),
      BILLING_CYCLE_OPTIONS,
    ),
    publish: keepKnownValues([__getParam("publish")], PUBLISH_OPTIONS)[0] ?? "",
  };

  const [searchQuery, setSearchQuery] = useState(appliedFilters.search);

  const {
    __values: filterDraft,
    __setForm: _setFilterDraft,
    __handleChange: _handleChangeFilter,
    __resetForm: _resetFilterDraft,
  } = useForm<ProductMarketingFilter>(EMPTY_PRODUCT_MARKETING_FILTER);

  const filterModal = createModalControls(useRef<ModalHandle>(null));

  const _handleSubmitSearch = () => {
    __setParams({ search: searchQuery.trim(), ...__resetPageParams });
  };

  const _handleOpenFilter = () => {
    _setFilterDraft({ ...appliedFilters, search: searchQuery });
    filterModal.open();
  };

  const _handleSubmitFilter = () => {
    __setParams({
      ...filterDraft,
      search: filterDraft.search.trim(),
      ...__resetPageParams,
    });
    filterModal.close();
  };

  const _handleResetFilter = () => {
    __setParams({ ...EMPTY_PRODUCT_MARKETING_FILTER, ...__resetPageParams });
    _resetFilterDraft();
  };

  const _handleCloseFilter = () => {
    filterModal.close();
  };

  const activeFilterCount = [
    appliedFilters.productIds.length > 0,
    appliedFilters.billingCycleIds.length > 0,
    appliedFilters.publish !== "",
  ].filter(Boolean).length;

  useEffect(() => {
    setSearchQuery(appliedFilters.search);
  }, [appliedFilters.search]);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);

    fetchProductVariantMarketings(
      { ...appliedFilters, page: __page, limit: __pageSize },
      controller.signal,
    )
      .then((result) => {
        setItems(result.items);
        __setPaginationMeta(result.pagination);
      })
      .catch(() => {
        if (controller.signal.aborted) {
          return;
        }

        setErrorMessage("Failed to load product marketing data.");
      })
      .finally(() => {
        if (controller.signal.aborted) {
          return;
        }

        setIsLoading(false);
      });

    return () => controller.abort();
  }, [__queryString]);

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
    __hasActiveFilter: activeFilterCount > 0 || appliedFilters.search !== "",
    __handleOpenFilter: _handleOpenFilter,
    __handleChangeFilter: _handleChangeFilter,
    __handleSubmitFilter: _handleSubmitFilter,
    __handleResetFilter: _handleResetFilter,
    __handleCloseFilter: _handleCloseFilter,

    // Pagination
    __pagination,
  };
};

export default useProductMarketing;
