import { cloneElement, createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CAPACITY_OPTIONS,
  DEFAULT_OPTION,
  PLACE_TYPE_OPTIONS,
  PRICE_RANGE_SLIDER_OPTIONS,
} from "../utils/constants";

const FiltersProductsContext = createContext();

function FiltersProductsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const placeTypeParam =
    searchParams.get("place_type") || PLACE_TYPE_OPTIONS[0].value;
  const priceRangeParam = [
    Number(searchParams.get("price_min")) || PRICE_RANGE_SLIDER_OPTIONS[0],
    Number(searchParams.get("price_max")) || PRICE_RANGE_SLIDER_OPTIONS[1],
  ];
  const maxCapacityParam =
    searchParams.get("max_capacity") || CAPACITY_OPTIONS[0].value;
  const amentitiesParam = searchParams
    .getAll("amentities")
    .filter((am) => am !== DEFAULT_OPTION);
  const priceRangeSliderPercentageParam = [
    ((priceRangeParam[0] - PRICE_RANGE_SLIDER_OPTIONS[0]) /
      (PRICE_RANGE_SLIDER_OPTIONS[1] - PRICE_RANGE_SLIDER_OPTIONS[0])) *
      100,
    ((priceRangeParam[1] - PRICE_RANGE_SLIDER_OPTIONS[0]) /
      (PRICE_RANGE_SLIDER_OPTIONS[1] - PRICE_RANGE_SLIDER_OPTIONS[0])) *
      100,
  ];

  const [priceRangeSliderPercentage, setPriceRangeSliderPercentage] = useState(
    priceRangeSliderPercentageParam
  );
  const [placeType, setPlaceType] = useState(placeTypeParam);
  const [priceRange, setPriceRange] = useState(priceRangeParam);
  const [maxCapacity, setMaxCapacity] = useState(maxCapacityParam);
  const [selectedAmentities, setSelectedAmentities] = useState(amentitiesParam);

  const filtersOjb = {
    placeType,
    priceRange:
      priceRange[0] !== PRICE_RANGE_SLIDER_OPTIONS[0] ||
      priceRange[1] !== PRICE_RANGE_SLIDER_OPTIONS[1]
        ? [
            priceRange[0] === PRICE_RANGE_SLIDER_OPTIONS[0]
              ? DEFAULT_OPTION
              : priceRange[0],
            priceRange[1] === PRICE_RANGE_SLIDER_OPTIONS[1]
              ? DEFAULT_OPTION
              : priceRange[1],
          ]
        : DEFAULT_OPTION,
    maxCapacity,
    selectedAmentities: selectedAmentities.length
      ? selectedAmentities
      : DEFAULT_OPTION,
  };
  const filtersCount = Object.values(filtersOjb).filter(
    (value) => value !== DEFAULT_OPTION
  ).length;

  function handleSubmit(e, onCloseModal) {
    e.preventDefault();

    searchParams.set(
      "place_type",
      filtersOjb.placeType.toLowerCase().replace(" ", "_")
    );

    if (filtersOjb.priceRange !== DEFAULT_OPTION) {
      searchParams.set(
        "price_min",
        filtersOjb.priceRange[0] === PRICE_RANGE_SLIDER_OPTIONS[0]
          ? DEFAULT_OPTION
          : priceRange[0]
      );
      searchParams.set(
        "price_max",
        filtersOjb.priceRange[1] === PRICE_RANGE_SLIDER_OPTIONS[1]
          ? DEFAULT_OPTION
          : priceRange[1]
      );
    } else {
      searchParams.set("price_min", DEFAULT_OPTION);
      searchParams.set("price_max", DEFAULT_OPTION);
    }

    searchParams.set("max_capacity", maxCapacity);

    if (filtersOjb.selectedAmentities !== DEFAULT_OPTION) {
      searchParams.delete("amentities");
      filtersOjb.selectedAmentities.forEach((imentitie) =>
        searchParams.append("amentities", imentitie)
      );
    } else searchParams.set("amentities", DEFAULT_OPTION);

    setSearchParams(searchParams);
    onCloseModal(e, null, { isSubmit: true });
  }

  function handleClear() {
    setPlaceType(PLACE_TYPE_OPTIONS[0].value);
    setPriceRangeSliderPercentage([0, 100]);
    setMaxCapacity(CAPACITY_OPTIONS[0].value);
    setSelectedAmentities([]);
  }

  function handleClearOnClose() {
    setPlaceType(placeTypeParam);
    setPriceRangeSliderPercentage(priceRangeSliderPercentageParam);
    setMaxCapacity(maxCapacityParam);
    setSelectedAmentities(amentitiesParam);
  }

  return (
    <FiltersProductsContext.Provider
      value={{
        placeType,
        priceRange,
        maxCapacity,
        selectedAmentities,
        setPlaceType,
        setPriceRange,
        setMaxCapacity,
        setSelectedAmentities,
        handleSubmit,
        handleClear,
        setPriceRangeSliderPercentage,
        priceRangeSliderPercentage,
        filtersCount,
        handleClearOnClose,
      }}
    >
      {cloneElement(children, { onCloseAction: handleClearOnClose })}
    </FiltersProductsContext.Provider>
  );
}

export function useFiltersProductsContext() {
  const value = useContext(FiltersProductsContext);

  if (value === undefined)
    throw new Error(
      "The context have been used out side the FiltersProductProvider"
    );
  return value;
}

export default FiltersProductsProvider;
