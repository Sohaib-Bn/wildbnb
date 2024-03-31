import { useTranslation } from "react-i18next";

function EmpyData({ label }) {
  const { t } = useTranslation(["common", "header"]);
  return (
    <div className="w-full h-full flex justify-center items-center text-lg ">
      {t("common:empty_data", { label: t(`header:products_type.${label}`) })}
    </div>
  );
}

export default EmpyData;
