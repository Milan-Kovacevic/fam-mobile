import React from "react";
import {
  Pressable,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Icon, IconVariant } from "./Icon";
import { cn } from "@/utils/tw";

export interface ButtonProps extends TouchableOpacityProps {
  icon: string;
  variant?: IconVariant;
  disabled?: boolean;
  onPressed: () => void;
  iconClassName?: string;
}

export function FAButton(props: ButtonProps) {
  const { disabled, icon, variant, iconClassName, onPressed, ...rest } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={disabled}
      className={$buttonClassName}
      {...rest}
      onPress={onPressed}
    >
      <Icon
        icon={icon}
        variant={variant}
        className={cn("text-neutral-700 dark:text-neutral-300", iconClassName)}
      />
    </TouchableOpacity>
  );
}

const $buttonClassName: string =
  "absolute bg-secondary-400/50 dark:bg-secondary/80 p-2.5 py-1.5 rounded-full z-10 justify-center items-center overflow-hidden flex-grow-0";
