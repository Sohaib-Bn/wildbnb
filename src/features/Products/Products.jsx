import { useProductsContext } from "../../context/ProductsContext";
import { useAppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import Button from "../../ui/Button";
import EmptyData from "../../ui/EmpyData";
import ProductCard from "./ProductCard";
import SkeletonProductCard from "./SkeletonProductCard";

function Products() {
  const { productType } = useParams();
  const [searchParams] = useSearchParams();

  const { t } = useTranslation("header", "common");
  const productNameTranslated = t(`header:products_type.${productType}`, {
    ns: "header",
  });

  const { isConverting, setShowOnlyFavorite } = useAppContext();

  const {
    isLoading: isLoadingProducts,
    products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductsContext();

  const isLoading = isConverting || isLoadingProducts;

  useEffect(() => {
    if (!searchParams.get("onlyFavorites")) setShowOnlyFavorite(false);
  }, [searchParams, setShowOnlyFavorite]);

  if (!isLoading && (!products?.length || !products))
    return (
      <div className="mt-10">
        <EmptyData label={productType} />
      </div>
    );

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-x-6 gap-y-9 ">
        {isLoading ? (
          <SkeletonProductCard cards={8} />
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} productData={product} />
          ))
        )}
      </div>

      {hasNextPage && (
        <div className="flex flex-col justify-center items-center gap-4">
          <h3 className="text font-semibold">
            {t("common:show_more_section.title", {
              product: productNameTranslated,
            })}
          </h3>
          <Button size="small" onClick={fetchNextPage}>
            {isFetchingNextPage
              ? "Loading..."
              : t("common:show_more_section.button")}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Products;
