import { useEffect } from "react";
import PageHeader from "../../../shared/components/PageHeader";
import useSidebar from "../../../shared/hooks/useSidebar";
import useProductMarketing from "../hooks/useProductMarketing";
import ProductMarketingFilterModal from "../components/ProductMarketingFilterModal";
import ProductMarketingTable from "../components/ProductMarketingTable";

const ProductMarketingPage = () => {
  const {
    __productMarketings,
    __isLoading,
    __errorMessage,

    __searchQuery,
    __setSearchQuery,
    __appliedSearch,
    __handleSubmitSearch,

    __filterDraft,
    __filterModalRef,
    __activeFilterCount,
    __hasActiveFilter,
    __handleOpenFilter,
    __handleChangeFilter,
    __handleSubmitFilter,
    __handleResetFilter,
    __handleCloseFilter,

    __pagination,
  } = useProductMarketing();
  const { __close } = useSidebar();

  useEffect(() => {
    __close();
  }, [__close]);

  return (
    <>
      <PageHeader title="Product Marketing List" />

      {__errorMessage ? (
        <div className="alert alert-danger">{__errorMessage}</div>
      ) : null}

      <ProductMarketingTable
        items={__productMarketings}
        isLoading={__isLoading}
        search={{
          value: __searchQuery,
          appliedValue: __appliedSearch,
          onChange: __setSearchQuery,
          onSubmit: __handleSubmitSearch,
        }}
        filter={{
          activeCount: __activeFilterCount,
          hasActive: __hasActiveFilter,
          onOpen: __handleOpenFilter,
          onReset: __handleResetFilter,
        }}
        pagination={__pagination}
      />

      <ProductMarketingFilterModal
        modalRef={__filterModalRef}
        values={__filterDraft}
        actions={{
          onChange: __handleChangeFilter,
          onSubmit: __handleSubmitFilter,
          onClose: __handleCloseFilter,
        }}
      />
    </>
  );
};

export default ProductMarketingPage;
