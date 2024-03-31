import supabase, { supabaseAuth } from "./supabase";
import {
  differenceInDays,
  isAfter,
  isBefore,
  isWithinInterval,
} from "date-fns";

export async function createBooking({
  finalBookingData,
  finalGuestData,
  additionalData,
  isAuthorized,
  userId,
}) {
  // 1. CREATE NEW GUEST

  const { data: guestData, error: guestsError } = await supabase
    .from("guests")
    .insert([finalGuestData])
    .select()
    .single();

  if (guestsError) {
    console.error(guestsError.message);
    throw new Error("Guest could not be created");
  }

  //2. CRATE USER BOOKING

  if (isAuthorized && userId) {
    const { fullName: guestName } = finalGuestData;
    const { productType, productName } = additionalData;
    const {
      startDate,
      endDate,
      numNights,
      numGuests,
      status,
      totalPrice,
      extrasPrice,
      hasBreakfast,
      cabinPrice: productPrice,
    } = finalBookingData;

    const { error: userError } = await supabaseAuth
      .from("bookings")
      .insert([
        {
          startDate,
          endDate,
          numNights,
          numGuests,
          status,
          guestName,
          productPrice,
          totalPrice,
          extrasPrice,
          hasBreakfast,
          productType,
          productName,
          userId,
          guestId: guestData.id,
        },
      ])
      .select();

    if (userError) {
      console.error(userError.message);
      throw new Error("User booking could not be created");
    }
  }

  // 3. CREATE NEW BOOKING

  const { data: booking, error } = await supabase
    .from("bookings")
    .insert([
      {
        ...finalBookingData,
        guestId: guestData.id,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error.message);
    await supabase.from("guests").delete().eq("id", guestData.id);
    throw new Error("Booking could not be created ");
  }

  return booking;
}

export async function checkExistingBookings({
  productId,
  dateRange,
  validate = false,
  dateRangeSettings = {},
}) {
  if (validate) {
    const numNights = differenceInDays(
      new Date(dateRange.checkoutDate),
      new Date(dateRange.checkinDate)
    );
    const isnumNightsAuthorized =
      numNights <= dateRangeSettings.maxBookingLength &&
      numNights >= dateRangeSettings.minBookingLength;

    const isDateRangeAuthorized =
      isBefore(dateRange.checkinDate, dateRange.checkoutDate) &&
      isnumNightsAuthorized;

    if (!isDateRangeAuthorized) return false;
  }

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("startDate, endDate")
    .eq("cabinId", productId);

  const overlappingBookings = bookings.filter((booking) =>
    isDateRangeOverlap(
      booking.startDate,
      booking.endDate,
      dateRange.checkinDate,
      dateRange.checkoutDate
    )
  );

  if (error) {
    console.error(error.message);
    throw new Error("Booking could not be checked");
  }

  return !Boolean(overlappingBookings.length);
}

export async function getUserStays(userId) {
  const { data: bookings, error } = await supabaseAuth
    .from("bookings")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
    throw new Error("Booking could not be uploaded");
  }

  return bookings;
}

const isDateRangeOverlap = (start1, end1, start2, end2) => {
  return (
    (isBefore(start1, end2) && isAfter(end1, start2)) ||
    isWithinInterval(start1, { start: start2, end: end2 }) ||
    isWithinInterval(end1, { start: start2, end: end2 })
  );
};