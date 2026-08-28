import { useEffect } from "react";
import PageHeader from "../../../shared/components/PageHeader";
import useSidebar from "../../../shared/hooks/useSidebar";
import useProductMarketing from "../hooks/useProductMarketing";
import ProductMarketingTable from "../components/ProductMarketingTable";

const ProductMarketingPage = () => {
  const { __productMarketings, __isLoading, __errorMessage } =
    useProductMarketing();
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
      />
    </>
  );
};

export default ProductMarketingPage;
