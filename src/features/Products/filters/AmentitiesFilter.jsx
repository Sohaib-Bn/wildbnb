import { useTranslation } from "react-i18next";
import SelectAmentities from "./SelectAmentities";

function AmentitiesFilter() {
  const { t } = useTranslation(["filters"]);
  return (
    <div className="flex flex-col gap-4 border-b border-colorGrey200 py-6">
      <h1 className="font-medium text-[1.6rem] text-colorGrey900">
        {t("filters:filter.amentities.title")}
      </h1>
      <p className="font-light text-[14.3px]">
        {t("filters:filter.amentities.description")}
      </p>
      <div className="mt-2">
        <SelectAmentities />
      </div>
    </div>
  );
}

export default AmentitiesFilter;
