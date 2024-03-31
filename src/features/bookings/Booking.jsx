import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

import { useBookingContenxt } from "../../context/ValidatedBookingContext";
import { useAppContext } from "../../context/AppContext";

import Button from "../../ui/Button";
import ProductOverview from "./ProductOverview";
import ConfirmBookingForm from "./ConfirmBookingForm";
import DotsLoaderFullPage from "../../ui/DotsLoaderFullPage";

function Booking() {
  const { checkinDate, checkoutDate, numGuests, productId, productType } =
    useBookingContenxt();

  const { isConverting } = useAppContext();

  const navigate = useNavigate();

  return (
    <div className="px-16 py-10">
      {isConverting && <DotsLoaderFullPage opacity={true} />}
      <div className="flex items-center gap-1 text-colorBlackLight mb-8">
        <button
          onClick={() =>
            navigate(`/products/${productType}/${productId}#booking-section`)
          }
          className="font-light text-3xl rounded-full w-10 h-10 transition-all flex items-center justify-center ml-[-18px] hover:bg-colorGrey100 pr-2"
        >
          <span className="mt-[0.3rem]">&lt;</span>
        </button>
        <p className="font-medium text-[2.1rem] text-colorBlack">
          Confirm and pay
        </p>
      </div>
      <div className="grid grid-cols-[1.3fr,1fr] items-start gap-28 px-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-medium text-colorBlack">Your trip</h2>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-colorGrey800">Dates</h4>
                <div className="flex items-center gap-2">
                  <span>{format(checkinDate, "MMMM d yyyy")}</span>
                  <span>&rarr;</span>
                  <span>{format(checkoutDate, "MMMM d yyyy")}</span>
                </div>
              </div>
              <div className="text-lg">
                <Button
                  onClick={() =>
                    navigate(
                      `/products/${productType}/${productId}#booking-section`
                    )
                  }
                  variation="underline"
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-medium text-colorGrey800">
                  Guests
                </h4>
                <p>{numGuests} guests</p>
              </div>
              <div className="text-lg">
                <Button
                  onClick={() =>
                    navigate(
                      `/products/${productType}/${productId}#booking-section`
                    )
                  }
                  variation="underline"
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-medium text-colorBlack">
              Fill you information to book
            </h2>
            <ConfirmBookingForm />
          </div>
        </div>
        <ProductOverview />
      </div>
    </div>
  );
}

export default Booking;
