import { View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/Text";

const LandingFooter = () => {
  return (
    <View className="self-end justify-end">
      <Text className="font-pmedium -mt-1 self-end uppercase text-xs text-neutral-500 dark:text-neutral-400">
        ETFBL - 2024
      </Text>
      <Text className="font-plight -mt-1 self-end italic text-xs text-neutral-500 dark:text-neutral-400">
        All rights reserved@
      </Text>
    </View>
  );
};

export default LandingFooter;
