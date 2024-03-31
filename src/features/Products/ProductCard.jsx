import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { formatCurrency } from "../../utils/helpers";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";
import LikeButton from "../../ui/ButtonLike";

function ProductCard({ productData }) {
  const { productType } = useParams();
  const [isHover, setIsHover] = useState(false);
  const { t, i18n } = useTranslation(["products", "header"]);
  const { convertedCurrency, selectedCurrency } = useAppContext();

  const navigate = useNavigate();

  const {
    id,
    location,
    maxCapacity,
    regularPrice,
    discount,
    image,
    isGuestsFavorite,
    averageRate,
  } = productData;

  const regularPriceConverted = regularPrice * convertedCurrency;
  const discountConverted = discount * convertedCurrency;

  function handleHeartMouseEnter() {
    setIsHover(false);
  }

  function handleHeartMouseLeave() {
    setIsHover(true);
  }

  function handleClick(e) {
    e.preventDefault();
    const buttonLike = e.target.closest(".button-like");

    if (buttonLike) return;

    navigate(`${id}`);
  }

  return (
    <Link
      onClick={handleClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="h-[18rem] flex flex-col gap-[0.6rem]"
    >
      <div className="relative overflow-hidden rounded-[15px]">
        <div
          onMouseEnter={handleHeartMouseEnter}
          onMouseLeave={handleHeartMouseLeave}
          className="button-like absolute top-3 right-5 z-30 text-colorWhite hover:scale-110 transition-all"
        >
          <LikeButton productId={id} type="icon" />
        </div>
        <img
          className={`scale-[1.2] rounded-[15px] transition-all duration-300 ${
            isHover ? "blur-[3px] brightness-90 scale-[1]" : ""
          }`}
          src={image}
          alt={t(`header:products_type.${productType}`)}
        />
        <div
          className={`transition-all text-colorBlack absolute inset-0 flex items-center justify-center ${
            isHover ? "translate-y-0" : "translate-y-[60%]"
          }`}
        >
          <FaEye size={45} color="white" />
        </div>
        {isGuestsFavorite && (
          <div className="px-[0.7rem] py-[0.35rem] bg-colorWhite rounded-full absolute top-3 left-3 text-xs font-medium  shadow-xl">
            {t("products:product_card.favGuest")}
          </div>
        )}
      </div>
      <div className="grow text-[0.9rem] flex flex-col gap-[2px]">
        <div className="flex items-center justify-between">
          <h5 className="">{location}</h5>
          <div className="flex justify-between gap-[5px] text-colorGrey900">
            <FaStar />
            <span className="relative bottom-[2.5px] font-medium">
              {averageRate}
            </span>
          </div>
        </div>
        <p className="text-colorGrey900/55">
          {t("products:product_card.capacity", { capacity: maxCapacity })}
        </p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-3">
            <p className="font-cairo font-semibold text-[1rem]">
              {t("products:product_card.price", {
                price: formatCurrency(
                  regularPriceConverted,
                  i18n.language,
                  selectedCurrency
                ),
              })}
            </p>
            {Boolean(discountConverted) && (
              <p className="font-cairo font-semibold line-through text-colorGrey900/55">
                {t("products:product_card.price", {
                  price: formatCurrency(
                    regularPriceConverted + discountConverted,
                    i18n.language,
                    selectedCurrency
                  ),
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
