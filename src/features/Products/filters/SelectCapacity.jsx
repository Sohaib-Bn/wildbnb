import { useTranslation } from "react-i18next";
import { useFiltersProductsContext } from "../../../context/FiltersProductsContext";
import { CAPACITY_OPTIONS } from "../../../utils/constants";

function SelectCapacity() {
  const { maxCapacity, setMaxCapacity } = useFiltersProductsContext();
  const { t } = useTranslation(["glossary"]);

  function handleClick(e, value) {
    e.preventDefault();
    setMaxCapacity(value);
  }
  return (
    <div className="flex items-center gap-3 justify-start">
      {CAPACITY_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={(e) => handleClick(e, option.value)}
          className={`border border-colorGrey300 flex items-center justify-center bg-none transition-all hover:border-colorBlackLight text-base min-w-16 py-[0.6rem] px-3 rounded-full ${
            maxCapacity === option.value
              ? "bg-colorBlackLight text-colorGrey100"
              : ""
          }`}
        >
          {option.label === "any"
            ? `${t(`glossary:${option.label}`)}`
            : option.label}
        </button>
      ))}
    </div>
  );
}

export default SelectCapacity;
