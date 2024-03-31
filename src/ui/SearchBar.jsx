import { FaMagnifyingGlass } from "react-icons/fa6";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PiMapPin } from "react-icons/pi";
import { DEFAULT_OPTION } from "../utils/constants";

import getPlaceSuggestions from "../services/apiPlaceSuggestions";

function SearchBar() {
  const { t } = useTranslation(["header", "common"]);
  const ref = useOutsideClick(() => {
    setIsActive(false);
    setSuggestions([]);
  });
  const { productType } = useParams();
  const [searchParams] = useSearchParams();
  const [isActive, setIsActive] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [locationQuery, setLocationQuery] = useState(
    searchParams.get("location") === DEFAULT_OPTION
      ? ""
      : searchParams.get("location") || ""
  );

  const navigate = useNavigate();

  const handleInputChange = async (event) => {
    const searchQuery = event.target.value;
    setLocationQuery(searchQuery);
    setIsActive(true);

    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    // Fetch suggestions when the input changes
    const newSuggestions = await getPlaceSuggestions(searchQuery);
    setSuggestions(newSuggestions);
  };

  function handleFormClick(e) {
    const currBtn = e.target.closest("form").querySelector("input");
    if (isActive) return;
    currBtn?.focus();
    setIsActive(true);
  }

  function handleSuggestionClick(e, suggestion) {
    setLocationQuery(suggestion);
    const currBtn = e.target.closest("form").querySelector("input");

    navigate(`/products/${productType}?location=${suggestion}`);

    setIsActive(false);
    currBtn.blur();
  }

  function handleSubmit(e) {
    e.preventDefault();

    const currBtn = e.target.closest("form").querySelector("input");

    if (locationQuery !== "")
      navigate(`/products/${productType}?location=${locationQuery}`);
    else navigate(`/products/${productType}?location=any`);

    setIsActive(false);
    currBtn.blur();
  }

  return (
    <form
      onClick={handleFormClick}
      ref={ref}
      onSubmit={handleSubmit}
      className={`search-bar relative cursor-pointer px-3 origin-left flex justify-between items-center transition-all duration-300 bg-colorGrey0 border border-colorGrey200 shadow hover:shadow-md shadow-slate-50 w-[24rem] rounded-full text-[15px] ${
        isActive ? "w-[35rem] shadow-sm" : ""
      }`}
    >
      <div className="grow py-[15px] px-3">
        <input
          name="location"
          type="text"
          className={`bg-transparent block w-full `}
          placeholder={t("search_bar_placeholder", { ns: "header" })}
          onChange={handleInputChange}
          value={locationQuery}
        />

        {isActive && locationQuery && suggestions.length > 0 && (
          <div className="hide-scrollbar bg-colorGrey50 absolute top-[120%] max-h-[450px] overflow-hidden overflow-y-auto left-0 rounded-[30px] shadow-boxShodwoPupop py-5 flex flex-col">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="text-[16px] p-5 text-colorBlack cursor-pointer transition-all hover:bg-colorGrey100 flex items-center gap-5"
                onClick={(e) => handleSuggestionClick(e, suggestion)}
              >
                <div className="bg-colorGrey250 p-3 text-[1.6rem] rounded-xl">
                  <PiMapPin />
                </div>
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        className={`h-9 w-9 bg-colorBrand700 rounded-full flex justify-center items-center text-colorWhite transition-all duration-300 hover:bg-colorBrand800 ${
          isActive ? "w-[6rem] justify-start gap-2" : ""
        }`}
      >
        <FaMagnifyingGlass color="white" />
        <span
          className={`transition-all duration-300 ${
            isActive
              ? "block opacity-100 "
              : "hidden opacity-0 translate-x-[13rem]"
          }`}
        >
          {t("search_button", { ns: "header" })}
        </span>
      </button>
    </form>
  );
}

export default SearchBar;
