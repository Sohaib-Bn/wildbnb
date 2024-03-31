import { useEffect, useState } from "react";
import RangeSlider from "../../../ui/RangeSlider";
import { useFiltersProductsContext } from "../../../context/FiltersProductsContext";
import { PRICE_RANGE_SLIDER_OPTIONS } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

function RangePriceFilter() {
  const { t } = useTranslation(["filters", "glossary"]);

  const [maxInputFocus, setMaxInputFocus] = useState(false);
  const [minInputFocus, setMinInputFocus] = useState(false);
  const {
    priceRange,
    setPriceRange,
    priceRangeSliderPercentage,
    setPriceRangeSliderPercentage,
  } = useFiltersProductsContext();

  useEffect(() => {
    // Calculate prices based on the percentage values
    const calculatedMinPrice = Math.round(
      (priceRangeSliderPercentage[0] / 100) *
        (PRICE_RANGE_SLIDER_OPTIONS[1] - PRICE_RANGE_SLIDER_OPTIONS[0]) +
        PRICE_RANGE_SLIDER_OPTIONS[0]
    );
    const calculatedMaxPrice = Math.round(
      (priceRangeSliderPercentage[1] / 100) *
        (PRICE_RANGE_SLIDER_OPTIONS[1] - PRICE_RANGE_SLIDER_OPTIONS[0]) +
        PRICE_RANGE_SLIDER_OPTIONS[0]
    );

    // Check if the calculated values are different from the current state values
    if (
      calculatedMinPrice !== priceRange[0] ||
      calculatedMaxPrice !== priceRange[1]
    ) {
      // Update the state only if there's a change to avoid infinite loop

      setPriceRange([calculatedMinPrice, calculatedMaxPrice]);
    }
  }, [priceRangeSliderPercentage, setPriceRange, priceRange]);

  const handleMinPriceChange = (e) => {
    const enteredValue = e.target.value;
    let newMinPrice;

    // Check if the entered value is a valid number
    if (!isNaN(enteredValue)) {
      newMinPrice = Number(enteredValue);
      setPriceRange([newMinPrice, priceRange[1]]);
      setPriceRangeSliderPercentage([
        ((newMinPrice - PRICE_RANGE_SLIDER_OPTIONS[0]) /
          (PRICE_RANGE_SLIDER_OPTIONS[1] - PRICE_RANGE_SLIDER_OPTIONS[0])) *
          100,
        priceRangeSliderPercentage[1],
      ]);
    } else {
      // If not a valid number, set it to the max slider value
      newMinPrice = priceRange[0];
    }
  };

  const handleMaxPriceChange = (e) => {
    const enteredValue = e.target.value;
    let newMaxPrice;

    // Check if the entered value is a valid number
    if (!isNaN(enteredValue)) {
      newMaxPrice = Number(enteredValue);

      setPriceRange([priceRange[0], newMaxPrice]);
      setPriceRangeSliderPercentage([
        priceRangeSliderPercentage[0],
        ((newMaxPrice - PRICE_RANGE_SLIDER_OPTIONS[0]) /
          (PRICE_RANGE_SLIDER_OPTIONS[1] - PRICE_RANGE_SLIDER_OPTIONS[0])) *
          100,
      ]);
    } else {
      // If not a valid number, set it to the max slider value
      newMaxPrice = priceRange[1];
    }
  };

  function handleMaxPriceBlur() {
    setMaxInputFocus(false);
    // Ensure that maxPrice is always greater than or equal to minPrice
    if (priceRange[1] < priceRange[0]) {
      setPriceRangeSliderPercentage([
        priceRangeSliderPercentage[0],
        priceRangeSliderPercentage[0],
      ]);
    }

    if (priceRange[1] > PRICE_RANGE_SLIDER_OPTIONS[1])
      setPriceRangeSliderPercentage([priceRangeSliderPercentage[0], 100]);
  }

  function handleMinPriceBlur() {
    setMinInputFocus(false);
    if (priceRange[0] > priceRange[1]) {
      setPriceRangeSliderPercentage([
        priceRangeSliderPercentage[1],
        priceRangeSliderPercentage[1],
      ]);
    }
    if (priceRange[0] < PRICE_RANGE_SLIDER_OPTIONS[0])
      setPriceRangeSliderPercentage([0, priceRangeSliderPercentage[1]]);
  }

  return (
    <div className="flex flex-col gap-4 border-b border-colorGrey200 py-6">
      <h1 className="font-medium text-[1.6rem] text-colorGrey900">
        {t("filters:filter.price_range.title")}
      </h1>
      <p className="font-light text-[14.3px]">
        {t("filters:filter.price_range.description")}
      </p>
      <div className="px-12 mt-2 flex flex-col gap-y-4">
        <div className="flex items-center justify-center">
          <RangeSlider
            rangeValue={priceRangeSliderPercentage}
            setValue={setPriceRangeSliderPercentage}
          />
        </div>

        <div className="flex justify-between items-center gap-6">
          <div
            className={`border-2 rounded-md border-colorGrey300 p-2 flex flex-col grow transition-all ${
              minInputFocus ? "border-colorBlackLight " : ""
            }`}
          >
            <p className="text-sm text-colorGrey900/70">
              {t("glossary:maximum")}
            </p>
            <div className="flex items-center gap-2">
              <p
                className={`text-lg text-colorGrey900/70  ${
                  priceRange[0] ? "text-colorGrey900/100 " : ""
                }`}
              >
                $
              </p>

              <input
                onBlur={handleMinPriceBlur}
                onFocus={() => setMinInputFocus(true)}
                className="focus: outline-none grow"
                type="text"
                value={priceRange[0]}
                onChange={handleMinPriceChange}
              />
            </div>
          </div>
          <div className="h-[1px] w-[1.3rem] bg-colorGrey400 " />
          <div
            className={`border-2 rounded-md border-colorGrey300 p-2 flex flex-col grow transition-all ${
              maxInputFocus ? "border-colorBlackLight " : ""
            }`}
          >
            <p className="text-sm text-colorGrey900/70">
              {" "}
              {t("glossary:minumum")}
            </p>
            <div className="flex items-center gap-2">
              <p
                className={`text-lg text-colorGrey900/70  ${
                  priceRange[1] ? "text-colorGrey900/100 " : ""
                }`}
              >
                $
              </p>

              <input
                onBlur={handleMaxPriceBlur}
                onFocus={() => setMaxInputFocus(true)}
                className="focus: outline-none grow"
                type="text"
                value={
                  priceRange[1] === PRICE_RANGE_SLIDER_OPTIONS[1] &&
                  !maxInputFocus
                    ? `${priceRange[1]}+`
                    : priceRange[1]
                }
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RangePriceFilter;
