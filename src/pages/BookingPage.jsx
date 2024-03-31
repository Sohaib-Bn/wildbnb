import { useEffect } from "react";
import Booking from "../features/bookings/Booking";
import ValidatedBookingProvider from "../context/ValidatedBookingContext";

function BookingPage() {
  useEffect(() => {
    document.title = "Confirm and pay";
    const headerApp = document.getElementById("header-app");
    const searchBar = document.querySelector(".header-home .search-bar");
    const user = document.querySelector(".header-home .user");

    headerApp.style.position = "relative";
    searchBar.classList.add("hidden");
    user.classList.add("hidden");

    return () => {
      document.title = "The Wild Oasis | Book Cabins &more";
      searchBar.classList.remove("hidden");
      user.classList.remove("hidden");
      headerApp.style.position = "sticky";
    };
  }, []);

  return (
    <ValidatedBookingProvider>
      <Booking />
    </ValidatedBookingProvider>
  );
}

export default BookingPage;
