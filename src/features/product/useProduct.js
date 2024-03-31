import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/apiProducts";

export function useProduct() {
  const { productType, productId } = useParams();

  const { isLoading: isLoadingProduct, data: product } = useQuery({
    queryKey: ["product", productType, productId],
    queryFn: () => getProduct({ productId, productType }),
  });

  return { isLoadingProduct, product };
}
