import { useEffect, useMemo, useRef, useState } from "react";
import { useProduct } from "../product/useProduct";
import { useNavigate, useParams } from "react-router-dom";
import { useCheckBooking } from "./useCheckBooking";
import { FaLock } from "react-icons/fa";
import { useSettings } from "./useSettings";
import { DateRange } from "react-date-range";
import { addDays, differenceInDays, isSameDay, format } from "date-fns";

import Button from "../../ui/Button";
import DotsLoader from "../../ui/DotsLoader";
import tailwindConfig from "../../../tailwind.config";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";

import "../../styles/dateRangeDefault.css";
import "../../styles/dateRangeStyle.css";

const colorBrand800 = tailwindConfig.theme.colors.colorBrand800;

function BookingValidationForm({ setShowHeaderProductBookView }) {
  const { productId, productType } = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate();

  const [isMounted, setIsMounted] = useState(false);

  const [guests, setGuests] = useState(
    () => sessionStorage.getItem("inputGuests") || ""
  );
  const [dateRange, setDateRange] = useState(() => {
    const storedCheckinDate = sessionStorage.getItem("inputCheckinDate");
    const storedCheckoutDate = sessionStorage.getItem("inputCheckoutDate");

    const startDate = storedCheckinDate
      ? new Date(storedCheckinDate)
      : new Date();
    const endDate = storedCheckoutDate
      ? new Date(storedCheckoutDate)
      : new Date();

    return [{ startDate, endDate, key: "selection" }];
  });
  const [errors, setErrors] = useState({
    dateRange: "",
    guests: "",
  });

  const bookingDateRange = useMemo(
    () => ({
      checkinDate: dateRange[0].startDate,
      checkoutDate: dateRange[0].endDate,
    }),
    [dateRange]
  );

  const {
    product: { maxCapacity },
  } = useProduct(productId);

  const { isChecking, isDateRangeAvailable, checkDateRangeAvailablity } =
    useCheckBooking();
  const { settings = {} } = useSettings();
  const { maxBookingLength, minBookingLength } = settings;

  function validateGuestsInput(guestsValue) {
    setErrors((errs) => {
      return { ...errs, guests: "" };
    });

    if (!guestsValue || guestsValue > maxCapacity) {
      setErrors((errs) => {
        return { ...errs, guests: `${maxCapacity} guests maximum` };
      });
      return false;
    }

    return true;
  }

  function validateDateRangeInput(dateRange) {
    const numNights = differenceInDays(
      new Date(dateRange.checkoutDate),
      new Date(dateRange.checkinDate)
    );

    // clear the error
    setErrors((errs) => {
      return { ...errs, dateRange: "" };
    });

    if (numNights < minBookingLength || numNights > maxBookingLength) {
      setErrors((errs) => {
        return { ...errs, dateRange: `${minBookingLength}-nights minimum` };
      });
      return false;
    }

    return true;
  }

  function handleDateRangeChange(item) {
    setDateRange([item.selection]);
    const rdrInput = document.querySelectorAll(".rdrDateDisplayItem input");

    rdrInput[0].focus();
    rdrInput[1].focus();

    if (!isSameDay(item.selection.startDate, item.selection.endDate)) {
      const rdrMonthAndYearWrapper = document.querySelector(
        ".rdrMonthAndYearWrapper"
      );
      const rdrMonths = document.querySelector(".rdrMonths");
      const rdrDateInputActive = document.querySelector(".rdrDateInput input");
      rdrDateInputActive.setAttribute("id", "input-date-disactive");

      rdrMonthAndYearWrapper.style.display = "none";
      rdrMonths.style.display = "none";

      const newDateRange = {
        checkinDate: item.selection.startDate,
        checkoutDate: item.selection.endDate,
      };

      if (!validateDateRangeInput(newDateRange)) return;

      sessionStorage.setItem("inputCheckinDate", newDateRange.checkinDate);
      sessionStorage.setItem("inputCheckoutDate", newDateRange.checkoutDate);

      checkDateRangeAvailablity({ dateRange: newDateRange });
    }
  }

  function handleGuestsChange(e) {
    setGuests(e.target.value);
    validateGuestsInput(e.target.value);
    sessionStorage.setItem("inputGuests", e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const hasErrors =
      !validateDateRangeInput(bookingDateRange) || !validateGuestsInput(guests);

    if (hasErrors) return;

    navigate(
      `/book/${productType}/${productId}?guests=${guests}&checkin=${format(
        bookingDateRange.checkinDate,
        "yyyy-MM-dd"
      )}&checkout=${format(bookingDateRange.checkoutDate, "yyyy-MM-dd")}`
    );
  }

  useEffect(() => {
    const headerHeight = document.getElementById("header-app").offsetHeight;

    const options = {
      root: null, // use the viewport as the root
      rootMargin: `-${headerHeight}px`,
      threshold: 0, // consider an element visible if 50% or more of it is in the viewport
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setShowHeaderProductBookView(true);
        }
        if (entry.isIntersecting) {
          setShowHeaderProductBookView(false);
        }
      });
    }, options);

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    // Cleanup the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, [formRef, setShowHeaderProductBookView]);

  useEffect(() => {
    const handleClick = function (e) {
      const rdrWrapper = document.querySelector(".rdrCalendarWrapper");
      const rdrMonthAndYearWrapper = document.querySelector(
        ".rdrMonthAndYearWrapper"
      );
      const rdrMonths = document.querySelector(".rdrMonths");

      if (rdrWrapper && !rdrWrapper.contains(e.target)) {
        rdrMonthAndYearWrapper.style.display = "none";
        rdrMonths.style.display = "none";
        // rdrInput.classList.remove("rdrDateDisplayItemActive");
      }
      if (rdrWrapper && e.target.closest(".rdrDateInput")) {
        rdrMonthAndYearWrapper.style.display = "flex";
        rdrMonths.style.display = "flex";
        // rdrInput.style.border = "1px solid black";
      }
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (
      !isMounted &&
      !isDateRangeAvailable &&
      bookingDateRange.checkinDate &&
      bookingDateRange.checkoutDate
    ) {
      checkDateRangeAvailablity({ dateRange: bookingDateRange });
      setIsMounted(true);
    }
  }, [
    checkDateRangeAvailablity,
    bookingDateRange,
    isDateRangeAvailable,
    isMounted,
  ]);

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      id="booking-section"
      className="flex flex-col gap-8 text-sm sticky top-[var(--validation-form-sticky-top)] z-[1000]"
    >
      <h1 className="font-semibold text-[1.65rem] text-colorBlack">
        Request to book
      </h1>
      <div className="flex flex-col gap-6 w-[90%]">
        <FormRow orientaion="vertical" error={errors.dateRange}>
          <DateRange
            showMonthAndYearPickers={false}
            minDate={new Date()}
            maxDate={addDays(
              dateRange[0].startDate || new Date(),
              maxBookingLength
            )}
            rangeColors={[colorBrand800]}
            startDatePlaceholder="Checkin"
            endDatePlaceholder="Checkout"
            ranges={dateRange}
            onChange={handleDateRangeChange}
            initialFocusedRange={[0, 3]}
          />
        </FormRow>

        <FormRow orientaion="vertical" error={errors.guests}>
          <Input
            value={guests}
            onChange={handleGuestsChange}
            placeholder="Number of guests"
            min={1}
            type="number"
          />
        </FormRow>
        {!isChecking &&
          !isDateRangeAvailable &&
          bookingDateRange.checkinDate &&
          bookingDateRange.checkoutDate && (
            <div className="flex items-center gap-6 p-4 bg-colorRed100 text-colorRed800 rounded-lg">
              <FaLock size={35} />
              <span className="font-semibold">Date range is unavailable</span>
            </div>
          )}
        <div className="text-base">
          <Button disabled={!isDateRangeAvailable} variation="tertiary">
            {isChecking ? (
              <div className="p-2">
                <DotsLoader />
              </div>
            ) : (
              "Reserve"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default BookingValidationForm;
