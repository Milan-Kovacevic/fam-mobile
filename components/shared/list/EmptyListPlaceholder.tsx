import { View, Text } from "react-native";
import React from "react";
import { Icon } from "../../ui/Icon";

export type EmptyListPlaceholderProps = {
  title: string;
  description: string;
};

const EmptyListPlaceholder = (props: EmptyListPlaceholderProps) => {
  return (
    <View className="items-center justify-center flex-1 h-full pt-6">
      <Icon
        icon="frowno"
        variant="antdesign"
        className="text-5xl mb-0 text-secondary/80 dark:text-secondary-400/90"
      />
      <Text className="text-center mt-1 font-psemibold text-lg text-neutral-800 dark:text-neutral-200">
        {props.title}
      </Text>
      <Text className="mx-3 -mt-0.5 text-center font-pregular text-xs text-neutral-500 dark:text-neutral-400">
        {props.description}
      </Text>
    </View>
  );
};

export default EmptyListPlaceholder;
