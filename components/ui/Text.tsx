import React from "react";
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
import { TxKeyPath } from "@/i18n";
import { cn } from "@/utils/tw";
import { useTranslation } from "react-i18next";

type Variant = keyof typeof $variants;

export interface TextProps extends RNTextProps {
  tx?: TxKeyPath;
  text?: string;
  style?: StyleProp<TextStyle>;
  variant?: Variant;
  children?: React.ReactNode;
}

export function Text(props: TextProps) {
  const { t } = useTranslation();
  const { tx, text, children, style, ...rest } = props;

  const i18nText = tx && t(tx);
  const content = i18nText || text || children;

  const variant: Variant = props.variant ?? "default";
  const $className = cn($variants[variant], props.className);

  return (
    <RNText {...rest} style={style} className={$className}>
      {content}
    </RNText>
  );
}

const $baseClassName: string =
  "text-sm font-pregular text-black dark:text-white";

const $variants = {
  default: cn($baseClassName),

  bold: cn($baseClassName, "font-pbold"),

  heading: cn($baseClassName, "text-2xl font-pbold"),

  subheading: cn($baseClassName, "text-lg font-pmedium"),

  formLabel: cn($baseClassName, "font-pmedium text-xs"),

  formHelper: cn($baseClassName, "text-sm font-pregular"),

  muted: cn(
    $baseClassName,
    "text-sm font-pregular text-gray-500 dark:text-gray-400"
  ),
  neutral: cn(
    $baseClassName,
    "text-sm font-pregular text-gray-800 dark:text-gray-200"
  ),
};
