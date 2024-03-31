import { createContext, useContext } from "react";

const BookingContext = createContext();

function BookingProvider({
  children,
  product,
  checkinDate,
  checkoutDate,
  guests,
}) {
  return (
    <BookingContext.Provider
      value={{ product, checkinDate, checkoutDate, guests }}
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

export default BookingProvider;
