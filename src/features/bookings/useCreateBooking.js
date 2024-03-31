import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import { useAppContext } from "../../context/AppContext";
import { useUser } from "../auth/useUser";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { isAuthorized } = useAppContext();

  const { user } = useUser();

  const userId = user?.id;

  const { isPending: isCreating, mutate: createBooking } = useMutation({
    mutationFn: ({ finalBookingData, finalGuestData, additionalData }) =>
      createBookingApi({
        finalBookingData,
        finalGuestData,
        additionalData,
        isAuthorized,
        userId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["checkBooking"]);
    },
  });

  return { isCreating, createBooking };
}
