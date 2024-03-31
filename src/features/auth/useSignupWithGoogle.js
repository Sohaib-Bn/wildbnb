import { useMutation } from "@tanstack/react-query";
import { signupWithGoogle as signupWithGoogleApi } from "../../services/apiAuth";

export function useSignupWithGoogle() {
  const { isPending, mutate: signupWithGoogle } = useMutation({
    mutationFn: signupWithGoogleApi,
  });

  return { isPending, signupWithGoogle };
}
