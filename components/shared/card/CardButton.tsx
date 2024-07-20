import { View, Text, TouchableOpacityProps } from "react-native";
import React from "react";
import { Button } from "@/components/ui/Button";
import { Icon, IconVariant } from "@/components/ui/Icon";

interface CardButtonProps extends TouchableOpacityProps {
  icon: string;
  iconVariant: IconVariant;
  onPressed: () => void;
}

const CardButton = (props: CardButtonProps) => {
  const { icon, iconVariant, onPressed, ...rest } = props;
  return (
    <Button
      variant="ghost"
      LeftAccessory={() => (
        <Icon
          icon={icon}
          variant={iconVariant}
          className="text-xl text-neutral-700 dark:text-neutral-400"
        />
      )}
      className="p-2 py-0.5 self-center"
      onPressed={onPressed}
      {...rest}
    />
  );
};

export default CardButton;
