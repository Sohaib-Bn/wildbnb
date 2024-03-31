import SelectHorizontal from "../../../ui/SelectHorizontal";
import { useFiltersProductsContext } from "../../../context/FiltersProductsContext";
import { PLACE_TYPE_OPTIONS } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

function PlaceTypeFilter() {
  const { placeType, setPlaceType } = useFiltersProductsContext();
  const { t } = useTranslation(["filters"]);
  return (
    <div className="flex flex-col gap-4 border-b border-colorGrey200 py-6">
      <h1 className="font-medium text-[1.6rem] text-colorGrey900">
        {t("filters:filter.place_type.title")}
      </h1>
      <p className="font-light text-[14.3px]">
        {t("filters:filter.place_type.description")}
      </p>
      <div className="flex items-center justify-center px-12 mt-2">
        <SelectHorizontal
          options={PLACE_TYPE_OPTIONS}
          value={placeType}
          setValue={setPlaceType}
        />
      </div>
    </div>
  );
}

export default PlaceTypeFilter;
