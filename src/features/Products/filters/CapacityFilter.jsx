import { useTranslation } from "react-i18next";
import SelectCapacity from "./SelectCapacity";

function CapacityFilter() {
  const { t } = useTranslation(["filters"]);
  return (
    <div className="flex flex-col gap-4 border-b border-colorGrey200 py-6">
      <h1 className="font-medium text-[1.4rem] text-colorGrey900">
        {t("filters:filter.capacity.title")}
      </h1>
      <p className="font-light text-[13px]">
        {t("filters:filter.capacity.description")}
      </p>
      <div className="mt-2">
        <SelectCapacity />
      </div>
    </div>
  );
}

export default CapacityFilter;
