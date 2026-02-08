import { LocaleConfig, SupportedLocale } from "./type";
import en from "./en";
import hu from "./hu";
import nl from "./nl";

const locales: Record<SupportedLocale, LocaleConfig> = {
  en: en,
  hu: hu,
  nl: nl,
};

export * from "./type";
export default locales;
