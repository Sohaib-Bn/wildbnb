import { createPortal } from "react-dom";
import { formatCurrency, handleLinkScroll } from "../../utils/helpers";
import { useProductReviews } from "./useProductReviews";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";
import { FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useProduct } from "./useProduct";

export function HeaderProduct({ showHeaderProductBookView }) {
  const {
    product: { regularPrice, averageRate },
  } = useProduct();
  const { productId } = useParams();
  const { count } = useProductReviews(productId);
  const { i18n } = useTranslation();
  const { selectedCurrency, convertedCurrency } = useAppContext();

  const regularPriceConverted = regularPrice * convertedCurrency;

  return createPortal(
    <div className="header-product items-center justify-between flex py-4 px-20 h-full border-b border-colorGrey200">
      <ul className="flex items-center gap-6">
        {["Overview", "Location", "Reviews"].map((op, index) => (
          <li key={index}>
            <a
              onClick={handleLinkScroll}
              className="hover:text-colorBlack transition-all"
              href={`#${op.toLocaleLowerCase()}-section`}
            >
              {op}
            </a>
          </li>
        ))}
      </ul>
      {showHeaderProductBookView && (
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-[0.15rem]">
            <p className="font-medium text-colorBlack text-[17px]">
              {formatCurrency(
                regularPriceConverted,
                i18n.language,
                selectedCurrency
              )}{" "}
              <span className="font-normal text-sm">night</span>
            </p>
            <div className="flex items-center text-[14px] gap-1">
              <div className="flex items-center gap-[5px]  text-colorGrey700">
                <FaStar className="relative bottom-[1.5px]" />
                <span className="font-medium ">{averageRate}</span>
              </div>
              <span>&bull;</span>
              <a
                onClick={handleLinkScroll}
                className="underline hover:text-colorBlack transition-all"
                href="#reviews-section"
              >
                {count} reviews
              </a>
            </div>
          </div>
          <a
            className="text-colorWhite px-8 py-[14px] font-medium text-[17px] transition-colors duration-300 bg-colorBrand800 hover:bg-colorBrand900 rounded-lg"
            onClick={handleLinkScroll}
            href="#booking-section"
          >
            Book
          </a>
        </div>
      )}
    </div>,
    document.getElementById("header-app")
  );
}
