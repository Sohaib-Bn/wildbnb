import { useFiltersProductsContext } from "../../../context/FiltersProductsContext";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Button from "../../../ui/Button";
import CapacityFilter from "./CapacityFilter";
import AmentitiesFilter from "./AmentitiesFilter";
import RangePriceFilter from "./PriceRangeFilter";
import PlaceTypeFilter from "./PlaceTypeFilter";

function FiltersForm({ onCloseModal }) {
  const { handleSubmit } = useFiltersProductsContext();

  return (
    <form
      onSubmit={(e) => handleSubmit(e, onCloseModal)}
      className="h-[570px] text-sm grid grid-rows-[minmax(auto,_4.5rem)_1fr_minmax(auto,_5.5rem)] "
    >
      <Header />
      <Main />
      <Footer />
    </form>
  );
}

function Header() {
  const { t } = useTranslation(["common", "header"]);
  return (
    <header className="px-6 text-[1rem] font-semibold flex items-center justify-center border-b border-colorGrey200 text-colorBlackLight">
      <p>{t("common:filter_button")}</p>
    </header>
  );
}

function Footer() {
  const { t } = useTranslation(["common"]);
  const { productType } = useParams();
  const { handleClear } = useFiltersProductsContext();

  return (
    <footer className="pt-5 px-6 border-t border-colorGrey200">
      <div className="flex text-sm items-center justify-between">
        <Button onClick={handleClear} type="reset" variation="secondary">
          {t("common:clear_button")}
        </Button>
        <Button>
          {t("common:filter_button")} {t(`header:products_type.${productType}`)}
        </Button>
      </div>
    </footer>
  );
}

function Main() {
  return (
    <main className="px-6 overflow-y-scroll">
      <PlaceTypeFilter />
      <RangePriceFilter />
      <CapacityFilter />
      <AmentitiesFilter />
    </main>
  );
}

export default FiltersForm;
