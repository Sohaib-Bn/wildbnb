import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeDislikeReviews as likeDislikeReviewsApi } from "../../services/apiReviews";

export function useLikeDislikeReview() {
  const queryClient = useQueryClient();
  const { isPending, mutate: likeDislikeReview } = useMutation({
    mutationFn: likeDislikeReviewsApi,
    onSuccess: () => queryClient.invalidateQueries(["reviews"]),
  });

  return { isPending, likeDislikeReview };
}
