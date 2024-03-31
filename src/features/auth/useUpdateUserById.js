import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserById as updateUserByIdApi } from "../../services/apiAuth";

export function useUpdateUserById() {
  const queryClient = useQueryClient();

  const { isPending, mutate: updateUserById } = useMutation({
    mutationFn: updateUserByIdApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
    },
  });

  return { isPending, updateUserById };
}
