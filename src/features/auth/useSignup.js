import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../services/apiAuth";

export function useSignup() {
  const { isPending, mutate: signup } = useMutation({
    mutationFn: signupUser,
  });

  return { isPending, signup };
}
