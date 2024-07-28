import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import sr from "@/assets/locales/sr.json";
import en from "@/assets/locales/en.json";
import * as Localization from "expo-localization";
import i18next from "i18next";

type Translations = typeof en;
type TxKeyPath = RecursiveKeyOf<Translations>;

const resources = {
  en: { translation: en },
  sr: { translation: sr },
};

const initI18n = async () => {
  const fallbackLocale = "en";
  let savedLanguage;

  if (!savedLanguage) {
    const systemLocale = Localization.getLocales()[0];
    const systemLocaleTag = systemLocale?.languageTag ?? fallbackLocale;

    const generalLocale = systemLocaleTag.split("-")[0];
    savedLanguage = generalLocale;
  }

  i18n.use(initReactI18next).init(
    {
      compatibilityJSON: "v3",
      resources,
      lng: savedLanguage,
      fallbackLng: fallbackLocale,
      interpolation: {
        escapeValue: false,
      },
    },
    () => {}
  );
};

initI18n();

// via: https://stackoverflow.com/a/65333050
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
  TValue,
  Text extends string
> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text;

export default i18n.t;
export { TxKeyPath };
