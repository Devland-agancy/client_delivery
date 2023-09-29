import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./src/translation/en.json";
import translationFR from "./src/translation/fr.json";

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "fr",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
