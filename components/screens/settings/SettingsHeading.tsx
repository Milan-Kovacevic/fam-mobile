import { View } from "react-native";
import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import translate from "@/i18n";

const SettingsHeading = () => {
  return (
    <View className="">
      <View className="flex-1 flex-row w-full items-center gap-2 -ml-px justify-start">
        <Icon
          icon="gear"
          variant="fontawesome"
          className="text-xl mt-0.5 text-neutral-800 dark:text-neutral-200"
        />
        <Text className="text-2xl font-psemibold tracking-tighter pt-0.5">
          {translate("settings.title")}
        </Text>
      </View>
      <Text className="font-pregular text-xs text-neutral-500 dark:text-neutral-400 text-left leading-5 mt-px">
        {translate("settings.description")}
      </Text>
      <View className="h-px my-2.5 flex-1 bg-neutral-400/30 dark:bg-neutral-700/30" />
    </View>
  );
};

export default SettingsHeading;
