export const RESULT_PER_PAGE = 8;
export const REVIEWS_PER_PAGE = 5;
export const NUM_CAPACITY_OPTIONS = 9;
export const DEFAULT_OPTION = "any";
export const PRICE_RANGE_SLIDER_OPTIONS = [50, 1500];
export const PLACE_TYPE_OPTIONS = [
  { label: "any_type", value: "any" },
  { label: "room", value: "room" },
  { label: "entire_home", value: "home" },
];
export const AMNETITIES_OPTIONS = [
  {
    label: "wifi",
    value: "wifi",
  },
  { label: "air_conditioner", value: "conditioner" },
];

export const CAPACITY_OPTIONS = Array.from(
  { length: NUM_CAPACITY_OPTIONS },
  (_, index) => {
    if (index === 0) return { label: "any", value: "any" };
    if (index === NUM_CAPACITY_OPTIONS - 1)
      return { label: `${index}+`, value: `${index}+` };
    return { label: index, value: `${index}` };
  }
);

export const SUPPORTED_LANGUAGES = {
  en: { code: "en", name: "English", countryCode: "us" },
  fr: { code: "fr", name: "Francais", countryCode: "fr" },
  ar: { code: "ar", name: "العربية", countryCode: "dz" },
};

export const SUPPORTED_CURRENCIES = [
  { label: "USD", value: "USD" },
  { label: "EURO", value: "EUR" },
  { label: "DZD", value: "DZD" },
];
