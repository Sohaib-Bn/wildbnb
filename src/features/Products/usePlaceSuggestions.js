import { useQuery } from "@tanstack/react-query";
import getPlaceSuggestions from "../../services/apiPlaceSuggestions";

export function usePlaceSuggestions(query) {
  const { isLoading, data } = useQuery({
    queryKey: ["suggestion", query],
    queryFn: () => getPlaceSuggestions(query),
  });

  return { isLoading, data };
}
