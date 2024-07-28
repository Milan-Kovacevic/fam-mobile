import { TxKeyPath } from "@/i18n";
import "react-i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: {
        [key in TxKeyPath]: string;
      };
    };
  }
}
