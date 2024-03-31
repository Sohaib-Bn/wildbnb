import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeDislikeProduct as likeDislikeProductApi } from "../../services/apiProducts";

export function useLikeProduct() {
  const queryClient = useQueryClient();

  const { isPending, mutate: likeDislikeProduct } = useMutation({
    mutationKey: ["user"],
    mutationFn: likeDislikeProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { isPending, likeDislikeProduct };
}
