import { View, useColorScheme } from "react-native";
import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";

const LandingHeading = () => {
  const scheme = useColorScheme();

  return (
    <View className="items-center gap-0 justify-start mx-2">
      <View className="items-center gap-0 pt-6">
        <Text
          style={{ letterSpacing: -3 }}
          className="text-[54px] pt-12 font-pbold tracking-tighter -mb-4 text-neutral-800 dark:text-neutral-200"
        >
          FAM
        </Text>
        <View className="flex-row mx-3 gap-1">
          <Icon
            icon="quote-left"
            variant="fontawesome"
            className="text-[10px] pt-0.5"
          />
          <Text className="text-2xl font-pmedium text-center leading-6 tracking-tight pt-2 text-neutral-700 dark:text-neutral-300">
            Fixed Asset Manager
          </Text>
          <Icon
            icon="quote-right"
            variant="fontawesome"
            className="text-[10px] pt-0.5"
          />
        </View>
      </View>
      <View className="items-center justify-center pl-1 w-full pt-0">
        <Text className="font-pregular text-[13px] text-neutral-500 dark:text-neutral-400 text-center leading-4">
          Manage and track your assets and expenses in one place
        </Text>
      </View>
    </View>
  );
};

export default LandingHeading;
