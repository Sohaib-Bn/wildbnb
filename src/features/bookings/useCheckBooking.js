import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { checkExistingBookings } from "../../services/apiBookings";

export function useCheckBooking() {
  const { productId } = useParams();

  const {
    isPending: isChecking,
    data: isDateRangeAvailable,
    mutate: checkDateRangeAvailablity,
  } = useMutation({
    mutationKey: ["checkBooking", productId],
    mutationFn: ({ dateRange, validate, dateRangeSettings }) =>
      checkExistingBookings({
        productId,
        dateRange,
        validate,
        dateRangeSettings,
      }),
  });

  return { isChecking, isDateRangeAvailable, checkDateRangeAvailablity };
}
