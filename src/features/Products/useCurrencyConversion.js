import { useQuery } from "@tanstack/react-query";
import { getConvertedCurrency } from "../../services/apiConvertCurrency";

export function useCurrencyConversion(to) {
  const {
    isLoading: isConverting,
    data: convertedCurrency,
    error,
  } = useQuery({
    queryKey: ["currency", `to=${to}`],
    queryFn: () => getConvertedCurrency(to),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return { isConverting, convertedCurrency, error };
}
