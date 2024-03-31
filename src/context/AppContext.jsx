import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useCurrencyConversion } from "../features/Products/useCurrencyConversion";
import { useUser } from "../features/auth/useUser";
import { SUPPORTED_CURRENCIES } from "../utils/constants";

import DotsLoaderFullPage from "../ui/DotsLoaderFullPage";

const AppContext = createContext();

function AppProvider({ children }) {
  const [searchParams] = useSearchParams();
  const {
    isLoading: isCheckingAuthentication,
    isAuthenticated,
    user,
  } = useUser();
  const [isAuthorized, setIsUserAuthorized] = useState(false);
  const [showMapProducts, setShowMapProducts] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    const sotredCurrency = localStorage.getItem("selectedCurrency");
    return sotredCurrency ? sotredCurrency : SUPPORTED_CURRENCIES[0].value;
  });

  const [isMapButtonVisible, setIsMapButtonVisible] = useState(true);
  const [showOnlyFavorite, setShowOnlyFavorite] = useState(
    searchParams.get("onlyFavorites") === "true" || false
  );

  const {
    isConverting,
    convertedCurrency,
    error: conversionError,
  } = useCurrencyConversion(selectedCurrency);

  const { i18n } = useTranslation();

  useEffect(() => {
    if (!isCheckingAuthentication && isAuthenticated && user)
      setIsUserAuthorized(true);

    if (!isCheckingAuthentication && (!isAuthenticated || !user))
      setIsUserAuthorized(false);
  }, [isCheckingAuthentication, isAuthenticated, user]);

  useEffect(() => {
    document.body.dir = i18n.dir();
    document
      .querySelector("html")
      .classList.remove("font-cairo", "font-poppins");
    document
      .querySelector("html")
      .classList.add(
        `${i18n.language === "ar" ? "font-cairo" : "font-poppins"}`
      );
  }, [i18n, i18n.language]);

  useEffect(() => {
    const currLng = i18n.language.split("-");
    if (currLng.length > 1) i18n.changeLanguage(currLng[0]);
  }, [i18n]);

  useEffect(() => {
    const redirectTo = sessionStorage.getItem("redirectTo");
    if (redirectTo) {
      sessionStorage.removeItem("redirectTo");
      window.location.href = redirectTo;
    }
  }, []);

  if (isCheckingAuthentication) return <DotsLoaderFullPage />;

  return (
    <AppContext.Provider
      value={{
        showOnlyFavorite,
        setShowOnlyFavorite,
        isMapButtonVisible,
        setIsMapButtonVisible,
        selectedCurrency,
        setSelectedCurrency,
        isConverting,
        convertedCurrency,
        conversionError,
        isAuthorized,
        showMapProducts,
        setShowMapProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const value = useContext(AppContext);

  if (value === undefined)
    throw new Error("AppContext have been used outside the provider");

  return value;
}

export default AppProvider;
