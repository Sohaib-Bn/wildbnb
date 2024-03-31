import { BiDollar } from "react-icons/bi";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { t } from "i18next";
import { SUPPORTED_CURRENCIES } from "../utils/constants";

import Modal from "./Modal";
import SelectHorizontal from "./SelectHorizontal";
import Button from "./Button";

function CurrencyChanger({ showCurrencyIcon = true, underline = false }) {
  const style = `transition-all hover:underline flex items-center gap-1  ${
    underline ? "underline" : ""
  }`;
  const { selectedCurrency } = useAppContext();

  const { i18n } = useTranslation();

  // Listen for translations loaded event
  t(() => {
    i18n.loadNamespaces(["common"]);
  }, []);

  // Render the CurrencyChanger component only when translations are loaded

  return (
    <Modal>
      <Modal.Open opens="currencyChange">
        <button className={style}>
          {showCurrencyIcon && <BiDollar size={22} />}
          <span>{selectedCurrency}</span>
        </button>
      </Modal.Open>
      <Modal.Window name="currencyChange">
        <ChangeCurrencyForm />
      </Modal.Window>
    </Modal>
  );
}

function ChangeCurrencyForm({ onCloseModal }) {
  const { selectedCurrency, setSelectedCurrency } = useAppContext();

  const [currency, setCurrency] = useState(selectedCurrency);
  const { t } = useTranslation(["common"]);

  function handleSubmit(e) {
    e.preventDefault();
    setSelectedCurrency(currency);
    localStorage.setItem("selectedCurrency", currency);
    onCloseModal();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-rows-[minmax(auto,_4.1rem)_1fr] "
    >
      <header className=" px-6 font-semibold flex items-center justify-center border-b border-colorGrey200 text-colorBlackLight">
        <p>{t("common:currency")}</p>
      </header>
      <main className="flex flex-col gap-4 p-6">
        <h1 className="font-medium text-[1.4rem] text-colorGrey900">
          {t("common:choose_currency_form.title")}
        </h1>

        <div className="flex text-sm items-center justify-center px-12 mt-2">
          <SelectHorizontal
            value={currency}
            setValue={setCurrency}
            options={SUPPORTED_CURRENCIES}
          />
        </div>
        <footer className="pt-5 px-6 ">
          <div className="flex text-sm items-center justify-end">
            <Button>{t("common:confirm_button")}</Button>
          </div>
        </footer>
      </main>
    </form>
  );
}

export default CurrencyChanger;
