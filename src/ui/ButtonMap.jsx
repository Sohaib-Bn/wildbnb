import { useTranslation } from "react-i18next";
import { HiMap } from "react-icons/hi2";
import { FaListUl } from "react-icons/fa6";
import { useAppContext } from "../context/AppContext";

function ButtonMap() {
  const { t } = useTranslation("common");
  const { showMapProducts, setShowMapProducts } = useAppContext();
  return (
    <button
      onClick={() => setShowMapProducts((state) => !state)}
      className="shadow-2xl bg-colorBlackLight/90 text-colorWhite px-5 py-[15.5px]  font-medium transition-all duration-300 hover:scale-105 rounded-full flex items-center gap-2 text-[14.6px] "
    >
      <span>
        {showMapProducts ? t("show_list_button") : t("show_map_button")}
      </span>

      {showMapProducts ? <FaListUl size={22} /> : <HiMap size={22} />}
    </button>
  );
}

export default ButtonMap;
