import { I18n, TranslateOptions } from "i18n-js";
import * as Localization from "expo-localization";
import sr from "@/assets/locales/sr.json";
import en from "@/assets/locales/en.json";
import { I18nManager } from "react-native";

type Translations = typeof en;

const i18n = new I18n({ en, sr });
i18n.enableFallback = true;
i18n.defaultLocale = "en";
const fallbackLocale = "en-US";
const systemLocale = Localization.getLocales()[0];
const systemLocaleTag = systemLocale?.languageTag ?? fallbackLocale;

if (Object.prototype.hasOwnProperty.call(i18n.translations, systemLocaleTag)) {
  // if specific locales like en-FI or en-US is available, set it
  i18n.locale = systemLocaleTag;
} else {
  // otherwise try to fallback to the general locale (dropping the -XX suffix)
  const generalLocale = systemLocaleTag.split("-")[0];
  if (Object.prototype.hasOwnProperty.call(i18n.translations, generalLocale)) {
    i18n.locale = generalLocale;
  } else {
    i18n.locale = fallbackLocale;
  }
}

// handle RTL languages
const isRTL = systemLocale?.textDirection === "rtl";
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

type TxKeyPath = RecursiveKeyOf<Translations>;

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

export { isRTL, i18n, TxKeyPath };
export default function translate(
  key: TxKeyPath,
  options?: TranslateOptions
): string {
  return i18n.t(key, options);
}
