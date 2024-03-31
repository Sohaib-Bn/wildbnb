import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSettings } from "../features/bookings/useSettings";
import { useProduct } from "../features/product/useProduct";
import { useCheckBooking } from "../features/bookings/useCheckBooking";

import DotsLoaderFullPage from "../ui/DotsLoaderFullPage";
import { differenceInDays } from "date-fns";
import { useAppContext } from "./AppContext";

const BookingContext = createContext();

function ValidatedBookingProvider({ children }) {
  const [isMounted, setIsMounted] = useState(false);
  const [searchParams] = useSearchParams();
  const { productId, productType } = useParams();
  const [isAuthorizedToBook, setIsAuthrizedToBook] = useState(true);
  const { convertedCurrency } = useAppContext();
  const [isBreakfastIncluded, setIsBreakfastIncluded] = useState(() => {
    const sotredData =
      sessionStorage.getItem("checkboxIsBreakfastIncluded") === "false"
        ? false
        : true;
    return sotredData ? sotredData : false;
  });

  const navigate = useNavigate();

  const { isLoading, product = {} } = useProduct();
  const { isChecking, isDateRangeAvailable, checkDateRangeAvailablity } =
    useCheckBooking();
  const { isLoading: isLoadingSetting, settings = {} } = useSettings();

  const numGuests = searchParams.get("guests");
  const checkinDate = searchParams.get("checkin");
  const checkoutDate = searchParams.get("checkout");

  const { maxCapacity, regularPrice } = product;
  const { maxBookingLength, minBookingLength, breakfastPrice } = settings;

  // BOOKING VALIDATION

  const isCapacityAuthorized = numGuests <= maxCapacity;
  const isBookingAvailable = isDateRangeAvailable && isCapacityAuthorized;

  useEffect(() => {
    if (
      !isMounted &&
      !isDateRangeAvailable &&
      checkinDate &&
      checkoutDate &&
      maxBookingLength &&
      minBookingLength
    ) {
      checkDateRangeAvailablity({
        dateRange: { checkinDate, checkoutDate },
        validate: true,
        dateRangeSettings: {
          minBookingLength,
          maxBookingLength,
        },
      });
      setIsMounted(true);
    }
  }, [
    checkDateRangeAvailablity,
    isDateRangeAvailable,
    isMounted,
    checkinDate,
    checkoutDate,
    maxBookingLength,
    minBookingLength,
  ]);

  useEffect(() => {
    if (
      (!isBookingAvailable && !isChecking && isMounted) ||
      !numGuests ||
      !checkinDate ||
      !checkoutDate
    ) {
      setIsAuthrizedToBook(false);
      navigate(`/products/${productType}/${productId}#booking-section`);
    }
  }, [
    isBookingAvailable,
    navigate,
    productType,
    productId,
    isChecking,
    isMounted,
    numGuests,
    checkinDate,
    checkoutDate,
  ]);

  if (isLoading || isChecking || isLoadingSetting)
    return <DotsLoaderFullPage />;

  if (!isAuthorizedToBook) return null;

  // BOOKING DATA
  const numNights = differenceInDays(
    new Date(checkoutDate),
    new Date(checkinDate)
  );

  const breakfastPriceConverted = breakfastPrice * convertedCurrency;
  const regularPriceConverted = regularPrice * convertedCurrency;

  const bookingBreakfastPrice = breakfastPriceConverted * numGuests;

  const bookingRegularPrice = numNights * regularPriceConverted;
  const bookingExtrasPrice = isBreakfastIncluded ? bookingBreakfastPrice : 0;
  const bookingTotalPrice = bookingRegularPrice + bookingExtrasPrice;

  return (
    <BookingContext.Provider
      value={{
        product,
        checkinDate,
        checkoutDate,
        numGuests,
        productId,
        productType,
        maxBookingLength,
        minBookingLength,
        breakfastPrice,
        numNights,
        isBreakfastIncluded,
        setIsBreakfastIncluded,
        bookingBreakfastPrice,
        bookingRegularPrice,
        bookingExtrasPrice,
        bookingTotalPrice,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContenxt() {
  const value = useContext(BookingContext);

  if (value === undefined)
    throw new Error(
      "BookingContext have been used out side the BookingProvider"
    );

  return value;
}

export default ValidatedBookingProvider;
