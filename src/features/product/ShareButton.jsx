import { useProduct } from "./useProduct";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { formatCurrency } from "../../utils/helpers";
import { useAppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { GoShare } from "react-icons/go";

import { FaFacebookSquare, FaWhatsappSquare, FaTelegram } from "react-icons/fa";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CopyPathButton from "../../ui/CapyPathButton";

function ShareButton() {
  return (
    <Modal>
      <Modal.Open opens="share">
        <Button variation="underline">
          <GoShare size={20} />
          <span>Share</span>
        </Button>
      </Modal.Open>
      <Modal.Window name="share" maxWidth="max-content">
        <ShareForm />
      </Modal.Window>
    </Modal>
  );
}

export default ShareButton;

function ShareForm() {
  const { productId } = useParams();
  const { product } = useProduct(productId);
  const { convertedCurrency, selectedCurrency } = useAppContext();
  const { i18n } = useTranslation();

  // const shareUrl = "https://sodev.live/";
  const shareUrl = window.location.href;

  const { maxCapacity, image, name, regularPrice, averageRate } = product;
  const regularPriceConverted = regularPrice * convertedCurrency;

  return (
    <div className="grid grid-rows-[minmax(auto,_4.5rem)_1fr]">
      <header className="px-6 text-[1rem] font-semibold flex items-center justify-center border-b border-colorGrey200 text-colorBlackLight">
        <p>Share</p>
      </header>
      <main className="p-6 flex flex-col gap-7">
        <h1 className="text-[1.45rem] text-colorBlackLight font-medium">
          Share this place
        </h1>
        <div className="flex items-center gap-5 text-base text-colorBlackLight">
          <figure className="w-20 h-[4.5rem]">
            <img
              className="h-full w-full object-cover rounded-md"
              alt="product"
              src={image}
            />
          </figure>
          <div className="flex items-center gap-2">
            <p>{name}</p>
            <span>&bull;</span>
            <div className="flex items-center gap-1">
              <span className="mb-1 text-sm">
                <FaStar />
              </span>
              <span>{averageRate}</span>
            </div>
            <span>&bull;</span>
            <p>{maxCapacity} guests</p>
            <span>&bull;</span>
            <p>
              {formatCurrency(
                regularPriceConverted,
                i18n.language,
                selectedCurrency
              )}{" "}
              night
            </p>
          </div>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-6 items-center text-colorBlackLight text-base font-medium">
          <CopyPathButton />
          <FacebookShareButton
            className="flex items-center gap-3 transition-all !p-4 rounded-xl !border-colorGrey300 !border-solid !border-[1px] hover:!bg-colorGrey100"
            url={shareUrl}
          >
            <span className="text-[1.4rem]">
              <FaFacebookSquare />
            </span>
            <span>Facebook</span>
          </FacebookShareButton>
          <TelegramShareButton
            className="flex items-center gap-3 transition-all !p-4 rounded-xl !border-colorGrey300 !border-solid !border-[1px] hover:!bg-colorGrey100"
            url={shareUrl}
          >
            <span className="text-[1.4rem]">
              <FaTelegram />
            </span>
            <span>Telegram</span>
          </TelegramShareButton>
          <WhatsappShareButton
            className="flex items-center gap-3 transition-all !p-4 rounded-xl !border-colorGrey300 !border-solid !border-[1px] hover:!bg-colorGrey100"
            url={shareUrl}
          >
            <span className="text-[1.4rem]">
              <FaWhatsappSquare />
            </span>
            <span>Whatsapp</span>
          </WhatsappShareButton>
        </div>
      </main>
    </div>
  );
}
