import { IoIosSnow } from "react-icons/io";
import { TbSnowflakeOff } from "react-icons/tb";

import { RiWifiLine } from "react-icons/ri";
import { RiWifiOffLine } from "react-icons/ri";
import { HiOutlineHome } from "react-icons/hi2";
import { HiOutlineHomeModern } from "react-icons/hi2";

import BookingValidationForm from "../bookings/BookingValidationForm";
import GuestsFavorite from "../../ui/GuestsFavorite";
import { useTranslation } from "react-i18next";
import { useProductReviews } from "./useProductReviews";
import { useAppContext } from "../../context/AppContext";
import { useProduct } from "./useProduct";
import { formatCurrency, handleLinkScroll } from "../../utils/helpers";
import { FaStar } from "react-icons/fa";
import { Divider } from "@mui/material";

function Details({ setShowHeaderProductBookView }) {
  return (
    <div className="grid grid-cols-[1fr_1.2fr] gap-10 my-2">
      <div className="flex flex-col gap-8">
        <ProductOverview />
        <Divider />
        <ProductDetails />
        <Divider />
      </div>
      <div className="pl-12 flex flex-col justify-center">
        <BookingValidationForm
          setShowHeaderProductBookView={setShowHeaderProductBookView}
        />
      </div>
    </div>
  );
}

export default Details;

function ProductOverview() {
  const {
    product: {
      regularPrice,
      discount,
      maxCapacity,
      location,
      averageRate,
      isGuestsFavorite,
    },
  } = useProduct();

  const { i18n } = useTranslation(["header", "common"]);
  const { convertedCurrency, selectedCurrency } = useAppContext();
  const { count } = useProductReviews();

  const regularPriceConverted = regularPrice * convertedCurrency;
  const discountConverted = discount * convertedCurrency;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-colorBlack">
          Located in {location}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-[5px] text-lg text-colorGrey900">
            <FaStar className="relative bottom-[1.5px]" />
            <span className="font-medium">{averageRate}</span>
          </div>
          <span>&bull;</span>
          <a
            onClick={handleLinkScroll}
            className="font-medium underline hover:text-colorBlack transition-all"
            href="#reviews-section"
          >
            {count} reviews
          </a>
        </div>
      </div>
      <p>Fits up {maxCapacity} guests</p>
      <div className="flex text-xl items-center gap-4 mt-1">
        <p className="font-cairo font-semibold text-colorBlack">
          {formatCurrency(
            regularPriceConverted,
            i18n.language,
            selectedCurrency
          )}{" "}
          night
        </p>
        {Boolean(discountConverted) && (
          <p className="font-cairo font-semibold line-through text-colorGrey900/55">
            {formatCurrency(
              discountConverted + regularPrice,
              i18n.language,
              selectedCurrency
            )}{" "}
            night
          </p>
        )}
      </div>
      {isGuestsFavorite && (
        <div className="mt-6">
          <GuestsFavorite type={""} />
        </div>
      )}
    </div>
  );
}

function ProductDetails() {
  const {
    product: { type, amentities },
  } = useProduct();
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold text-colorBlack text-2xl">Details</h2>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium text-colorBlack">Proprety type</h3>
        <div className="flex items-center gap-3 text-xl text-colorBlack">
          <span className="text-[1.7rem]">{getTypeIcon(type)}</span>
          <span className="capitalize">
            {type === "home" ? "Entire home" : type}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium text-colorBlack">
          Essential amentities
        </h3>
        <ul className="grid grid-cols-2">
          <li
            className={`flex items-center gap-3 text-xl ${
              !amentities.includes("wifi") ? "line-through" : ""
            }`}
          >
            <span className="text-[1.7rem] text-colorBlack">
              {amentities.includes("wifi") ? <RiWifiLine /> : <RiWifiOffLine />}
            </span>
            <span>Wifi</span>
          </li>
          <li
            className={`flex items-center gap-3 text-xl ${
              !amentities.includes("conditioner") ? "line-through" : ""
            }`}
          >
            <span className="text-[1.7rem] text-colorBlack">
              {amentities.includes("conditioner") ? (
                <IoIosSnow />
              ) : (
                <TbSnowflakeOff />
              )}
            </span>
            <span>Air conditioner</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function getTypeIcon(type) {
  if (type === "room") return <HiOutlineHome />;
  if (type === "home") return <HiOutlineHomeModern />;
}
