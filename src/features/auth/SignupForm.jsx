import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSignup } from "./useSignup";
import { useSignupWithGoogle } from "./useSignupWithGoogle";

import Divider from "@mui/material/Divider";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import DotsLoader from "../../ui/DotsLoader";
import Swal from "sweetalert2";
import ButtonGoogle from "../../ui/ButtonGoogle";

import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function SignupForm() {
  const navigate = useNavigate();
  const { isPending: isPending1, signup } = useSignup();
  const { isPending: isPending2, signupWithGoogle } = useSignupWithGoogle();

  const isPending = isPending1 || isPending2;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  function onSubmit({ fullName, email, password }) {
    sessionStorage.clear();
    signup(
      { fullName, email, password },
      {
        onSuccess: () => {
          reset();
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Please confirm you email",
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              title: "swal-title",
              container: "swal-conainer",
              popup: "swal-popup",
              icon: "swal-icon",
            },
          });
        },
      }
    );
  }

  function handleInputBlur(e, input) {
    sessionStorage.setItem(input, e.target.value);
  }

  useEffect(() => {
    const storedfullName = sessionStorage.getItem("inputSignupFullName");
    const storedEmail = sessionStorage.getItem("inputSignupEmail");

    setValue("fullName", storedfullName || "");
    setValue("email", storedEmail || "");
  }, [setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-colorWhite flex flex-col gap-6 w-[28rem] border rounded-sm border-colorGrey100 py-[2.4rem] px-[2.9rem] text-xs"
    >
      <ButtonGoogle
        onClick={(e) => {
          e.preventDefault();
          signupWithGoogle();
        }}
      />
      <Divider className="text-sm">OR</Divider>
      <FormRow
        error={errors?.fullName?.message}
        orientaion="vertical"
        label="Full name"
      >
        <Input
          disabled={isPending}
          register={{
            ...register("fullName", { required: "Full name is required" }),
          }}
          variation="secondary"
          onBlur={(e) => handleInputBlur(e, "inputSignupFullName")}
        />
      </FormRow>
      <FormRow
        error={errors?.email?.message}
        orientaion="vertical"
        label="Email address"
      >
        <Input
          disabled={isPending}
          register={{
            ...register("email", {
              required: "Email is required",
              pattern: {
                message: "Invalid email",
                value: /\S+@\S+\.\S+/,
              },
            }),
          }}
          variation="secondary"
          onBlur={(e) => handleInputBlur(e, "inputSignupEmail")}
        />
      </FormRow>
      <FormRow
        error={errors?.password?.message}
        orientaion="vertical"
        label="Passowrd"
      >
        <Input
          disabled={isPending}
          type="password"
          register={{
            ...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password should at least 5 character",
              },
            }),
          }}
          variation="secondary"
        />
      </FormRow>
      <FormRow
        error={errors?.confirmPassowrd?.message}
        orientaion="vertical"
        label="Confirm passowrd"
      >
        <Input
          disabled={isPending}
          type="password"
          register={{
            ...register("confirmPassowrd", {
              required: "Confirm passowrd is required",
              validate: (value, formValues) =>
                value === formValues.password || "Password is not correct",
            }),
          }}
          variation="secondary"
        />
      </FormRow>
      <Button disabled={isPending} variation="login">
        {isPending ? (
          <div className="p-[0.4rem]">
            <DotsLoader size="small" />
          </div>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="text-xs">
        <span>Do you have already account ?</span>{" "}
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
          className="cursor-pointer text-colorBrand800"
        >
          Log in
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
