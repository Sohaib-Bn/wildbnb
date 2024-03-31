import { useSearchParams } from "react-router-dom";
import Switch from "../../ui/Swtitch";
import { useAppContext } from "../../context/AppContext";
import { useTranslation } from "react-i18next";

function FavoritesOnly() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showOnlyFavorite, setShowOnlyFavorite } = useAppContext();
  const { t } = useTranslation("header");

  function handleChecked() {
    const updatedValue = !showOnlyFavorite;

    setShowOnlyFavorite(updatedValue);

    searchParams.set("onlyFavorites", updatedValue);
    setSearchParams(searchParams);
  }

  return (
    <button
      onClick={handleChecked}
      className="text-colorGrey900 flex items-center justify-between border border-colorGrey300 bg-transparent rounded-[12px] gap-3 text-xs font-medium px-[0.9rem] h-[3.2rem]"
    >
      <span>{t("onlyFavorites_button")}</span>
      <Switch checked={showOnlyFavorite} />
    </button>
  );
}

export default FavoritesOnly;
