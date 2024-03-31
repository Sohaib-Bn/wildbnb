import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductReviews } from "../../services/apiReviews";
import { REVIEWS_PER_PAGE } from "../../utils/constants";

export function useProductReviews() {
  const { productType, productId } = useParams();

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["reviews", productType, productId],
    queryFn: ({ pageParam }) =>
      getProductReviews({ pageParam, productType, productId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPagesParam) => {
      const hasNextPage = lastPageParam < lastPage.count / REVIEWS_PER_PAGE;

      return hasNextPage ? lastPageParam + 1 : null;
    },
  });

  return {
    reviews: data?.pages.flatMap((page) => page.reviews) || [],
    isLoading,
    hasNextPage,
    fetchNextPage,
    count: data?.pages[0].count,
  };
}
