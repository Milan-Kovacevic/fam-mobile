import { View, ViewProps } from "react-native";
import React from "react";
import { Icon, IconVariant } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";

interface AssetDetailsHeadingProps extends ViewProps {
  text: string;
  icon: string;
  iconVariant: IconVariant;
  variant: "title" | "subtitle";
}

const AssetDetailsHeading = (props: AssetDetailsHeadingProps) => {
  const { text, variant, icon, iconVariant, ...rest } = props;

  return (
    <View
      className="flex-row w-full items-center gap-0.5 justify-start"
      {...rest}
    >
      {variant == "title" ? (
        <>
          <Text className="pl-0.5 text-xl font-psemibold tracking-tight text-gray-900 dark:text-gray-100 leading-6 pt-1">
            {text}
          </Text>
        </>
      ) : (
        <>
          <Icon
            icon={icon}
            variant={iconVariant}
            className="text-base text-secondary-500 dark:text-secondary-400"
          />
          <Text className="text-sm font-pregular tracking-tight text-neutral-700 dark:text-neutral-300 pt-0.5">
            {text}
          </Text>
        </>
      )}
    </View>
  );
};

export default AssetDetailsHeading;
