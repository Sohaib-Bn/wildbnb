import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview as addReviewApi } from "../../services/apiReviews";

export function useAddReview() {
  const queryClient = useQueryClient();
  const { isPending, mutate: addReview } = useMutation({
    mutationFn: addReviewApi,
    onSuccess: () => queryClient.invalidateQueries({ active: true }),
  });

  return { isPending, addReview };
}
