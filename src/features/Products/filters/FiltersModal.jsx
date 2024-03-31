import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import FiltersProductsProvider, {
  useFiltersProductsContext,
} from "../../../context/FiltersProductsContext";

import Modal from "../../../ui/Modal";
import FiltersForm from "./FiltersForm";

function FiltersModal() {
  return (
    <FiltersProductsProvider>
      <Modal>
        <Modal.Open opens="filters">
          <FiltersButton />
        </Modal.Open>
        <Modal.Window name="filters">
          <FiltersForm />
        </Modal.Window>
      </Modal>
    </FiltersProductsProvider>
  );
}

function FiltersButton({ onClick }) {
  const { filtersCount } = useFiltersProductsContext();
  const { t } = useTranslation(["common"]);
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`text-colorGrey900 flex items-center bg-transparent px-[0.9rem] h-[3.2rem] rounded-[12px] gap-3 text-[12.5px] font-medium ${
          filtersCount
            ? "border-colorGrey900 border-[2px]"
            : "border-colorGrey300 border"
        }`}
      >
        <TbAdjustmentsHorizontal className="text-[1.4rem]" />
        <span>{t("common:filter_button")}</span>
      </button>
      {Boolean(filtersCount) && (
        <div className="cursor-pointer absolute right-0 top-0 bg-colorGrey900 rounded-full flex items-center justify-center w-[22px] h-[22px] border-[2.5px] text-[11px] font-semibold text-colorWhite translate-x-[5px] -translate-y-[6px]">
          {filtersCount}
        </div>
      )}
    </div>
  );
}

export default FiltersModal;
