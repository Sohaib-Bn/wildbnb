import { useEffect, useState } from "react";
import { useBookingContenxt } from "../../context/ValidatedBookingContext";
import { formatCurrency } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";
import { useForm } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../auth/useUser";

import TextArea from "../../ui/TextArea";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import CheckBox from "../../ui/CheckBox";
import Button from "../../ui/Button";
import DotsLoader from "../../ui/DotsLoader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function CreateBookingForm() {
  const { selectedCurrency } = useAppContext();
  const { i18n } = useTranslation();
  const [isValidating, setIsValidating] = useState(false);
  const [countryFlag, setCountryFalg] = useState(
    () => sessionStorage.getItem("countryFlag") || ""
  );

  const { isAuthorized } = useAppContext();
  const { user } = useUser();

  const userFullName = user?.user_metadata?.full_name;
  const userEmail = user?.user_metadata?.email;

  const navigate = useNavigate();

  const { isCreating, createBooking } = useCreateBooking();

  const {
    bookingBreakfastPrice,
    isBreakfastIncluded,
    setIsBreakfastIncluded,
    checkinDate,
    checkoutDate,
    numGuests,
    numNights,
    bookingTotalPrice,
    bookingExtrasPrice,
    product: { regularPrice, id, type, name },
  } = useBookingContenxt();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit({
    fullName,
    email,
    nationalID,
    nationality,
    observations,
  }) {
    // PREPARING GUESTS DATA
    const finalGuestData = {
      fullName,
      email,
      nationalID,
      nationality,
      countryFlag,
    };
    // PREPARING BOOKING DATA
    const finalBookingData = {
      startDate: new Date(checkinDate).toISOString(),
      endDate: new Date(checkoutDate).toISOString(),
      cabinPrice: regularPrice,
      totalPrice: bookingTotalPrice,
      status: "unconfirmed",
      hasBreakfast: isBreakfastIncluded,
      isPaid: false,
      observations: observations,
      extrasPrice: bookingExtrasPrice,
      cabinId: id,
      source: isAuthorized ? "user" : "anon",
      numGuests,
      numNights,
    };

    createBooking(
      {
        finalBookingData,
        finalGuestData,
        additionalData: { productName: name, productType: type },
      },
      {
        onSuccess: () => {
          setIsBreakfastIncluded(false);
          reset();
          sessionStorage.clear();

          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Your booking have been successfully created",
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              title: "swal-title",
              container: "swal-conainer",
              popup: "swal-popup",
              icon: "swal-icon",
            },
          });

          if (isAuthorized) {
            navigate("/stays");
            window.scrollTo({
              top: 0,
            });
            return;
          }

          navigate("/");
        },
      }
    );
  }

  async function handleNationalityBlur(e) {
    try {
      clearErrors("nationality");
      setIsValidating(true);
      const nationality = e.target.value;

      if (!nationality) return;

      const res = await fetch(
        `https://restcountries.com/v3.1/name/${nationality}`
      );
      if (!res.ok) throw new Error("Nationality is invalid");

      const countryData = await res.json();

      setCountryFalg(countryData[0].flags.svg);
      sessionStorage.setItem("inputNationality", e.target.value);
      sessionStorage.setItem("countryFlag", countryData[0].flags.svg);
    } catch (error) {
      setError("nationality", { type: "custom", message: error.message });
    } finally {
      setIsValidating(false);
    }
  }

  function handleInputBlur(e, input) {
    if (!e.target.value) return;
    sessionStorage.setItem(input, e.target.value);
  }

  useEffect(() => {
    const storedfullName = sessionStorage.getItem("inputfullName");
    const storedEmail = sessionStorage.getItem("inputEmail");
    const storedNationality = sessionStorage.getItem("inputNationality");
    const storedNationalID = sessionStorage.getItem("inputNationalID");
    const storedObservations = sessionStorage.getItem("inputObservations");

    setValue("fullName", userFullName || storedfullName || "");
    setValue("email", userEmail || storedEmail || "");
    setValue("nationality", storedNationality || "");
    setValue("nationalID", storedNationalID || "");
    setValue("observations", storedObservations || "");
  }, [setValue, userFullName, userEmail]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-7 text-sm"
    >
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isCreating}
          register={{
            ...register("fullName", { required: "fullName required" }),
          }}
          placeholder="Sohaib Benyamna"
          id="fullName"
          onBlur={(e) => handleInputBlur(e, "inputfullName")}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          disabled={isCreating}
          onBlur={(e) => handleInputBlur(e, "inputEmail")}
          placeholder="exmaple@gmail.com"
          id="email"
          register={{
            ...register("email", {
              required: "Email required",
              pattern: {
                message: "Invalid email",
                value: /\S+@\S+\.\S+/,
              },
            }),
          }}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          onBlur={handleNationalityBlur}
          disabled={isValidating || isCreating}
          id="nationality"
          register={{
            ...register("nationality", {
              required: "Nationality required",
              validate: () => errors?.nationality?.message,
            }),
          }}
          placeholder="Algerian"
        />
      </FormRow>

      <FormRow label="National id" error={errors?.nationalID?.message}>
        <Input
          disabled={isCreating}
          onBlur={(e) => handleInputBlur(e, "inputNationalID")}
          id="nationalID"
          register={{
            ...register("nationalID", { required: "National id required" }),
          }}
          placeholder="134572342348"
        />
      </FormRow>

      <FormRow label="Observations" error={errors?.observation?.message}>
        <TextArea
          placeholder="Optional"
          disabled={isCreating}
          id="observations"
          register={{
            ...register("observations"),
            onBlur: (e) => handleInputBlur(e, "inputObservations"),
          }}
        />
      </FormRow>

      <CheckBox
        disabled={isCreating}
        value={isBreakfastIncluded}
        handleChange={() => {
          const newState = !isBreakfastIncluded;
          setIsBreakfastIncluded(newState);
          sessionStorage.setItem("checkboxIsBreakfastIncluded", newState);
        }}
      >
        Add breakfast (
        {formatCurrency(bookingBreakfastPrice, i18n.language, selectedCurrency)}
        )
      </CheckBox>

      <div className="mt-5 w-full">
        <Button disabled={isValidating || isCreating} variation="tertiary">
          {isValidating || isCreating ? (
            <div className="p-2">
              <DotsLoader />
            </div>
          ) : (
            "Book"
          )}
        </Button>
      </div>
      {!isAuthorized && (
        <div className="">
          If you want to track your stays . please{" "}
          <Link
            onClick={() =>
              sessionStorage.setItem("redirectTo", window.location.href)
            }
            className="text-colorBrand600"
            to="/login"
          >
            login
          </Link>{" "}
          to your account or{" "}
          <Link className="text-colorBrand600" to="/signup">
            create
          </Link>{" "}
          one
        </div>
      )}
    </form>
  );
}

export default CreateBookingForm;
