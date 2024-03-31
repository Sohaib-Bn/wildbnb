import { Divider } from "@mui/material";
import { FaStar } from "react-icons/fa6";
import { useProductReviews } from "../product/useProductReviews";
import { formatCurrency } from "../../utils/helpers";
import { useAppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import { useBookingContenxt } from "../../context/ValidatedBookingContext";

import CurrenyChanger from "../../ui/CurrencyChanger";
import Modal from "../../ui/Modal";
import { useSettings } from "./useSettings";

function ProductOverview() {
  const { count } = useProductReviews();
  const { convertedCurrency, selectedCurrency } = useAppContext();
  const { i18n } = useTranslation();

  const {
    product,
    numNights,
    bookingRegularPrice,
    bookingExtrasPrice,
    bookingTotalPrice,
  } = useBookingContenxt();

  const { image, name, type, averageRate, regularPrice, location } = product;

  const regularPriceConverted = regularPrice * convertedCurrency;

  return (
    <div className="flex flex-col gap-7 rounded-xl border border-colorGrey200 p-6 sticky top-[80px]">
      <div className="flex items-center gap-5">
        <figure className="w-[7.3rem] h-[6.5rem]">
          <img
            className="w-full h-full object-cover rounded-xl"
            src={image}
            alt="product"
          />
        </figure>
        <div className="flex flex-col gap-1">
          <h1 className="font-medium text-colorBlack text-[1.105rem]">
            {name}
          </h1>
          <div className="flex items-center gap-1">
            <p className="capitalize text-[0.95rem] text-colorGrey700 font-normal">
              {type}
            </p>
            <span>&bull;</span>
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-colorBlackLight mb-1 text-sm">
              <FaStar />
            </span>
            <span className="font-medium text-colorBlackLight">
              {averageRate}
            </span>
            <span className="text-[0.95rem] text-colorGrey700 font-normal">
              ({count} reviews)
            </span>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-6">
        <h1 className="font-medium text-2xl text-colorBlackLight">
          Price details
        </h1>
        <div className="flex items-center justify-between text-[1.05rem]">
          <p className="font-cairo font-semibold">
            {formatCurrency(
              regularPriceConverted,
              i18n.language,
              selectedCurrency
            )}{" "}
            x {numNights} nights
          </p>
          <p className="font-cairo font-semibold">
            {formatCurrency(
              bookingRegularPrice,
              i18n.language,
              selectedCurrency
            )}
          </p>
        </div>
        <div className="flex items-center justify-between text-[1.05rem]">
          <Extras />

          <p className="font-cairo font-semibold">
            {Boolean(bookingExtrasPrice) ? (
              formatCurrency(
                bookingExtrasPrice,
                i18n.language,
                selectedCurrency
              )
            ) : (
              <span className="mr-6">&#x2015;</span>
            )}
          </p>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-[1.1rem] font-semibold text-colorBlack">
          <p className="flex items-center gap-1 ">
            <span>Total</span>
            (<CurrenyChanger showCurrencyIcon={false} underline={true} />)
          </p>
          <p className="font-cairo font-semibold">
            {formatCurrency(bookingTotalPrice, i18n.language, selectedCurrency)}
          </p>
        </div>
        <HowToPay />
      </div>
    </div>
  );
}

function Extras() {
  return (
    <Modal>
      <Modal.Open opens="Extras">
        <button className="underline self-start">Extras</button>
      </Modal.Open>
      <Modal.Window name="Extras" maxWidth="30rem" closeButton={false}>
        <ExtrasModal />
      </Modal.Window>
    </Modal>
  );
}

function ExtrasModal() {
  const { i18n } = useTranslation();
  const { convertedCurrency, selectedCurrency } = useAppContext();

  const {
    settings: { breakfastPrice },
  } = useSettings();

  const { isBreakfastIncluded, numGuests, bookingExtrasPrice } =
    useBookingContenxt();
  const breakfastPriceConverted = breakfastPrice * convertedCurrency;

  const bookingBreakfastPrice = breakfastPriceConverted * numGuests;

  return (
    <div className="p-6 flex flex-col gap-3">
      <h1 className="text-lg font-medium">Extras price details</h1>
      <div className="flex flex-col gap-2">
        <p>Breakfast {!isBreakfastIncluded ? "(not included)" : ""}</p>
        <div className="flex items-center justify-between">
          {isBreakfastIncluded ? (
            <>
              <p className="font-cairo font-semibold">
                {formatCurrency(
                  breakfastPriceConverted,
                  i18n.language,
                  selectedCurrency
                )}{" "}
                x {numGuests} guests
              </p>
              <p className="font-cairo font-semibold">
                {formatCurrency(
                  bookingBreakfastPrice,
                  i18n.language,
                  selectedCurrency
                )}
              </p>
            </>
          ) : (
            ""
          )}
        </div>
        <Divider />
        <div className="mt-2 flex items-center justify-between text-md font-semibold text-colorBlack">
          <p className="flex items-center gap-1 ">Total</p>
          <p className="font-cairo font-semibold text-lg">
            {formatCurrency(
              bookingExtrasPrice,
              i18n.language,
              selectedCurrency
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function HowToPay() {
  return (
    <Modal>
      <Modal.Open opens="howToPay">
        <button className="underline self-start">How to pay</button>
      </Modal.Open>
      <Modal.Window name="howToPay" maxWidth="25rem" closeButton={false}>
        <HowToPayModal />
      </Modal.Window>
    </Modal>
  );
}

function HowToPayModal() {
  return (
    <div className="p-6">
      <p>Payment will be collected on delivery</p>
    </div>
  );
}

export default ProductOverview;
