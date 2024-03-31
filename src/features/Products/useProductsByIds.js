import { useQuery } from "@tanstack/react-query";
import { getProductsByIds } from "../../services/apiProducts";

export function useProductsByIds(productIds) {
  const productIdsString = productIds.join(",");

  const { isLoading, data: products } = useQuery({
    queryKey: ["productsByIds", productIdsString],
    queryFn: () => getProductsByIds(productIds),
  });

  return { isLoading, products };
}
