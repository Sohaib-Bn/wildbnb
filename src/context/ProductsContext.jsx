import { createContext, useContext, useEffect } from "react";
import { useProducts } from "../features/Products/useProducts";
import { useTranslation } from "react-i18next";

const ProductsContext = createContext();

function ProductsProvider({ children }) {
  const {
    products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts();
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.loadNamespaces(["filters", "products"]);
  }, [i18n]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;

export function useProductsContext() {
  const value = useContext(ProductsContext);

  if (value === undefined)
    throw new Error("Context have been used out of the ProductsProvider");

  return value;
}
