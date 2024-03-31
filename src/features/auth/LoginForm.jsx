import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogin } from "./useLogin";
import { useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { useSignupWithGoogle } from "./useSignupWithGoogle";

import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import DotsLoader from "../../ui/DotsLoader";
import ButtonGoogle from "../../ui/ButtonGoogle";

function LoginForm() {
  const navigate = useNavigate();
  const { isPending: isPending1, login } = useLogin();
  const { isPending: isPending2, signupWithGoogle } = useSignupWithGoogle();

  const isPending = isPending1 || isPending2;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  function onSubmit({ password, email }) {
    login(
      { email, password },
      {
        onSuccess: () => reset(),
        onError: () => {
          setError("email", {
            type: "custom",
            message: "Email is not correct",
          });
          setError("password", {
            type: "custom",
            message: "Password is not correct",
          });
        },
      }
    );
  }

  function handleInputBlur(e, input) {
    if (!e.target.value) return;
    sessionStorage.setItem(input, e.target.value);
  }

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("inputLoginEmail");
    setValue("email", storedEmail || "");
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-colorWhite flex flex-col gap-6 w-[30rem] border rounded-sm border-colorGrey100 py-[2.4rem] px-[2.9rem]"
    >
      <ButtonGoogle
        onClick={(e) => {
          e.preventDefault();
          signupWithGoogle();
        }}
      />
      <Divider>OR</Divider>
      <FormRow
        error={errors?.email?.message}
        orientaion="vertical"
        label="Email"
      >
        <Input
          disabled={isPending}
          register={{
            ...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            }),
          }}
          variation="secondary"
          onBlur={(e) => handleInputBlur(e, "inputLoginEmail")}
        />
      </FormRow>
      <FormRow
        error={errors?.password?.message}
        orientaion="vertical"
        label="Password"
      >
        <Input
          disabled={isPending}
          register={{
            ...register("password", { required: "Password is required" }),
          }}
          variation="secondary"
          type="password"
        />
      </FormRow>
      <Button type="submit" disabled={isPending} variation="login">
        {isPending ? (
          <div className="p-[0.4rem]">
            <DotsLoader size="small" />
          </div>
        ) : (
          "Login"
        )}
      </Button>

      <div className="text-sm">
        <span>You don't have account ?</span>{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/signup");
          }}
          className="cursor-pointer text-colorBrand800"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
