import { initReactI18next } from "react-i18next";

import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
// import LocizeBackend from "i18next-locize-backend";

// const locizeOptions = {
//   projectId: "6a8ec568-11a4-4b0d-87c3-975c0921690d",
//   apiKey: "30d94e64-de25-47c3-8fcb-b4816d5d278a",
//   referenceLng: "en-US",
// };

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .use(Backend)
  .init({
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: "en",
    react: { useSuspense: false },
    detection: {
      order: [
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: ["header, common, footer, products, filters"],
    defaultNs: "common",
  });

i18next.loadLanguages(["en"]);
i18next.loadNamespaces([
  "common",
  "footer",
  "glossory",
  "header",
  "filters",
  "products",
]);
