import React, { ComponentType } from "react";
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  useColorScheme,
  ViewStyle,
} from "react-native";
import { Text, TextProps } from "@/components/ui/Text";
import { cn } from "@/utils/tw";
import { palette } from "@/theme/colors";

type Variant = keyof typeof $buttonVariantsClassName;

export interface ButtonAccessoryProps {
  style: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export interface ButtonProps extends TouchableOpacityProps {
  tx?: TextProps["tx"];
  text?: TextProps["text"];
  variant?: Variant;
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  textClassName?: string;
  onPressed: () => void;
}

export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    loading,
    textClassName,
    onPressed,
    ...rest
  } = props;
  const variant: Variant = props.variant ?? "primary";
  const scheme = useColorScheme();

  const $buttonClassName: string = cn(
    $buttonVariantsClassName[variant],
    disabled && "opacity-40",
    loading && "opacity-50"
  );

  const $buttonTextClassName: string = cn(
    $buttonTextVariantsClassName[variant],
    textClassName
  );

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={disabled || (!disabled && loading)}
      className={$buttonClassName}
      {...rest}
      onPress={onPressed}
    >
      {loading ? (
        <ActivityIndicator
          color={scheme == "dark" ? palette.gray400 : palette.gray500}
          className={cn("mr-2 pb-0.5")}
        ></ActivityIndicator>
      ) : (
        !!LeftAccessory && (
          <LeftAccessory style={$leftAccessoryStyle} disabled={disabled} />
        )
      )}

      <Text tx={tx} text={text} className={$buttonTextClassName}>
        {children}
      </Text>
      {!!RightAccessory && (
        <RightAccessory style={$rightAccessoryStyle} disabled={disabled} />
      )}
    </TouchableOpacity>
  );
}

const $baseButtonClassName: string =
  "justify-center items-center flex-row py-0.5 px-6 overflow-hidden flex-grow-0 rounded-xl";

const $baseButtonTextClassName: string =
  "text-sm leading-8 font-pmedium text-center flex-shrink flex-grow-0";

export const $buttonVariantsClassName = {
  primary: cn(
    $baseButtonClassName,
    "border-2 border-transparent bg-primary-400/70 dark:bg-primary/90"
  ),
  "primary-outline": cn(
    $baseButtonClassName,
    "border-2 border-primary-400 dark:border-primary bg-transparent"
  ),
  secondary: cn(
    $baseButtonClassName,
    "border-2 border-transparent bg-secondary-400 dark:bg-secondary/90"
  ),
  "secondary-outline": cn(
    $baseButtonClassName,
    "border-2 border-secondary-400 dark:border-secondary bg-transparent"
  ),
  ghost: cn($baseButtonClassName, "bg-transparent"),
};

export const $buttonTextVariantsClassName = {
  primary: cn(
    $baseButtonTextClassName,
    "text-neutral-950 dark:text-neutral-200"
  ),
  "primary-outline": cn(
    $baseButtonTextClassName,
    "text-neutral-900 dark:text-neutral-300 font-pmedium text-center"
  ),
  secondary: cn(
    $baseButtonTextClassName,
    "text-neutral-950 dark:text-neutral-200"
  ),
  "secondary-outline": cn(
    $baseButtonClassName,
    "text-neutral-800 dark:text-neutral-300 font-pmedium text-center"
  ),
  ghost: cn(
    $baseButtonTextClassName,
    "text-neutral-900 dark:text-neutral-300 font-pmedium text-center"
  ),
};

const $rightAccessoryStyle: ViewStyle = { marginStart: 1, zIndex: 1 };
const $leftAccessoryStyle: ViewStyle = { marginEnd: 1, zIndex: 1 };
