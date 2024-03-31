import { useQuery } from "@tanstack/react-query";
import { getUserStays } from "../../services/apiBookings";

export function useUserStays(userId) {
  const { isLoading, data: userStays } = useQuery({
    queryKey: ["userStays"],
    queryFn: () => getUserStays(userId),
  });

  return { isLoading, userStays };
}
