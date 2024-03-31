import { HiOutlineHome, HiOutlineHomeModern } from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { Divider } from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import DotsLoaderFullPage from "../../ui/DotsLoaderFullPage";

function Stay({ stay }) {
  const { convertedCurrency, isConverting, selectedCurrency } = useAppContext();
  const { i18n } = useTranslation();

  if (isConverting) return <DotsLoaderFullPage />;

  const {
    created_at,
    numGuests,
    numNights,
    startDate,
    endDate,
    status,
    extrasPrice,
    totalPrice,
    productPrice,
    hasBreakfast,
    guestName,
    productType,
    productName,
  } = stay;

  const extrasPriceConverted = extrasPrice * convertedCurrency;
  const totalPriceConverted = totalPrice * convertedCurrency;
  const productPriceConverted = productPrice * convertedCurrency;

  function getTypeIcon(type) {
    if (type === "room") return <HiOutlineHome size={30} />;
    if (type === "home") return <HiOutlineHomeModern size={30} />;
  }

  let tagColor = {
    text: "",
    bg: "",
  };

  if (status === "unconfirmed") {
    tagColor.text = "text-colorBlue700";
    tagColor.bg = "bg-colorBlue100";
  }
  if (status === "checked-in") {
    tagColor.text = "text-colorGreen700";
    tagColor.bg = "bg-colorGreen100";
  }
  if (status === "checked-out") {
    tagColor.text = "text-colorSilver700";
    tagColor.bg = "bg-colorSilver100";
  }

  return (
    <section className="flex flex-col gap-2">
      <Divider textAlign="left">
        <p className="text-xs text-colorGrey500">
          Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </Divider>
      <section className="max-h-[15rem] bg-colorWhite border border-colorGrey100 rounded-lg overflow-hidden">
        <header className="px-8 py-5 bg-colorBrand500 text-colorBrand75 font-medium text-xl flex items-center justify-between">
          <div className="flex items-center gap-4 text-[0.73rem]">
            {getTypeIcon(productType)}
            <p>
              {numNights} nights in Cabin <span>{productName}</span>
            </p>
          </div>
          <p className="text-[0.73rem]">
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>
        </header>
        <main className="flex flex-col gap-3 px-8 py-5 grow">
          <div className="grid grid-cols-[max-content,1fr] grid-rows-[auto,auto] gap-x-8 gap-y-3">
            <div
              className={`w-fit uppercase rounded-[100px] py-[0.4rem] px-[1.2rem] text-[0.65rem] ${tagColor.text} ${tagColor.bg} font-semibold row-start-1 row-end-3 self-center`}
            >
              {status}
            </div>
            <div className="flex items-center gap-4 text-[0.8rem]">
              <p className="font-medium">
                {guestName} + {+numGuests - 1} guests
              </p>
              <span className="text-colorGrey500">&bull;</span>
              <p className="text-colorGrey500 ">
                Breakfast included? {hasBreakfast ? "yes" : "no"}
              </p>
            </div>
            <div className="flex items-center gap-4 text-[0.8rem]">
              <p className="font-medium">
                <span className="font-cairo font-semibold">
                  {formatCurrency(
                    productPriceConverted,
                    i18n.language,
                    selectedCurrency
                  )}
                </span>
                <span> x </span>
                <span>{numNights} nights</span>
              </p>
              <span className="text-colorGrey500">&bull;</span>
              <p className="text-colorGrey500 ">
                <span>Extras </span>
                <span className="font-cairo font-semibold">
                  {formatCurrency(
                    extrasPriceConverted,
                    i18n.language,
                    selectedCurrency
                  )}
                </span>
              </p>
            </div>
          </div>
          <p className="self-end text-[0.8rem]  text-colorGrey500">
            Total price:{" "}
            <span className="font-cairo font-semibold">
              {formatCurrency(
                totalPriceConverted,
                i18n.language,
                selectedCurrency
              )}
            </span>
          </p>
        </main>
      </section>
    </section>
  );
}

export default Stay;
