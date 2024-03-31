import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";
import { useParams, useSearchParams } from "react-router-dom";
import { DEFAULT_OPTION, RESULT_PER_PAGE } from "../../utils/constants";

export function useProducts(pagination = true) {
  const { productType } = useParams();
  const [searchParams] = useSearchParams();

  const location = searchParams.get("location") || DEFAULT_OPTION;

  const onlyFavorites =
    searchParams.get("onlyFavorites") === "true" || DEFAULT_OPTION;

  const placeType = searchParams.get("place_type") || DEFAULT_OPTION;
  const maxCapacity = searchParams.get("max_capacity")?.includes("+")
    ? searchParams.get("max_capacity").split("+")[0]
    : searchParams.get("max_capacity") || DEFAULT_OPTION;
  const amentitiesParams = searchParams
    .getAll("amentities")
    .filter((el) => el !== DEFAULT_OPTION);
  const amentities = amentitiesParams.length
    ? amentitiesParams
    : DEFAULT_OPTION;
  const minPrice = searchParams.get("price_min") || DEFAULT_OPTION;
  const maxPrice = searchParams.get("price_max") || DEFAULT_OPTION;

  const filters = [
    {
      option: "onlyFavorites",
      filter: "isGuestsFavorite",
      operation: "eq",
      value: onlyFavorites,
    },
    {
      option: "placeType",
      filter: "type",
      operation: "eq",
      value: placeType,
    },
    {
      option: "minPrice",
      filter: "regularPrice",
      operation: "gte",
      value: minPrice,
    },
    {
      option: "maxPrice",
      filter: "regularPrice",
      operation: "lte",
      value: maxPrice,
    },
    {
      option: "maxCapacity",
      filter: "maxCapacity",
      operation: `${maxCapacity.includes("+") ? "gte" : "eq"}`,
      value: maxCapacity,
    },
    {
      option: "amentities",
      filter: "amentities",
      operation: "contains",
      value: amentities,
    },
  ];

  const { isLoading, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [
      "products",
      `type=${productType}`,
      `location=${location}`,
      ...filters.map((filter) => `${filter.option}=${filter.value}`),
      `pagination=${pagination}`,
    ],
    queryFn: ({ pageParam }) =>
      getProducts({ productType, location, filters, pageParam, pagination }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPagesParam) => {
      const hasNextPage = lastPageParam < lastPage.count / RESULT_PER_PAGE;

      return hasNextPage ? lastPageParam + 1 : null;
    },
    retry: false,
  });

  return {
    products: data?.pages.flatMap((page) => page.products) || [],
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
}
